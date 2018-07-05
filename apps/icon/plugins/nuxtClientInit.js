export default (context) => {
  if (context.isHMR) return

  window.onNuxtReady(nuxt => {
    context.store.dispatch('nuxtClientInit', context)
  })
}
