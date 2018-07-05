<template lang="pug">
  .container
    .layout.column

      .layout.layout--space-between.row
        .flex.stats-block(@click="show('sites')" :class="{ 'stats-block--active': pages.sites }")
          .stats-block__title Websites
          .stats-block__amount {{ stats.sites }}
        .flex.stats-block(@click="show('excludedSites')" :class="{ 'stats-block--active': pages.excludedSites }")
          .stats-block__title Excluded websites
          .stats-block__amount {{ stats.excludedSites }}
        .flex.stats-block(@click="show('fonts')" :class="{ 'stats-block--active': pages.fonts }")
          .stats-block__title Fonts
          .stats-block__amount {{ stats.fonts }}
        .flex.stats-block(@click="show('excludedFonts')" :class="{ 'stats-block--active': pages.excludedFonts }")
          .stats-block__title Excluded fonts
          .stats-block__amount {{ stats.excludedFonts }}

      .stats-block__data.sites(v-show="pages.sites")
        table.desktop
          thead
            tr
              th Number of Fonts
              th.text--left Website
              th Votes on ProductHunt
          tbody
            tr(v-for="site in sites" :key="site.id")
              td.text--center
                span.fonts-link(v-if="site.fonts.length" @click="showFonts(site)") {{ site.fonts.length }}
                span(v-else) {{ site.fonts.length }}
              td.ellipsis.expand
                span.ellipsis__container
                  a(:href="site.url" target="_blank") {{ site.name }}
              td.text--center
                span {{ site.votes_count }}
        .loading.layout.column(v-show="loading")
          img(src="~/static/vue-static/fonts-app/loading.gif")
        table.mobile
          tbody
            tr(v-for="site in sites" :key="site.id")
              td
                div(style="width: 50%;")
                  span.row-title Website:&nbsp;
                  a.row-text(:href="handleSiteUrl(site)" target="_blank") {{ site.name }}
                div
                  span.row-title Number of fonts:&nbsp;
                  span.row-text.fonts-link(v-if="site.fonts.length" @click="showFonts(site)") {{ site.fonts.length }}
                  span.row-text(v-else) {{ site.fonts.length }}
                div
                  span.row-title Votes:&nbsp;
                  span.row-text {{ site.votes_count }}
        .loading.layout.column(v-show="loading")
          img(src="~/static/vue-static/fonts-app/loading.gif")
        pager(
          @select="selectSitePage"
          :totalPages="sitesPages"
          :total="stats.sites"
          v-show="!loading"
        )

      .stats-block__data(v-show="pages.excludedSites")
        table
          thead
            tr
              th.text--left URL
          tbody
            tr(v-for="excludedSite in excludedSites" :key="excludedSite.id")
              td.ellipsis.expand--full
                span.ellipsis__container
                  a(:href="excludedSite.url" target="_blank") {{ excludedSite.url }}

      .stats-block__data.fonts(v-show="pages.fonts")
        table.desktop
          thead
            tr
              th Rating
              th.text--left Title
              th.text--left Source
          tbody
            tr(v-for="font in fonts" :key="font.id")
              td.text--center {{ font.rating }}
              td.ellipsis.expand
                span.ellipsis__container {{ font.title }}
              td
                .link(v-if="isSourceService(font)")
                  a(:href="getSourceLink(font)" target="_blank") Get from {{ getSourceLinkText(font) }}
        table().mobile
          tbody
            tr(v-for="font in fonts" :key="font.id")
              td
                div
                  span Title:&nbsp;
                  span.row-text {{ font.title }}
                div
                  span Rating:&nbsp;
                  span.row-text {{ font.rating }}
                div(v-if="isSourceService(font)")
                  span Source:&nbsp;
                  span.row-text.link
                    a(:href="getSourceLink(font)" target="_blank") Get from {{ getSourceLinkText(font) }}
        .loading.layout.column(v-show="loading")
          img(src="~/static/vue-static/fonts-app/loading.gif")
        pager(
          @select="selectFontPage"
          :totalPages="fontsPages"
          :total="stats.fonts"
          v-show="!loading"
        )

      .stats-block__data(v-show="pages.excludedFonts")
        table
          thead
            tr
              th.text--left Title
          tbody
            tr(v-for="excludedFont in excludedFonts" :key="excludedFont.id")
              td.ellipsis.expand--full
                span.ellipsis__container {{ excludedFont.title }}

    .modal(ref="modal" v-show="modal")
      .modal__content
        span.modal__close(@click="modal = false") &times;
        div(v-if="currentSite")
          .site-font__title
            div Fonts of
            a(:href="currentSite.url" target="_blank") {{ currentSite.name }}
          .layout.layout--wrap.row
            .site-font(v-for="siteFont in currentSite.fonts")
              .site-font__font-title {{ siteFont.title }}
</template>

