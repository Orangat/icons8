'use strict'

let icons = {
  android: {},
  androidL: {},
  color: {},
  dotty: {},
  dusk: {},
  ios7: {},
  ios11: {},
  nolan: {},
  office: {
    16: {},
    30: {},
    40: {},
    80: {}
  },
  p1em: {},
  ultraviolet: {},
  win8: {},
  win10: {},
  Dusk_Wired: {}
}

function importAll (platform, r) {
  r.keys().forEach(key => (platform[key.split('./').join('')] = r(key)))
}

importAll(icons.android, require.context(`./icons/android`, true, /\.*$/))
importAll(icons.androidL, require.context(`./icons/androidL`, true, /\.*$/))
importAll(icons.color, require.context(`./icons/color`, true, /\.*$/))
importAll(icons.dotty, require.context(`./icons/dotty`, true, /\.*$/))
importAll(icons.dusk, require.context(`./icons/dusk`, true, /\.*$/))
importAll(icons.ios7, require.context(`./icons/ios7`, true, /\.*$/))
importAll(icons.ios11, require.context(`./icons/ios11`, true, /\.*$/))
importAll(icons.nolan, require.context(`./icons/nolan`, true, /\.*$/))
importAll(icons.p1em, require.context(`./icons/p1em`, true, /\.*$/))
importAll(icons.ultraviolet, require.context(`./icons/ultraviolet`, true, /\.*$/))
importAll(icons.win8, require.context(`./icons/win8`, true, /\.*$/))
importAll(icons.win10, require.context(`./icons/win10`, true, /\.*$/))
importAll(icons.Dusk_Wired, require.context(`./icons/wired`, true, /\.*$/))

importAll(icons.office[16], require.context(`./icons/office/16`, true, /\.*$/))
importAll(icons.office[30], require.context(`./icons/office/30`, true, /\.*$/))
importAll(icons.office[40], require.context(`./icons/office/40`, true, /\.*$/))
importAll(icons.office[80], require.context(`./icons/office/80`, true, /\.*$/))

export default icons
