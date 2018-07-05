'use strict'

import recolor from './recolor'
import overlay from './overlay'
import text from './text'

import circle from './circle'
import stroke from './stroke'
import square from './square'
import background from './background'
import padding from './padding'

import size from './utils.size'
import shape from './utils.shape'

/** Сервис на данный момент используется в effectsModal
 * 1. Сначала вызываем initEditor который загружает Paper.js и задает начальные назначения полотна
 * 2. Далее вызываем initIcon который загружает иконку на полотно и применяет подключенные эффекты
 * 3. Далее можно применять новые эффекты вызовом enableEffect(effect.id)
 */

let service = {
  paper: undefined,
  resultSvg: undefined,
  $: {
    backgroundRectangle: undefined,
    width: undefined,
    height: undefined,
    lineWidthIos: 1,
    svgIcon: {},
    icon: {
      viewBox: undefined,
      width: undefined,
      height: undefined,

      originalBounds: undefined,
      color: undefined,
      isColor: undefined,
      isImported: undefined,
      recolorData: undefined
    },

    exportTimeout: undefined,
    updateAndExport,
    getSvgElement,
    getViewBox,

    isPath,
    isContainer,

    removeElements,
    moveItemWithHold,
    onRenderCallbacks: []
  },
  initEditor,
  initIcon,
  enableEffect,
  disableEffect,
  saveEffects,
  removeReplaceableEffects,
  onRender,
  offRender,
  enabledEffect: {},
  effects: {
    // single effects
    recolor,
    overlay,
    text,

    // replaceable effects
    circle,
    stroke,
    square,
    background,
    padding
  }
}

service.utils = {
  resizeIcon: size.resizeIcon.bind(service),
  restoreIconSize: size.restoreIconSize.bind(service),
  createShape: shape.createShape.bind(service)
}

function initPaper () {
  return new Promise(function (resolve, reject) {
    if (service.paper) {
      resolve()
      return
    }

    /**
     * @param paper.setup
     * @param paper.Path
     * @param paper.Path.Rectangle
     * @param paper.Point
     * @param paper.project
     * @param paper.project.view.bounds
     * @param paper.project.importSVG
     * @param paper.project.exportSVG
     */
    import(/* webpackChunkName: "effects" */ 'paper').then(paper => {
      service.paper = paper
      resolve()
    }).catch(error => {
      console.error('Failed to load paper', error)
      reject()
    })
  })
}

function initEditor (canvas) {
  return new Promise(function (resolve, reject) {
    initPaper(canvas)
      .then(() => {
        service.paper.setup(canvas)
        service.$.backgroundRectangle = new service.paper.Path.Rectangle(service.paper.project.view.bounds)
        service.$.width = canvas.width
        service.$.height = canvas.height
        service.$.lineWidthIos = canvas.width / 50
        resolve()
      })
      .catch(reject)
  })
}

function initIcon (icon, platform, color) {
  let $icon = service.$.icon
  let $svgIcon = service.$.svgIcon

  if ($svgIcon.remove) {
    $svgIcon.remove()
  }

  let svgElement = getSvgElement(icon.svgCurrentResolution || icon.svg, [service.$.width, service.$.height])

  let viewBox = getViewBox(svgElement)
  $icon.viewBox = viewBox
  $icon.width = viewBox[0]
  $icon.height = viewBox[1]

  $svgIcon = service.$.svgIcon = service.paper.project.importSVG(svgElement)
  $icon.originalBounds = new service.paper.Rectangle(service.$.svgIcon.bounds)

  $icon.platform = icon.platform

  $icon.isColor = platform.isColor
  $icon.recolorData = {
    colorsMap: icon.colorsMap
  }
  $icon.color = `#${color}`

  $icon.isImported = !icon.platform
  if (!service.$.icon.isColor && !$icon.isImported && $icon.color) {
    $svgIcon.fillColor = $icon.color
  }
  if ($svgIcon.children) {
    setStrokeWidthEditor($svgIcon)
  }

  iterateEffects(effect => {
    // destroy effect if it's not first init
    if (effect.destroy) {
      effect.destroy()
    }
    if (effect.init) {
      effect.init(service)
    }
  })
  service.enabledEffect = {}

  activateEffects()

  exportSvg()
}

function iterateEffects (fn) {
  Object.keys(service.effects).forEach(key => {
    if (fn) {
      fn(service.effects[key])
    }
  })
}

function enableEffect (id) {
  if (service.enabledEffect.id === id) {
    return
  }
  if (service.enabledEffect.destroyHelpers) {
    service.enabledEffect.destroyHelpers()
  }

  const newEffect = service.effects[('' + id).toLowerCase()]

  const isReplaceable = newEffect.type === 'replaceable'
  if (isReplaceable) {
    iterateEffects(effect => {
      if (effect.type === 'replaceable') {
        effect.isActive = false
        effect.destroy()
      }
    })
  }
  newEffect.isActive = true

  newEffect.activate({showHelpers: true})
  service.enabledEffect = newEffect
}

function disableEffect (id) {
  const effect = service.effects[('' + id).toLowerCase()]
  effect.destroy()
  if (service.enabledEffect.id === id) {
    service.enabledEffect = {}
  }
  updateAndExport()
}

function activateEffects () {
  console.log('activateEffects')
  iterateEffects(effect => {
    effect.isActive = false
    if (effect.enabled) {
      let showHelpers = effect.id === service.enabledEffect.id
      console.log('init', effect.name)
      effect.activate({showHelpers})
    }
  })
}

