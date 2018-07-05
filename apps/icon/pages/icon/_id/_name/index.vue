<template lang="pug">
  .icon-page
    app-search(v-bind:locale="lang" v-bind:collections="false")

    .app-page-section

      .breadcrumbs
        template(v-for="(value, i) in breadcrumbs")
          a.is-blue.breadcrumb(v-bind:href="value.url") {{ value.title }}
          span(v-if="i+1 < breadcrumbs.length") &nbsp;›&nbsp;

      h1.app-page-title(v-html="title")
      .app-page-subtitle(v-html="description")

      .icon-page-wrapper
        app-icon.icon-page-icon(
          v-bind:alt="alt"
          v-bind:icon="icon"
          v-bind:force-png="true"
          v-bind:custom-size="800"
          v-bind:lazy="false"
        )

        app-ads

    .app-page-section.is-grey.is-underline
      download-icon(v-bind:icon="icon" v-bind:locale="lang")
      similar-icons.is-responsive(v-if="icon" v-bind:icon="icon")

    .app-page-section.is-underline(v-if="icon.transcription")
      .app-page-subtitle(v-html="icon.transcription")

    .app-page-section.is-underline
      h1.app-page-title {{ relatedTitle }}
      template(v-if="relatedDescription")
        .app-page-subtitle(v-html="relatedDescription")

      related-icons(v-bind:icon="icon")
      icon-tags(v-bind:tags="icon.tags")

    .app-page-section.is-underline(v-if="icon.request")
      .icon-request
        h2 {{ requestTitle }}&nbsp;
          span {{ requestAuthor }}
        .app-page-subtitle {{ requestDates }}
        br
        p(v-html="icon.request.text")
        .request-comments(v-for="comment in icon.request.comments")
          .comment-author
            .comment-icon(v-html="icons.comment")
            | {{ comment.author }}
          .comment-text(v-html="comment.text")

    .app-page-section.is-underline.is-fixed(v-if="icon.story")
      .icon-story
        h2 {{ storyTitle }}
        div(v-html="icon.story.text")
        a.story-author(v-if="icon.story.authorLink" v-bind:href="icon.story.authorLink")
          img.author-image(v-bind:src="icon.story.authorPhoto")
          span.author-name  {{ icon.story.authorName }}
        .story-author(v-else)
          img.author-image(v-bind:src="icon.story.authorPhoto")
          span.author-name  {{ icon.story.authorName }}

    .app-page-section.is-underline.is-fixed(v-if="icon.usageStory")
      .icon-page-story(v-html="icon.usageStory")

    .app-page-section.is-underline.is-fixed
      app-comments(v-bind:id="pageId")
</template>

