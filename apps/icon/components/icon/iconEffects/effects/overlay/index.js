'use strict'

/**
 * Add overlay icon
 */

import icon from './overlay.svg'

let icons = []
let substrateIcons = []

const defaults = {
  id: undefined,
  position: undefined,
  color: '#000'
}

const effect = {
  id: 'Overlay',
  name: 'WEB_APP.EFFECT.OVERLAY.TITLE',
  type: 'single',
  event: 'Set overlay', // event name for analytics
  isActive: false, // is effect applied for editor
  enabled: false, // if effect applied for icon
  icon,
  tooltip: 'WEB_APP.EFFECT.OVERLAY.ADD',
  params: defaults,
  init,
  activate,
  destroy,
  destroyHelpers,
  hideHelpers,
  showHelpers,
  replaceIcon,
  $: {
    initialized: false,
    overlaySvg: {},
    borderOverlay: {},
    groupOverlay: {},
    dragOverlayArea: {},
    copySvg: {},
    placeholder: undefined,
    pathOverlayRect: {},
    copyStroke: {},
    overlayViewBox: {}
  }
}

let service

function init (effectsService) {
  service = effectsService
  effect.service = service
  effect.$.initialized = true
}

function activate (options = {}) {
  const paper = service.paper

  effect.params = Object.assign(defaults, options)
  const params = effect.params

  const $ = effect.$
  let stroke = service.effects.stroke
  if (stroke.$.container && stroke.isActive && $.overlaySvg) {
    stroke.$.container.removeObject($.overlaySvg)
  }

  console.log('service.$.icon', service.$.icon)
  const platform = service.$.icon.platform

  import(/* webpackChunkName: "effects" */ './icons')
    .then(iconsModule => {
      icons = iconsModule.default
      return import(/* webpackChunkName: "effects" */ './substrateIcons')
    })
    .then(substrateIconsModule => {
      substrateIcons = substrateIconsModule.default

      let overlays = icons[platform]
      if (platform === 'office') {
        overlays = overlays[40]
      }
      if (!overlays) {
        return
      }
      const firstOverlay = Object.keys(overlays)[0]
      const icon = overlays[params.id] || overlays[firstOverlay]
      initOverlayIcon(icon)

      let substrate = substrateIcons[platform]

      if (substrate) {
        const substrateIcon = substrate[params.id] || substrate[firstOverlay]
        const placeholderSvgDom = service.$.getSvgElement(substrateIcon)
        const placeholderViewBox = service.$.getViewBox(placeholderSvgDom, [130, 130])

        $.placeholder = paper.project.importSVG(placeholderSvgDom)
        $.pathOverlayRect = getPlaceholderRectangle(placeholderViewBox)
        $.placeholder.position = $.groupOverlay.bounds.center
        $.placeholder.opacity = 0
        $.groupOverlay.addChild($.placeholder)
        $.groupOverlay.fitBounds($.pathOverlayRect)
      } else {
        $.groupOverlay.fitBounds(getPlaceholderRectangle($.overlayViewBox))
      }
      setPosition()
      overlay()
      service.$.updateAndExport()
    })
    .catch(error => {
      console.error('Failed to load overlay icons', error)
    })
}

function destroy () {
  const $ = effect.$
  if (!$.initialized) {
    return
  }

  let stroke = service.effects.stroke
  if (stroke.$.container && stroke.isActive && $.overlaySvg) {
    stroke.$.container.removeObject($.overlaySvg)
  }

  service.$.removeElements($.groupOverlay, $.overlaySvg, $.placeholder, $.copySvg,
    $.pathOverlayRect, $.copyStroke, $.dragOverlayArea, $.borderOverlay)

  service.$.svgIcon.visible = true
  service.$.svgIcon.opacity = 1
  if (stroke.$.container && stroke.isActive) {
    const clone = stroke.$.container.getCloneByOriginal(service.$.svgIcon)
    if (clone) clone.visible = true
  }
}

function initOverlayIcon (svg) {
  const $ = effect.$
  service.$.removeElements($.groupOverlay, $.overlaySvg,
    $.placeholder, $.copySvg, $.pathOverlayRect,
    $.copyStroke, $.borderOverlay, $.dragOverlayArea)

  const overlaySvgDom = service.$.getSvgElement(svg)
  effect.$.overlaySvg = service.paper.project.importSVG(overlaySvgDom)
  $.overlayViewBox = service.$.getViewBox(overlaySvgDom, [130, 130])

  $.groupOverlay = new service.paper.Group({
    children: [effect.$.overlaySvg]
  })

  if (!service.$.icon.isColor) {
    effect.$.overlaySvg.fillColor = effect.params.color
  }
}

function getPlaceholderRectangle (viewBox) {
  const placeholderWidth = (service.$.width * viewBox[0]) / service.$.icon.viewBox[0]
  const placeholderHeight = (service.$.height * viewBox[1]) / service.$.icon.viewBox[1]
  return new service.paper.Rectangle({
    size: [placeholderWidth, placeholderHeight],
    point: [50, 50]
  })
}

