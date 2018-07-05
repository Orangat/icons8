<template lang="pug">
  .tag-landing-page
    platform-icons(v-bind:icons="getPlatformIcons('color')" v-bind:term="beautyTerm")
    platform-win10(v-bind:icons="getPlatformIcons('win10')" v-bind:term="beautyTerm")
    platform-color(v-bind:icons="getPlatformIcons('color')" v-bind:term="beautyTerm")
    platform-ios7(v-bind:icons="getPlatformIcons('ios7')" v-bind:term="beautyTerm")
    platform-material(v-bind:icons="getPlatformIcons('androidL')" v-bind:term="beautyTerm")
    platform-glyphs(v-bind:icons="getPlatformIcons('ios11')" v-bind:term="beautyTerm")
    platform-office(v-bind:icons="getPlatformIcons('office')" v-bind:term="beautyTerm")
    platform-duskwired(v-bind:icons="getPlatformIcons('Dusk_Wired')" v-bind:term="beautyTerm")
    platform-dusk(v-bind:icons="getPlatformIcons('dusk')" v-bind:term="beautyTerm")
    platform-ultraviolet(v-bind:icons="getPlatformIcons('ultraviolet')" v-bind:term="beautyTerm")
    platform-dotty(v-bind:icons="getPlatformIcons('dotty')" v-bind:term="beautyTerm")
    platform-nolan(v-bind:icons="getPlatformIcons('nolan')" v-bind:term="beautyTerm")
    platform-p1em(v-bind:icons="getPlatformIcons('p1em')" v-bind:term="beautyTerm")
    platform-android(v-bind:icons="getPlatformIcons('android')" v-bind:term="beautyTerm")
    platform-metro(v-bind:icons="getPlatformIcons('win8')" v-bind:term="beautyTerm")

    .app-page-section.description(v-if="icons.length")
      .container
        .subtitle-wrapper
          .app-page-subtitle.description
            div(v-html="$t('WEB_APP.LANDING_TAGS.DESCRIPTION_3')")
            br
            div(v-html="$t('WEB_APP.LANDING_TAGS.DESCRIPTION_4')")
          .icon-lightning
            app-icon(
              v-bind:id="33691"
              v-bind:color="'ffc107'"
              v-bind:customSize="104"
            )
          .icon-flash
            app-icon(
              v-bind:id="21717"
              v-bind:customSize="192"
            )
        .button-wrapper
          a.btn.btn-buy(v-bind:href="licenseUrl") {{ $t('WEB_APP.LANDING_TAGS.SUBSCRIBE', {price: '$19.90'}) }}
          a.btn.btn-app(v-bind:href="appUrl") {{ $t('WEB_APP.LANDING_TAGS.DOWNLOAD')}}

    .nothing-found(v-if="icons.length === 0 && isLoaded")
      h2 {{ $t('WEB_APP.NOTHING_FOUND.TITLE') }}
      p {{ $t('WEB_APP.NOTHING_FOUND.DESC') }}
      a.button.is-small(href="https://icons8.com/request-icon/free/hot" target="_blank") {{ $t('WEB_APP.NOTHING_FOUND.REQUEST') }}
</template>

<script>
  import utils from '~/plugins/utils'
  import config from '~/plugins/config'
  import Vue from 'vue'

  export default {
    layout: 'tags',
    asyncData ({ app, store, params }) {
      const term = utils.normalizeValue(params.term)
      const beautyTerm = utils.uppercaseFirstLetter(utils.prettifyValue(term))

      return new Promise(resolve => {
        store.dispatch('search', {
          term,
          amount: 250,
          platform: 'all',
          options: {
            'translations': true,
            'origin-name': true
          }
        })
          .then(response => {
            const icons = response.icons.filter(icon => icon.platform === 'color')
            const icon = icons[0] || response.icons[0]
            let image = ''
            if (icon) {
              const platform = store.state.appInfo.platforms[icon.platform]
              const seoCode = platform ? platform.seoCode : 'ios'
              const commonName = icon.commonName
              image = `${config.iconsUrl}/${seoCode}/500/${commonName}.png`
            }
            store.dispatch('updateSEO', {
              title: Vue.$t('WEB_APP.SEO.SEARCH.TITLE', {term: beautyTerm}),
              description: Vue.$t('WEB_APP.SEO.SEARCH.META_DESCRIPTION', {term: beautyTerm}),
              image,
              canonical: `${store.state.appInfo.backendUrl}/icon/set/${term}`
            })
            // hreflang
            app.head.link = app.head.link || []
            if (response.translations) {
              store.state.appInfo.activeLanguages.forEach(lang => {
                app.head.link.forEach(link => {
                  if (link.hreflang === lang.code) {
                    const name = utils.normalizeValue(response.translations[lang.locale] || term)
                    link.href = `${lang.url}/icon/set/${name}`
                  }
                })
              })
            } else {
              app.head.link = app.head.link.filter(link => !link.hreflang)
            }
            resolve({...response, beautyTerm, isLoaded: true})
          })
          .catch(error => {
            console.log('error', error)
            resolve({})
          })
      })
    },
    data () {
      return {
        icons: [],
        isLoaded: false,
        beautyTerm: ''
      }
    },
    computed: {
      licenseUrl () {
        return `${config.backendUrl}/paid-license-99/#/`
      },
      appUrl () {
        return `${config.backendUrl}/app`
      }
    },
    methods: {
      getPlatformIcons (platform) {
        return this.icons.filter(icon => icon.platform === platform)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../public/assets/css/variables";

  .tag-landing-page {
    & /deep/ .container {
      max-width: 854px;
      margin: 0 auto;
      padding: 0;
    }

    & /deep/ .app-page-section {
      &.description {
        position: relative;
        padding-top: 88px;
        padding-bottom: 96px;
        background-color: #ecf1f5;
        overflow: hidden;
      }
    }

    & /deep/ .app-page-subtitle {
      &.description {
        font-size: 18px;
        max-width: 100%;
        text-align: left;
        margin-left: 0;
        margin-bottom: 64px;
        padding-left: 0;
        color: black;
      }
      a {
        color: inherit;
        text-decoration: underline;
        border: none;
      }
    }
    .subtitle-wrapper {
      position: relative;
      max-width: 640px;
    }

    .icon-lightning {
      position: absolute;
      top: -24px;
      left: -120px;

      @media (max-width: 1024px){
        left: -86px;
      }

      @media (max-width: 990px){
        display: none;
      }
    }
    .icon-flash {
      position: absolute;
      top: -24px;
      right: -216px;

      @media (max-width: 990px){
        display: none;
      }
    }

    & /deep/ .is-blue {
      color: $color-blue;
    }
    & /deep/ .button-wrapper {
      display: flex;

      @media (max-width: 540px) {
        flex-direction: column;
        align-items: flex-start;
      }
    }
    & /deep/ .btn {
      font-size: 18px;
      font-weight: 500;
      background-color: #E05454;
      border-radius: 4px;
      padding: 12px 24px;
      color: white;
      cursor: pointer;

      &:hover {
        background-color: #D24A4A;
      }

      @media (max-width: 425px) {
        padding: 10px 22px;
      }
    }
    & /deep/ .btn-buy {
      margin-right: 16px;

      @media (max-width: 540px) {
        margin-bottom: 16px;
      }
    }
    & /deep/ .btn-app {
      background-color: white;
      color: black;
      border: 1px solid #C7C7C7;

      &:hover {
        background-color: #E6EDF1;
      }
    }

    .nothing-found {
      padding: 24rem 2rem;
      text-align: center;
    }
  }
</style>
