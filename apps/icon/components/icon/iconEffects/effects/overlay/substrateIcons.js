'use strict'

let icons = {
  android: {},
  androidL: {},
  dotty: {},
  ios7: {},
  ios11: {},
  nolan: {},
  p1em: {},
  win8: {},
  win10: {},
  Dusk_Wired: {}
}

function importAll (platform, r) {
  r.keys().forEach(key => (platform[key.split('./').join('').split('substrate_').join('')] = r(key)))
}

importAll(icons.android, require.context(`./substrate/android`, true, /\.*$/))
importAll(icons.androidL, require.context(`./substrate/androidL`, true, /\.*$/))
importAll(icons.dotty, require.context(`./substrate/dotty`, true, /\.*$/))
importAll(icons.ios7, require.context(`./substrate/ios7`, true, /\.*$/))
importAll(icons.ios11, require.context(`./substrate/ios11`, true, /\.*$/))
importAll(icons.nolan, require.context(`./substrate/nolan`, true, /\.*$/))
importAll(icons.p1em, require.context(`./substrate/p1em`, true, /\.*$/))
importAll(icons.win8, require.context(`./substrate/win8`, true, /\.*$/))
importAll(icons.win10, require.context(`./substrate/win10`, true, /\.*$/))
importAll(icons.Dusk_Wired, require.context(`./substrate/wired`, true, /\.*$/))

export default icons
