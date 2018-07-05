'use strict'

/**
 * Recolor multicolor icons
 */

const icon = '<img src="data:image/png;base64,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"/>'

const effect = {
  id: 'Recolor',
  name: 'WEB_APP.EFFECT.RECOLOR.TITLE',
  type: 'single',
  event: 'Set colors', // event name for analytics
  isActive: false, // is effect applied for editor
  enabled: false, // if effect applied for icon
  icon,
  tooltip: 'WEB_APP.EFFECT.RECOLOR.ADD',
  params: {
    colorsMap: {}
  },
  init,
  activate,
  destroy,
  $: {
    initialized: false
  }
}

let service

function init (effectsService) {
  service = effectsService
  effect.$.initialized = true

  const colorsInfo = getColorsInfo(service.$.svgIcon)
  const recolorData = service.$.icon.recolorData
  recolorData.colorsMap = recolorData.colorsMap || colorsInfo.colorsMap
  recolorData.fillColors = colorsInfo.fillColors
  recolorData.strokeColors = colorsInfo.strokeColors

  effect.params = Object.assign(effect.params, service.$.icon.recolorData)
}

function activate () {
  applyColors()
}

function destroy () {}

function getColorsInfo (el) {
  const colorsMap = {}
  const fillColors = {}
  const strokeColors = {}

  extractColors(el, colorsMap, fillColors, strokeColors)

  return {
    colorsMap,
    fillColors,
    strokeColors
  }
}

function extractColors (el, colorsMap, fillColors, strokeColors) {
  if (el.style.fillColor) {
    const hex = el.style.fillColor.toCSS(true)
    fillColors[hex] = fillColors[hex] || []
    fillColors[hex].push(el)
    colorsMap[hex] = colorsMap[hex] || {
      initColor: hex,
      currentColor: hex
    }
  }
  if (el.style.strokeColor) {
    const hex = el.style.strokeColor.toCSS(true)
    strokeColors[hex] = strokeColors[hex] || []
    strokeColors[hex].push(el)
    colorsMap[hex] = colorsMap[hex] || {
      initColor: hex,
      currentColor: hex
    }
  }
  if (el.children) {
    el.children.forEach(children => {
      extractColors(children, colorsMap, fillColors, strokeColors)
    })
  }
}

function applyColors () {
  const recolorData = service.$.icon.recolorData
  let colorsMap = recolorData.colorsMap
  let fillColors = recolorData.fillColors
  let strokeColors = recolorData.strokeColors
  Object.keys(colorsMap).forEach(hex => {
    const currentColor = colorsMap[hex].currentColor
    if (fillColors[hex]) {
      fillColors[hex].forEach(el => {
        el.fillColor = currentColor
      })
    }
    if (strokeColors[hex]) {
      strokeColors[hex].forEach(el => {
        el.strokeColor = currentColor
      })
    }
  })
  service.$.updateAndExport()
}

export default effect
