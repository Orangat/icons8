<template lang="pug">
  index
</template>

<script>
  import Index from '~/components/index'

  export default {
    asyncData ({store}) {
      return new Promise(function (resolve) {
        let seoData = store.getters['getSeoData']
        const callback = () => {
          let mainFont = null
          let pairFont = null

          // Show fonts' columns and select first of each
          const mainFonts = store.getters['mainFonts']
          if (mainFonts.length) {
            mainFont = mainFonts[0]
            store.commit('setMainFont', mainFont)

            // Set first pair font
            if (mainFont.pairings.length) {
              pairFont = mainFont.pairings[0]
              store.commit('setPairedFont', pairFont)
              pairFont.sites = store.getters['fontsSites']
            }
          }

          // Set SEO
          if (mainFont && pairFont) {
            seoData.title = store.getters['generateTitle']
            seoData.description = store.getters['generateDescription']
          }
          store.dispatch('updateSEO', seoData)

          resolve()
        }

        store.dispatch('updateSEO', seoData)
        store.dispatch('getMainData', { callback })
      })
    },
    components: {Index},
  }
</script>