function setPosition () {
  const $ = effect.$
  const params = effect.params
  if (params.position) {
    $.groupOverlay.position.x = params.position.x
    $.groupOverlay.position.y = params.position.y
  } else {
    $.groupOverlay.position.x = service.$.width - $.overlaySvg.bounds.width / 2
    $.groupOverlay.position.y = service.$.height - $.overlaySvg.bounds.height / 2
  }
}

function overlay () {
  const $ = effect.$
  const stroke = service.effects.stroke
  /**
   * @param groupOverlayBounds.topLeft
   * @param groupOverlayBounds.topRight
   * @param groupOverlayBounds.bottomRight
   * @param groupOverlayBounds.bottomLeft
   */
  const groupOverlayBounds = $.overlaySvg.bounds

  // pseudo area around overlay for d'n'd

  replaceIcon()
  $.borderOverlay = new service.paper.Path()
  $.borderOverlay.strokeColor = '#50e3c2'
  $.borderOverlay.name = 'overlay-border'
  $.borderOverlay.add(groupOverlayBounds.topLeft)
  $.borderOverlay.add(groupOverlayBounds.topRight)
  $.borderOverlay.add(groupOverlayBounds.bottomRight)
  $.borderOverlay.add(groupOverlayBounds.bottomLeft)
  $.borderOverlay.closed = true

  $.dragOverlayArea = new service.paper.Path.Rectangle(groupOverlayBounds)
  $.dragOverlayArea.name = 'overlay-drag'
  $.dragOverlayArea.fillColor = 'red'
  $.dragOverlayArea.opacity = 0

  $.dragOverlayArea.onMouseDrag = function (event) {
    // console.log(event.point.x, event.point.y);
    const draggedElements = [$.groupOverlay, $.borderOverlay, $.dragOverlayArea]

    if (stroke.$.container && stroke.isActive) {
      draggedElements.push(stroke.$.container.getCloneByOriginal($.overlaySvg))
    }

    const isMove = service.$.moveItemWithHold(event, $.dragOverlayArea, draggedElements, 50)

    if (isMove) {
      // $scope.effectsEnabled.overlay = true
      replaceIcon()
    }
  }

  $.dragOverlayArea.onMouseEnter = function () {
    // element.addClass('m-move')
  }

  $.dragOverlayArea.onMouseLeave = function () {
    // element.removeClass('m-move')
  }

  $.dragOverlayArea.onMouseUp = function () {
    // body.removeClass('m-noselect')
    // // borderOverlay.opacity = 1;
    // overlayEnableWatch = true
    const params = effect.params
    params.position = params.position || {}
    params.position.x = $.groupOverlay.position.x
    params.position.y = $.groupOverlay.position.y
    service.$.updateAndExport(true)
    // $scope.$apply()
  }

  $.dragOverlayArea.onMouseDown = function () {
    // body.addClass('m-noselect')
    // // borderOverlay.opacity = 0;
    // overlayEnableWatch = false
    // $scope.effectsEnabled.overlay = true
    // $scope.$apply()
  }

  if (stroke.$.container && stroke.isActive) {
    stroke.$.container.addObject($.overlaySvg)
  }
}

function destroyHelpers () {
  service.$.removeElements(effect.$.placeholder, effect.$.borderOverlay, effect.$.dragOverlayArea)
}

function hideHelpers () {
  effect.$.borderOverlay.opacity = 0
}

function showHelpers () {
  effect.$.borderOverlay.opacity = 1
}

function replaceIcon () {
  const $ = effect.$
  const svgIcon = effect.service.$.svgIcon
  if ($.placeholder) {
    svgIcon.visible = false
    svgIcon.opacity = 0
    svgIcon.name = 'original-icon'
    service.$.removeElements($.copySvg)
    $.copySvg = svgIcon.clone()
    $.copySvg.visible = true
    $.copySvg.opacity = 1
    $.copySvg.name = 'subtracted-icon'
    subtract($.copySvg, $.placeholder)

    let stroke = service.effects.stroke
    if (stroke.$.container && stroke.isActive) {
      const copy = stroke.$.container.getCloneByOriginal(svgIcon)
      copy.visible = false
      copy.opacity = 0
      service.$.removeElements($.copyStroke)
      $.copyStroke = copy.clone()
      $.copyStroke.visible = true
      $.copyStroke.opacity = 1
      subtract($.copyStroke, $.placeholder)
    }
  }
}

function subtract (container, object) {
  if (!object) {
    return
  }
  if (object.className === 'Group') {
    object.children.forEach(child => {
      subtract(container, child)
    })
    return
  }
  if (service.$.isPath(container)) {
    container.replaceWith(container.subtract(object))
    container.remove()
    return
  }

  container.children.forEach(function (element) {
    if (service.$.isContainer(element)) {
      subtract(element, object)
    } else if (element.toPath) {
      const a = element.toPath()
      element.remove()
      a.replaceWith(a.subtract(object))
      a.remove()
    } else if (service.$.isPath(element)) {
      element.replaceWith(element.subtract(object))
      element.remove()
    }
  })
}

export default effect