function removeReplaceableEffects () {
  if (service.enabledEffect.destroyHelpers) {
    service.enabledEffect.destroyHelpers()
  }
  iterateEffects(effect => {
    if (effect.type === 'replaceable') {
      effect.isActive = false
      effect.destroy()
    }
  })
  service.enabledEffect = {}
  updateAndExport()
}

function saveEffects () {
  exportSvg({clean: true})
  let enabledEffects = false
  iterateEffects(effect => {
    if (effect.isActive) {
      enabledEffects = true
    }
    effect.enabled = effect.isActive
    effect.isActive = false
  })
  return enabledEffects
}

function onRender (fn) {
  service.$.onRenderCallbacks.push(fn)
}

function offRender (fn) {
  let index = service.$.onRenderCallbacks.indexOf(fn)
  if (index >= 0) {
    service.$.onRenderCallbacks.splice(index, 1)
  }
}

function callOnRenderCallbacks () {
  service.$.onRenderCallbacks.forEach(fn => {
    fn(service.resultSvg, service.$.icon)
  })
}

// create and return svg node with canvas size from svg string
function getSvgElement (svg, size) {
  let div = document.createElement('div')
  div.innerHTML = svg
  let svgDom = div.querySelector('svg')
  if (size) {
    svgDom.setAttribute('width', size[0])
    svgDom.setAttribute('height', size[1])
  }
  svgDom.setAttribute('overflow', 'visible')
  return svgDom
}

// return svg viewBox or canvas size or defaultValue
function getViewBox (svgElement, defaultValue) {
  const viewBox = svgElement.getAttribute('viewBox')
  if (viewBox) {
    const arrayViewBoxSizes = viewBox.split(' ')
    if (arrayViewBoxSizes.length === 4) {
      return [parseInt(arrayViewBoxSizes[2]), parseInt(arrayViewBoxSizes[3])]
    }
  } else {
    return defaultValue || [service.$.width, service.$.height]
  }
}

function isPath (element) {
  return element instanceof service.paper.Path || element instanceof service.paper.CompoundPath
}

function isContainer (element) {
  return !isPath(element) && element.hasChildren()
}

function removeElements () {
  for (let i = 0; i < arguments.length; i++) {
    const item = arguments[i]
    if (item && item.remove) {
      item.remove()
    }
  }
}

function exportSvg ({clean} = {}) {
  iterateEffects(effect => {
    if (clean) {
      if (effect.destroyHelpers) {
        effect.destroyHelpers()
      }
    } else {
      if (effect.hideHelpers) {
        effect.hideHelpers()
      }
    }
  })

  const svg = service.paper.project.exportSVG()

  iterateEffects(effect => {
    if (effect.showHelpers) {
      effect.showHelpers()
    }
  })

  svg.setAttribute('viewBox', `0 0 ${service.$.width} ${service.$.height}`)
  svg.removeAttribute('width')
  svg.removeAttribute('height')

  if (svg.outerHTML) {
    service.resultSvg = svg.outerHTML
  } else {
    // fix ie
    service.resultSvg = document.createElement('div').appendChild(svg).innerHTML
  }
  callOnRenderCallbacks()
}

function updateAndExport (isImmediately) {
  service.paper.view.update()
  if (isImmediately) {
    exportSvg()
  } else {
    clearTimeout(service.exportTimeout)
    service.exportTimeout = setTimeout(() => {
      exportSvg()
    }, 150)
  }
}

function setStrokeWidthEditor (item) {
  setStrokeWidth(item, true)
}

function setStrokeWidth (item, isEditor) {
  for (let i = 0; i < item.children.length; i++) {
    let obj = item.children[i]
    if (obj.style.strokeWidth > 1) {
      if (obj instanceof service.paper.Shape && obj.toPath) {
        const objPath = obj.toPath()
        obj.remove()
        obj = objPath
      }
      if (isEditor) {
        obj.style.strokeWidth *= service.$.width / service.$.icon.viewBox[0]
      } else {
        obj.style.strokeWidth /= service.$.width / service.$.icon.viewBox[0]
      }
    } else if (obj.children) {
      setStrokeWidth(obj, isEditor)
    }
  }
}

function moveItemWithHold (event, dragArea, moveElements) {
  const x = event.delta.x
  const y = event.delta.y

  const dragAreaBounds = dragArea.bounds

  const topLeftAreaX = dragAreaBounds.topLeft.x + x
  const topRightAreaX = dragAreaBounds.topRight.x + x
  const topLeftAreaY = dragAreaBounds.topLeft.y + y
  const bottomLeftAreaY = dragAreaBounds.bottomLeft.y + y
  const holdSizeWidth = dragAreaBounds.width / 3
  const holdSizeHeight = dragAreaBounds.height / 3
  let isMove = false

  if (service.$.width > topLeftAreaX + holdSizeWidth && topRightAreaX - holdSizeWidth > 0) {
    isMove = true
    moveElements.forEach(function (item) {
      item.position.x += x
    })
  }

  if (service.$.height > topLeftAreaY + holdSizeHeight && bottomLeftAreaY - holdSizeHeight > 0) {
    isMove = true
    moveElements.forEach(function (item) {
      item.position.y += y
    })
  }

  return isMove
}

export default service
