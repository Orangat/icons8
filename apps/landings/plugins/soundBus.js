import Vue from 'vue'

const bus = new Vue()

if (process.browser) {
  window.createjs.Sound.on('fileload', (event) => {
    bus.$emit(`soundLoaded:${event.id}`)
  })
}

export default bus
