import Vue from 'vue'
import VueScrollTo from 'vue-scrollto'

Vue.use(VueScrollTo, {
  container: '.app-page',
  duration: 500,
  easing: 'ease'
})
