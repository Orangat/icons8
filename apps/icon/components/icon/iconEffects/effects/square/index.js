'use strict'

import icon from './square.svg'

const defaults = {
  radius: 100,
  borderRadius: 0,
  borderWidth: 10,
  iconSize: 80,
  color: '#e44',
  fill: true
}

const effect = {
  id: 'Square',
  name: 'WEB_APP.EFFECT.SQUARE.TITLE',
  type: 'replaceable', // event name for analytics
  isActive: false, // is effect applied for editor
  enabled: false, // if effect applied for icon
  icon,
  tooltip: 'WEB_APP.EFFECT.SQUARE.ADD',
  params: defaults,
  init,
  activate,
  destroy,
  $: {
    initialized: false,
    shape: undefined
  }
}

let service

function init (effectsService) {
  service = effectsService
  effect.$.initialized = true
}

function activate (options) {
  effect.params = Object.assign(defaults, options)

  service.$.removeElements(effect.$.shape)
  effect.$.shape = service.utils.createShape(effect.params)
  service.paper.project._activeLayer.insertChild(1, effect.$.shape)

  service.utils.resizeIcon(effect.params.iconSize)

  service.$.updateAndExport()
}

function destroy () {
  if (!effect.$.initialized) {
    return
  }
  service.$.removeElements(effect.$.shape)
  service.utils.restoreIconSize()
}

export default effect
