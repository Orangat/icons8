<template lang="pug">
  index
</template>

<script>
  import Index from '~/components/index'
  import utils from '~/../../public/plugins/utils.js'

  export default {
    asyncData ({ store, route, redirect }) {
      return new Promise(function (resolve) {
        const callback = () => {
          let seoData = store.getters['getSeoData']
          let mainFont = null
          let pairFont = null

          // Show fonts' columns and select first of each
          const mainFonts = store.getters['mainFonts']
          if (mainFonts.length) {
            // Set main font
            mainFont = mainFonts[0]
            if (route.params.mainFont) {
              const mainFontTitle = utils.prettifyValue(decodeURI(route.params.mainFont))
              mainFont = mainFonts.find(font => font.title.toLowerCase() === mainFontTitle)
              if (!mainFont) {
                redirect(`/fonts/not-found/${route.params.mainFont}`)
              }
            }
            store.commit('setMainFont', mainFont)

            // Set paired font
            if (mainFont.pairings.length) {
              pairFont = mainFont.pairings[0]
              if (route.params.pairedFont) {
                const pairFontTitle = utils.prettifyValue(decodeURI(route.params.pairedFont))
                pairFont = mainFont.pairings.find(font => font.title.toLowerCase() === pairFontTitle)
                if (!pairFont) {
                  redirect(`/fonts/not-found/${route.params.pairedFont}`)
                }
              }
              store.commit('setPairedFont', pairFont)
              pairFont.sites = store.getters['fontsSites']
            } else {
              redirect(`/fonts/not-found/${route.params.pairedFont}`)
            }
          } else {
            redirect(`/fonts/not-found/${route.params.mainFont}`)
          }

          // Set SEO
          if (mainFont && pairFont) {
            seoData.title = store.getters['generateTitle']
            seoData.description = store.getters['generateDescription']
          }
          store.dispatch('updateSEO', seoData)

          resolve()
        }

        store.dispatch('getMainData', { callback, mainFontTitle: route.params.mainFont, pairedFontTitle: route.params.pairedFont })
      })
    },
    components: {Index}
  }
</script>
