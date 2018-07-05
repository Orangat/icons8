<template lang="pug">
  .tag-landing-page
    platform-icons(v-bind:category="getPlatformCategory('color')" v-bind:term="packName")
    platform-win10(v-bind:category="getPlatformCategory('win10')" v-bind:term="packName")
    platform-color(v-bind:category="getPlatformCategory('color')" v-bind:term="packName")
    platform-ios7(v-bind:category="getPlatformCategory('ios7')" v-bind:term="packName")
    platform-material(v-bind:category="getPlatformCategory('androidL')" v-bind:term="packName")
    platform-glyphs(v-bind:category="getPlatformCategory('ios11')" v-bind:term="packName")
    platform-office(v-bind:category="getPlatformCategory('office')" v-bind:term="packName")
    platform-duskwired(v-bind:category="getPlatformCategory('Dusk_Wired')" v-bind:term="packName")
    platform-dusk(v-bind:category="getPlatformCategory('dusk')" v-bind:term="packName")
    platform-ultraviolet(v-bind:category="getPlatformCategory('ultraviolet')" v-bind:term="packName")
    platform-dotty(v-bind:category="getPlatformCategory('dotty')" v-bind:term="packName")
    platform-nolan(v-bind:category="getPlatformCategory('nolan')" v-bind:term="packName")
    platform-p1em(v-bind:category="getPlatformCategory('p1em')" v-bind:term="packName")
    platform-android(v-bind:category="getPlatformCategory('android')" v-bind:term="packName")
    platform-metro(v-bind:category="getPlatformCategory('win8')" v-bind:term="packName")

    .app-page-section.description(v-if="category.subcategory")
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

    .nothing-found(v-if="category.subcategory === 0 && isLoaded")
      h2 {{ $t('WEB_APP.NOTHING_FOUND.TITLE') }}
      p {{ $t('WEB_APP.NOTHING_FOUND.DESC') }}
      a.button.is-small(href="https://icons8.com/request-icon/free/hot" target="_blank") {{ $t('WEB_APP.NOTHING_FOUND.REQUEST') }}
</template>

<script>
  import utils from '~/plugins/utils'
  import config from '~/plugins/config'
  import Vue from 'vue'

  import { mapState } from 'vuex'

  export default {
    layout: 'tags',
    asyncData ({ app, store, params }) {
      return new Promise(resolve => {
        const pack = utils.normalizeValue(params.pack)
        store.dispatch('setPack', pack)

        const state = store.state
        const locale = state.lang.locale
        const name = state.pack.name[locale] || state.pack.name['en-US']

        store.dispatch('getPack', {amount: 2500, platform: 'all'})
          .then(response => {
            store.dispatch('updateSEO', {
              title: Vue.$t('WEB_APP.SEO.TITLE', {title: name}),
              description: Vue.$t('WEB_APP.SEO.DESCRIPTION_ICONS8', {title: name}),
              image: response.category.sharePreview,
              canonical: `${store.state.appInfo.backendUrl}/icon/set/${pack}`
            })
            // hreflang
            app.head.link = app.head.link || []
            store.state.appInfo.activeLanguages.forEach(lang => {
              app.head.link.forEach(link => {
                if (link.hreflang === lang.code) {
                  const name = utils.normalizeValue(state.pack.name[lang.locale] || name)
                  link.href = `${lang.url}/icon/pack/${name}`
                }
              })
            })
            resolve({...response, isLoaded: true})
          })
          .catch(error => {
            console.log('error', error)
            resolve({})
          })
      })
    },
    data () {
      return {
        category: {},
        isLoaded: false
      }
    },
    computed: {
      ...mapState({
        pack: state => state.pack,
        locale: state => state.lang.locale
      }),
      packName () {
        return this.pack.name[this.locale] || this.pack.name['en-US']
      },
      licenseUrl () {
        return `${config.backendUrl}/paid-license-99/#/`
      },
      appUrl () {
        return `${config.backendUrl}/app`
      }
    },
    methods: {
      getPlatformIcons (platform) {
        return this.category.subcategory ? this.category.subcategory[0].icons.filter(icon => icon.platform === platform) : []
      },
      getPlatformCategory (platform) {
        if (!this.category) {
          return undefined
        }
        const subcategory = this.category.subcategory
          .map(subcategory => {
            return {
              name: subcategory.name,
              icons: subcategory.icons.filter(icon => icon.platform === platform)
            }
          })
          .filter(subcategory => subcategory.icons.length)
        return subcategory.length ? {subcategory} : undefined
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
