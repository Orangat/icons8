<template lang="pug">
  .container
    nav.layout--align-center.title
      .title__prefix Cool Fonts vs. Best Fonts
      h1.title Fonts That People Actually Use
      h2.title__description
        span We’ve analyzed the fonts that the greatest startups from ProductHunt use.&nbsp;
        a(href="/fonts") Read our story
        | &nbsp;or&nbsp;
        a(href="/fonts/stats") analyze raw data
        span .
    main
      .main-layout
        .flex
          .layout.row.desktop__lists
            transition(name="fade")
              list.mobile-hidden(
                isMain="1"
                @select="handleMainFont"
                ref="mainList"
                id="main-list"
              )
            transition(name="fade")
              list.mobile-hidden(
                @select="handlePairedFont"
                ref="pairedList"
                id="paired-list"
              )
        .flex.mobile-lists__title Popular Pairings
        .flex.mobile-lists
          .layout.column
            mobile-list(:font="mainFontSelected" :isMain="true" @showList="showList()")
            mobile-list(:font="pairedFontSelected" :isMain="false" @showList="showList(true)")
        transition(name="fade")
          .flex.result(ref="result")
            .layout.column
              .result__fonts.layout.row(v-show="showOutlines")
                font-preview(:font="mainFontSelected" ref="mainFont")
                .result__font-spacer
                font-preview(:font="pairedFontSelected" ref="pairedFont")
              .result__loading.layout.column(v-if="loading")
                img(src="~/static/vue-static/fonts-app/loading.gif")
              div(:class="{'shown-outline': showOutlines, 'hidden-outline': !showOutlines}")
                div(v-if="fontsSites.length === 1")
                  .result__sites
                    site.site--full-width(:site="fontsSites[0]")
                div(v-else)
                  .layout.row.result__sites.result__sites--accented
                    .layout.row
                      site.site--main(
                        v-if="fontsSites.length"
                        :site="fontsSites[0]"
                      )
                      .layout.column.column--accented
                        site(
                          v-if="index > 0 && index < 3"
                          v-for="(site, index) in fontsSites"
                          :key="site.id"
                          :site="site"
                        )
                  .result__sites.layout.row
                      site.result__site--simple(
                        v-if="index >= 0 && index < 3"
                        v-for="(site, index) in fontsSites"
                        :key="site.id"
                        :site="site"
                        :class="{ 'site--half-width': fontsSites.length == 2}"
                      )
                      site(
                        v-if="index > 2"
                        v-for="(site, index) in fontsSites"
                        :key="site.id"
                        :site="site"
                      )
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import List from '~/components/list'
  import Site from '~/components/site'
  import FontPreview from '~/components/font-preview'
  import MobileList from '~/components/mobile-list'
  import config from '~/config.js'
  import utils from '~/../../public/plugins/utils.js'

  export default {
    components: {MobileList, FontPreview, List, Site},
    head () {
      return {
        script: [
          { src: 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js' },
          { src: '//use.typekit.net/previewkits/pk-v1.js' }
        ],
      }
    },
    mounted() {
      // Setup auth ID and token
      if (typeof TypekitPreview !== 'undefined') {
        TypekitPreview.setup({
          'auth_id': 'c3c38cbc4c45476d8bc3f4dceced90e8',
          'auth_token': '8rFKYbse4Ur5aDWY0Dc7X7uPzljqm40WfMyqz7vP1594BMzv5hgiSa5xd2uYh9+iSdDMQDoXPyYv6Q7d/gdlDbaZG5Nu5uJeJf1TL5o2nAoT00i4VuGTfjICm5b6eJnp',
        });
      }

      // Show fonts' columns and select first of each
      const mainFont = this.mainFontSelected || this.mainFonts[0]
      if (mainFont) {
        this.selectMainFont(mainFont, true)
      }
    },
    data () {
      return {
        loading: false,
      }
    },
    computed: {
      ...mapGetters(['pairedFonts']),
      ...mapState({
        fontsSites: state => state.fontsSites,
        mainFonts: state => state.mainFonts,
        mainFontSelected: state => state.mainFont,
        pairedFontSelected: state => state.pairedFont,
        loadedFonts: state => state.loadedFonts,
        showOutlines: state => {
          return (state.mainFont && state.mainFont.loaded) || (state.pairedFont && state.pairedFont.loaded)
        }
      })
    },
    methods: {
      showList(isPaired = false) {
        if (isPaired) {
          this.$refs.pairedList.$el.classList.remove('mobile-hidden')
        } else {
          this.$refs.mainList.$el.classList.remove('mobile-hidden')
        }
      },
      handleMainFont(mainFont, firstLaunch = false) {
        this.$store.commit('setFontsSites', [])
        this.selectMainFont(mainFont, firstLaunch)
      },
      selectMainFont(mainFont, firstLaunch = false) {
        this.$store.commit('setMainFont', this.mainFonts.find(item => item.id === mainFont.id))
        this.loadFonts([...this.mainFonts, ...this.pairedFonts])

        // Set pair font data
        if (mainFont.pairings.length) {
          if (firstLaunch) {
            let pairing = mainFont.pairings[0]
            pairing.sites = this.sites
          }

          let pairedFont = firstLaunch ? this.pairedFontSelected || this.pairedFonts[0] : this.pairedFonts[0]
          this.selectPairedFont(pairedFont, firstLaunch)
        }

        if (this.$refs.pairedList && this.$refs.pairedList.$refs.scrollable && !firstLaunch) {
          this.$refs.pairedList.$refs.scrollable.scrollTop = 0
        }
      },
      handlePairedFont(pairedFont) {
        this.$store.commit('setFontsSites', [])
        this.selectPairedFont(pairedFont)
      },
      selectPairedFont(pairedFont, firstLaunch = false) {
        this.$refs.result.scrollTop = 0
        this.$store.commit('setPairedFont', this.pairedFonts.find(item => item.id === pairedFont.id))

        // Change URL and Title according to chosen fonts
        document.title = this.$store.getters['generateTitle']
        const mainFontUrlTitle = utils.normalizeValue(this.mainFontSelected.title.toLowerCase())
        const pairedFontUrlTitle = utils.normalizeValue(pairedFont.title.toLowerCase())
        history.pushState({}, null, encodeURI(`/fonts/${mainFontUrlTitle}/${pairedFontUrlTitle}`))

        // Get sites of fonts pair
        if (!firstLaunch) {
          const callback = sites => {
            pairedFont.sites = sites
            this.loading = false
            this.$store.commit('setFontsSites', sites)
          }

          if (!pairedFont.sites) {
            this.loading = true
            this.$store.dispatch(
              'getFontsSites',
              {
                callback,
                mainFontId: this.mainFontSelected.id,
                pairedFontId: pairedFont.id
              }
            )
          } else {
            this.$store.commit('setFontsSites', pairedFont.sites)
          }
        }
      },
      loadFonts(fonts) {
        const app = this
        let fontsToLoad = []
        fonts.forEach(font => {
          const fontTitle = font.title.toLowerCase()
          const fontLoaded = this.loadedFonts.find(font => font.title === fontTitle)
          if (font.source && !fontLoaded && !fontsToLoad.includes(fontTitle)) {
            fontsToLoad.push(fontTitle)
            const fontSourceData = font.source.data ? JSON.parse(font.source.data) : {}

            // If there is a preview exists
            if (font.source.filename) {
              this.handleLoadedFont(font)
            } else {
              switch (font.source.title) {
                case config.fontsSquirrelSourceTitle:
                case config.pngSourceTitle:
                  this.handleLoadedFont(font)
                  break
                case config.googleSourceTitle:
                  WebFont.load({
                    fontactive: function () {
                      app.handleLoadedFont(font)
                    },
                    google: {
                      families: [fontSourceData.family + this.getFontVariant(fontSourceData.variants)],
                    }
                  })
                  break
                case config.typekitSourceTitle:
                  if (TypekitPreview) {
                    TypekitPreview.load([
                      {
                        'id': fontSourceData.web_id,
                        'variations': ['n4'],
                      }
                    ], {
                      fontactive: function () {
                        app.handleLoadedFont(font)
                      }
                    })
                  }
                  break
              }
            }
          }
        })
      },
      getFontVariant(fontVariants) {
        let includes = fontVariants.includes('regular')
        if (includes) {
          return '';
        } else {
          return `:${fontVariants[0]}`
        }
      },
      handleLoadedFont(font) {
        let fontTitle = font.title.toLowerCase()

        // Loop through all fonts and set loaded to font with same title
        this.mainFonts.forEach(mainFont => {
          if (mainFont.title.toLowerCase() === fontTitle) {
            mainFont.loaded = true
          }
          mainFont.pairings.forEach(pairFont => {
            if (pairFont.title.toLowerCase() === fontTitle) {
              pairFont.loaded = true
            }
          })
        })
        this.$store.commit('addLoadedFont', fontTitle)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/mixins';
  @import '~assets/css/variables';
  @import '../../../public/assets/css/mixins';

  h1, h2 {
    margin: 0;
  }

  nav {
    padding: $padding 0;
    margin: 0 $padding;
    border-bottom: 1px solid #ccc;

    .title {
      font-family: sans-serif;
      font-weight: 700;

      &__prefix {
        color: $redColor;
        font-family: 'Lora', serif;
        font-style: italic;
      }

      &__description {
        font-weight: normal;
        @include font-family;

        a {
          color: #fff;
        }
      }
    }
  }

  .main-layout {
    @include layout();
  }

  .result {
    height: calc(100vh - 285px);
    overflow: auto;
    padding: $padding 0 0 0;
    font-family: sans-serif;

    &__font {
      &-spacer {
        width: $padding  * 2;
      }
    }

    &__fonts {
      margin-bottom: 40px;
    }

    &__sites {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      margin: -43px;

    }

    &__loading {
      width: 100%;
      height: inherit;
      text-align: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      padding-top: 20px;

      img {
        width: 50px;
      }
    }
  }

  .desktop__lists {
    padding: $padding 0 $padding $padding;
  }

  .mobile-lists {
    background-color: #1c2cff;
    color: #fff;
    padding: 0 $padding;

    &__title {
      color: #fb0061;
      font-family: 'Lora', serif;
      font-style: italic;
      padding: 30px 37px;
      font-size: 18px;
    }
  }

  // Mobile
  @media (min-width: 0) {
    nav {
      height: auto;

      .title {
        font-size: 32px;

        &__prefix {
          font-size: 14px;
        }

        &__description {
          font-size: 14px;
        }
      }
    }

    .mobile-hidden {
      display: none;
    }

    .main-layout {
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
    }

    .desktop__lists {
      padding: 0;
    }

    .result {
      height: auto;

      &__sites {
        margin: 0;

        .site--full-width {
          width: 100%
        }

        .site--half-width {
          width: calc(50% - 74px)
        }

        &--accented {
          display: none;

          .site--main /deep/ .product-hunt-icon {
            bottom: 90px;
          }

          .row {
            .site {
              width: calc(66.666% - 74px);
            }

            .column--accented {
              width: calc(33.333% - 74px);

              .site {
                width: calc(100% - 74px);

                .title {
                  padding-top: 10px;
                  padding-bottom: 10px;
                }
              }
            }
          }
        }
      }

      &__font-spacer {
        width: 20px;
      }

      &__fonts {
        padding: 0 20px;
      }
    }
  }

  @media (min-width: 350px) {
    .result {
      &__fonts {
        display: flex;
        padding: 0 $padding;
      }

      &__font-spacer {
        width: $padding;
      }
    }

    .title {
      &__prefix {
        font-size: 18px;
      }
    }
  }

  // Desktop
  @media (min-width: 771px) {
    nav {
      height: 100px;

      .title {
        font-size: 42px;

        &__description {
          font-size: 18px;
        }
      }
    }

    .mobile-hidden {
      display: flex;
    }

    .desktop__lists {
      padding: $padding 0;
      flex-basis: 30%;
    }

    #main-list, #paired-list, .result__fonts {
      display: flex;
    }

    .mobile-lists {
      display: none;
    }

    .mobile-lists__title {
      display: none;
    }

    .result {
      height: calc(100vh - 259px);
      flex-basis: 70%;

      &__fonts {
        padding: 0 $padding;
      }

      &__sites {
        padding: 0;
      }

      &__site--simple {
        &--simple {
          display: block;
        }

        &--accented {
          display: none;
        }
      }
    }

    .main-layout {
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
      -ms-flex-direction: row;
      flex-direction: row;
    }
  }

  @media (min-width: 950px) {
    nav {
      height: 145px;

      .title {
        font-size: 54px;

        &__prefix {
          font-size: 24px;
        }

        &__description {
          font-size: 24px;
        }
      }
    }
  }

  @media (min-width: 1280px) {
    nav {
      .title {
        font-size: 72px;

        &__prefix {
          font-size: 24px;
        }

        &__description {
          font-size: 24px;
        }
      }
    }

    .result {
      &__fonts {
        padding: 0 ($padding * 2);
      }

      &__font-spacer {
        width: $padding * 2;
      }

      &__sites {
        padding: 0 $padding;
      }
    }
  }

  @media (min-width: 1450px) {
    .result {
      &__fonts {
        padding: 0 ($padding * 2);
      }

      &__font-spacer {
        width: $padding * 2;
      }
    }
  }

  @media (min-width: 1600px) {
    .shown-outline {
      .result__site--simple {
        display: block;
      }

      .result__sites--accented {
        display: none;
      }
    }

    .hidden-outline {
      .result__site--simple {
        display: none;
      }

      .result__sites--accented {
        display: flex;
      }
    }
  }
</style>