<script>
  import { mapState } from 'vuex'
  import { mapGetters } from 'vuex'
  import pager from '~/components/pager'
  import fontsApi from '~/api'

  export default {
    components: { pager },
    mounted() {
      const app = this
      this.$refs.modal.addEventListener('click', event => {
        app.modal = false
        event.stopPropagation()
      })
    },
    asyncData ({store}) {
      return new Promise(function (resolve) {
        store.dispatch('updateSEO', store.getters['getSeoData'])
        store.dispatch('getStatsData', { callback: (sitesPages, fontsPages) => resolve({ sitesPages, fontsPages }) })
      })
    },
    data () {
      return {
        modal: false,
        currentSite: null,
        loading: false,
        pages: {
          sites: true,
          sitesPages: 0,
          fonts: false,
          fontsPages: 0,
          excludedSites: false,
          excludedFonts: false
        },
      }
    },
    computed: {
      ...mapState({
        fonts: state => state.fonts,
        sites: state => state.sites,
        stats: state => state.stats,
        excludedSites: state => state.excludedSites,
        excludedFonts: state => state.excludedFonts,
        ...mapGetters(['getSourceLink', 'getSourceLinkText', 'isSourceService'])
      })
    },
    methods: {
      handleSiteUrl(site) {
        return site.url.replace(/\/?\?ref=producthunt$/i, '')
      },
      show(pageToShow) {
        Object.keys(this.pages).forEach(pageTitle => {
            this.pages[pageTitle] = pageToShow === pageTitle
        })
      },
      showFonts(site) {
        this.currentSite = site
        this.modal = true
      },
      selectSitePage(page) {
        this.loading = true
        fontsApi.getSitesPage(page, (sites) => {
          this.$store.commit('setSites', sites)
          this.loading = false
        })
      },
      selectFontPage(page) {
        this.loading = true
        fontsApi.getFontsPage(page, (fonts) => {
          this.$store.commit('setFonts', fonts)
          this.loading = false
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/mixins';
  @import '~assets/css/variables';

  a {
    color: #7a7a7a;
  }

  .stats-block {
    cursor: pointer;
    border: 1px solid #616161;
    flex-basis: 19%;
    text-align: center;

    &--active {
      background-color: #616161;
    }

    &__title {
      text-transform: uppercase;
      font-weight: bold;
      padding: 0 0 5px 0;
    }

    &__data {
      color: #ccc;
      padding: 25px 0 0 0;

      a {
        color: #ccc;
      }

      .fonts-link {
        cursor: pointer;
        text-decoration: underline;
      }

      table {
        width: 100%;
        border-collapse: collapse;

        tr:hover {
          background-color: #212121;
        }

        th {
          font-size: 20px;
          border-bottom: 1px solid #616161;;
          padding: 16px;
        }

        .expand {
          width: 60%;

          &--full {
            width: 100%;
          }
        }

        .ellipsis {
          position: relative;
          left: 16px;

          &:before {
            content: '&nbsp;';
            visibility: hidden;
          }

          &__container {
            position: absolute;
            left: 0;
            right: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        td {
          border-bottom: 1px solid #424242;;
          padding: 16px;

          .row-text {
            color: #757575;
          }

          .link a {
            color: #7a7a7a;

            &:hover {
              color: $redColor;
            }
          }
        }
      }
    }

    &__link {
      color: #7a7a7a;
      cursor: pointer;

      &:hover {
        color: $redColor;
      }
    }
  }

  table.mobile {
    td {
      white-space: nowrap;
      padding: 10px 0;

      &:first-child {
        width: 100px;
        max-width: 100px;
        overflow:hidden;
      }
    }
  }

  .loading {
    width: 100%;
    padding: 55px 0 55px 0;
    text-align: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;

    img {
      width: 50px;
    }
  }

  /* The Modal (background) */
  .modal {
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: hidden; /* Enable scroll if needed */
    background-color: #fff; /* Fallback color */
    background-color: rgba(255, 255, 255, 0.3); /* Black w/ opacity */

    /* Modal Content/Box */
    &__content {
      background-color: #000;
      margin: 20px auto 15% auto; /* 15% from the top and centered */
      height: calc(100vh - 78px);
      overflow: auto;
      padding: 20px;
      border: 1px solid #888;
      width: 80%; /* Could be more or less, depending on screen size */

      .site-font {
        border: 1px solid #757575;
        margin: 10px;
        padding: 10px;
        border-radius: 10px;

        &__title {
          text-align: center;
          font-size: 22px;
          padding: 0 0 20px 0;
        }

        &__font-title {
          color: #ccc;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }

    /* The Close Button */
    &__close {
      color: #aaa;
      float: right;
      font-size: 28px;
      font-weight: bold;

      &:hover,
      &:focus {
        color: #fff;
        text-decoration: none;
        cursor: pointer;
      }
    }
  }

  @media (min-width: 0) {
    .container {
      padding: $padding * .5;
    }

    .stats-block {
      padding: 5px;

      &__title {
        font-size: 10px;
      }

      &__amount {
        font-size: 18px;
      }
    }

    .desktop {
      display: none;
    }

    .mobile {
      display: table;
    }
  }

  @media (min-width: 350px) {
    .container {
      padding: $padding * .75;
    }
    .stats-block__title {
      font-size: 12px;
    }
  }

  @media (min-width: 500px) {
    .container {
      padding: $padding;
    }

    .stats-block {
      padding: 10px;

      &__title {
        font-size: 20px;
      }

      &__amount {
        font-size: 28px;
      }
    }
  }

  @media (min-width: 650px) {
    .desktop {
      display: table;
    }

    .mobile {
      display: none;
    }
  }
</style>