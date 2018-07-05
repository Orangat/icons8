export default ({store, isHMR}) => {
  if (isHMR) return

  window.onNuxtReady(nuxt => {
    store.dispatch('fillUserInfo')
  })
}