<script>
  import moment from 'moment'
  import { mapState } from 'vuex'
  import Vue from 'vue'
  import config from '~/plugins/config'
  import utils from '~/plugins/utils'

  import comment from '../../../../../public/assets/svg/comment.svg'

  export default {
    name: 'iconPage',
    layout: 'app-landing',
    scrollToTop: true,
    asyncData ({app, params, store, redirect, res, error}) {
      let id = params.id
      let name = params.name
      return store.dispatch('getIcon', {id, info: true})
        .then(response => {
          const icon = response.icon
          store.dispatch('setPlatform', icon.platform)

          const name = icon.translations ? icon.translations[store.state.lang.locale] : icon.name
          const encodedName = utils.normalizeValue(name)
          const platform = store.state.appInfo.platforms[icon.platform]
          const platformTitle = platform ? platform.title : 'iOS'
          let canonical = `${store.state.appInfo.backendUrl}/icon/${icon.mainId}/${encodedName}`
          store.dispatch('updateSEO', {
            title: Vue.$t('WEB_APP.SEO.CATEGORY.ICON_TITLE', {name: icon.name}),
            description: Vue.$t('WEB_APP.SEO.CATEGORY.ICON_DESCRIPTION_PLATFORM', {name: icon.name, platform: platformTitle}),
            canonical,
            twitterImage: response.icon.shareTwitter,
            googleImage: response.icon.shareGoogle,
          })
          if (icon.translations) {
            app.head.link = app.head.link || []
            store.state.appInfo.activeLanguages.forEach(lang => {
              app.head.link.forEach(link => {
                if (link.hreflang === lang.code) {
                  const name = utils.normalizeValue(icon.translations[lang.locale])
                  link.href = `${lang.url}/icon/${icon.id}/${name}`
                }
              })
            })
          }
          return {
            icon
          }
        })
        .catch(response => {
          if (response.idea) {
            if (process.server) {
              res.setHeader('Location', encodeURI(response.idea))
            } else {
              window.location = response.idea
            }
            error({statusCode: 302, message: `Redirecting to ${response.idea}`})
            return
          }
          redirect(`/icon/set/${encodeURI(name)}/all`)
          return {
            error: {
              message: response.message
            }
          }
        })
    },
    data () {
      return {
        icon: {
          id: 20825,
          name: 'Icon8 Logo'
        },
        icons: {
          comment
        }
      }
    },
    computed: {
      ...mapState({
        appInfo: state => state.appInfo,
        packs: state => state.appInfo.packs,
        lang: state => state.lang.locale,
        platform: state => state.platform
      }),
      pageId () {
        return `icon/${this.$route.params.id}`
      },
      alt () {
        return this.icon.name + ' icon' + (this.icon.transcription ? '. ' + this.icon.transcription : '')
      },
      title () {
        return this.$t(`WEB_APP.VIEW_ICONS.TITLE.${this.icon.platform}`,
          {name: this.icon.name},
          this.$t('WEB_APP.VIEW_ICONS.TITLE.win10', {name: this.icon.name}))
      },
      description () {
        const params = {
          name: this.icon.name,
          icons: this.icon.name,
          iconsCount: this.appInfo.iconsCount,
          iconsCountsIos7: this.appInfo.iconsCounts.ios7,
          iconsCountsWin8: this.appInfo.iconsCounts.win8,
          iconsCountsWin10: this.appInfo.iconsCounts.win10,
          iconsCountsDotty: this.appInfo.iconsCounts.dotty,
          iconsCountsColor: this.appInfo.iconsCounts.color,
          iconsCountsNolan: this.appInfo.iconsCounts.nolan,
          iconsCountsOffice: this.appInfo.iconsCounts.office,
          iconsCountsAndroid: this.appInfo.iconsCounts.android,
          iconsCountsAndroidL: this.appInfo.iconsCounts.androidL
        }
        let description = this.icon.description
        if (!description) {
          description = this.$t(`WEB_APP.VIEW_ICONS.DESCRIPTION_PLATFORM.${this.icon.platform}`, params, '')
        }
        if (!description) {
          description = this.$t(`WEB_APP.VIEW_ICONS.RANDOM_DESCRIPTION.${parseInt(this.icon.commonId) % 5}`, params,
            this.$t(`WEB_APP.VIEW_ICONS.RANDOM_DESCRIPTION.0`, params))
        }
        return description
      },
      breadcrumbs () {
        const freeIconsCode = 'WEB_APP.VIEW_ICONS.BREADCRUMBS.FREE_ICONS'
        const webIconsCode = 'WEB_APP.VIEW_ICONS.BREADCRUMBS.WEB_ICONS'
        const iphoneIconsCode = 'WEB_APP.VIEW_ICONS.BREADCRUMBS.IPHONE_ICONS'
        const colorIconsCode = 'WEB_APP.VIEW_ICONS.BREADCRUMBS.COLOR_ICONS'
        const flatIconsCode = 'WEB_APP.VIEW_ICONS.BREADCRUMBS.FLAT_ICONS'
        const iconsForFreeCode = 'WEB_APP.VIEW_ICONS.BREADCRUMBS.ICONS_FOR_FREE'
        const windowIconsCode = 'WEB_APP.VIEW_ICONS.BREADCRUMBS.WINDOW_ICONS'
        const freeVectorCode = 'WEB_APP.VIEW_ICONS.BREADCRUMBS.FREE_VECTOR'
        const officeIconsCode = 'WEB_APP.VIEW_ICONS.BREADCRUMBS.OFFICE_ICONS'

        const pack = this.packs.find(pack => pack.name[this.lang] === this.icon.category)
        const breadcrumbs = [{
          url: config.backendUrl,
          title: this.$t(freeIconsCode)
        }, {
          url: this.platform.url,
          title: this.platform.title
        }, {
          url: pack ? utils.getPackUrl(pack.code) : '',
          title: this.icon.category
        }]
        if (this.icon.platform === 'win8') {
          breadcrumbs[1].title = this.$t(webIconsCode)
        }
        if (this.icon.platform === 'ios7') {
          breadcrumbs[1].title = this.$t(iphoneIconsCode)
        }
        if (this.icon.platform === 'color') {
          breadcrumbs[0].title = this.$t(flatIconsCode)
          breadcrumbs[1].title = this.$t(colorIconsCode)
        }
        if (this.icon.platform === 'win10') {
          breadcrumbs[0].title = this.$t(iconsForFreeCode)
          breadcrumbs[1].title = this.$t(windowIconsCode)
        }
        if (this.icon.platform === 'office') {
          breadcrumbs[0].title = this.$t(freeVectorCode)
          breadcrumbs[1].title = this.$t(officeIconsCode)
        }
        return breadcrumbs
      },
      relatedTitle () {
        return this.$t('WEB_APP.VIEW_ICONS.RELATED_TITLE', {name: this.icon.name })
      },
      relatedDescription () {
        const pack = this.packs.find(pack => pack.name[this.lang] === this.icon.category)
        return this.$t('WEB_APP.VIEW_ICONS.RELATED_TEXT', {
          url: this.appInfo.backendUrl,
          category: pack ? pack.code : 'free-icons',
          categoryLowercase: (''+this.icon.category).toLocaleLowerCase()
        })
      },
      requestTitle () {
        return this.$t('WEB_APP.VIEW_ICONS.IDEA_TITLE', {name: this.icon.name})
      },
      requestAuthor () {
        if (this.icon.request.author) {
          return this.$t('WEB_APP.VIEW_ICONS.IDEA_AUTHOR', {author: this.icon.request.author})
        }
      },
      requestDates () {
        const subtitle = this.$t('WEB_APP.VIEW_ICONS.IDEA_SUBTITLE')
        const created = moment(this.icon.request.created*1000).format('MMMM DD, YYYY')
        const and = this.$t('WEB_APP.VIEW_ICONS.IDEA_AND_CREATED')
        const completed = moment(this.icon.request.completed*1000).format('MMMM DD, YYYY')
        return `${subtitle} ${created} ${and} ${completed}`
      },
      storyTitle () {
        return this.$t('WEB_APP.VIEW_ICONS.STORY_TITLE', {name: this.icon.name})
      }
    },
    mounted () {
      this.$analytics.track({
        event: 'Viewed Product',
        category: 'Navigation',
      })
      this.$analytics.page({
        name: 'Product Page'
      })
      if (this.error) {
        this.$error({
          title: this.$t('WEB_APP.MESSAGES.LOAD_FAILED'),
          text: this.error.message
        })
      }
    }
  }
</script>

<style lang="scss">
  @import '../../../../assets/css/variables';
  @import '../../../../assets/css/breakpoints';

  .icon-page {
    position: relative;
    padding-right: $similar-icons-width;

    @media (max-width: $responsive-app) {
      padding-right: 0;
    }

    .icon-page-icon {
      width: 270px !important;
      height: 270px !important;
      margin: 32px auto 16px;
      @media (max-width: 1240px) {
        width: 220px !important;
        height: 220px !important;
      }
      @media (max-width: 800px) {
        width: 180px !important;
        height: 180px !important;
      }
    }

    .icon-page-wrapper {
      position: relative;
      @media (min-width: 1240px) {
        .app-ads {
          position: absolute;
          top: 0;
          right: 0;
        }
      }
    }

    .icon-page-story {
      margin: 0 auto;
      font-size: 18px;
      max-width: 800px;
    }

    .related-icons {
      margin: 3rem 0 1.5rem;
    }

    .icon-request {
      margin: 0 auto;
      font-size: 18px;
      max-width: 800px;
    }

    .icon-story {
      margin: 0 auto;
      font-size: 18px;
      max-width: 800px;

      .story-author {
        display: inline-block;
        margin: 2rem 0 1rem;
      }
      .author-image {
        width: 50px;
        height: 50px;
        border-radius: 25px;
        vertical-align: bottom;
        margin-right: 15px;
        transition: all .35s ease-out;
      }
      .author-name {
        font-size: 15px;
        line-height: 50px;
      }
    }

    .request-comments {
      margin-top: 2.5rem;

      .comment-author {
        color: #9b9b9b;
        padding-left: 24px;
        position: relative;
      }

      .comment-icon {
        position: absolute;
        left: 0;
        width: 16px;
        &>svg {
          width: 100%;
          fill: currentColor;
        }
      }

      .comment-text {
        padding-left: 24px;
        margin-bottom: 2.5rem;
        &:last-child {
          margin-bottom: 1rem;
        }
      }
    }

    .app-comments {
      max-width: 800px;
      margin: 0 auto;
    }
  }
</style>
