<template lang="pug">
  .app-menu
    .app-menu-toggle(v-on:click="show = true" v-html="icons.menu")
    template(v-if="showLogo")
      a.app-menu-logo(v-if="!isSlotLogo" v-bind:href="logoUrl" v-html="logo")
      a.app-menu-logo(v-if="isSlotLogo" v-bind:href="logoUrl")
        slot(name="logo")
      a.app-menu-item.is-logo(v-bind:href="logoUrl") {{ logoText }}

    transition(name="app-modal")
      .app-menu-overlay(
        v-on:click="show = false"
        v-if="show"
      )

    .app-menu-responsive(v-bind:class="{'is-active': show}")
      .app-menu-center(v-if="showItems")
        a.app-menu-item.menu-item-icons(v-bind:href="baseUrl + '/icon'") {{ $t('MENU.ICONS', 'Icons') }}
        a.app-menu-item.is-sounds(v-bind:href="baseUrl + '/lunacy'") Lunacy
        a.app-menu-item.is-sounds(href="https://photos.icons8.com") {{ $t('MENU.PHOTOS', 'Photos') }}
        a.app-menu-item.is-sounds(v-bind:href="baseUrl + '/music'") {{ $t('MENU.MUSIC', 'Music') }}
        span.vertical-line
        a.app-menu-item(v-bind:href="baseUrl + '/paid-license-99'") {{ $t('MENU.BUY', 'Buy') }}
        .app-menu-item
          app-popup.app-menu-submenu.is-wide(
            position="bottom-center"
            responsive-position="bottom-left"
            v-bind:responsive-width="800"
          ) {{ $t('MENU.LABS', 'Labs') }}
            div(slot="content")
              .ribbon All Free
              .app-menu-column.is-half
                a.app-menu-submenu-item(v-bind:href="baseUrl + '/app'")
                  img.app-menu-image(src="../assets/images/icons8-96.png")
                  | Icons8 App
                  br
                  small {{ $t('MENU.APP_DESC', 'All our icons offline on your computer') }}
                a.app-menu-submenu-item(href="https://img.icons8.com/")
                  img.app-menu-image(src="../assets/images/stoned-bat-96.png")
                  | omg-img
                  br
                  small {{ $t('MENU.OMG_DESC', 'Search icons by writing URL') }}
                a.app-menu-submenu-item(v-bind:href="baseUrl + '/imessage'")
                  img.app-menu-image(src="../assets/images/mongrol-96.png")
                  |  {{ $t('MENU.IMESSAGE', 'iMessage Stickers') }}
                  br
                  small {{ $t('MENU.IMESSAGE_DESC', '3,900 flat color icons in your iMessages') }}
                a.app-menu-submenu-item(v-bind:href="baseUrl + '/line-awesome'")
                  img.app-menu-image(src="../assets/images/scout-knot-96.png")
                  | Line Awesome
                  br
                  small {{ $t('MENU.LA_DESC', 'Replace FontAwesome with modern line icons') }}
                a.app-menu-submenu-item(v-bind:href="baseUrl + '/pedro'")
                  img.app-menu-image(src="../assets/images/comet-96.png")
                  | Cosmic Pedro
                  br
                  small {{ $t('MENU.PEDRO_DESC', 'Choose icon, add text, post to social media') }}

              .app-menu-column.is-half
                a.app-menu-submenu-item(v-bind:href="baseUrl + '/sounds'")
                  img.app-menu-image(src="../assets/images/sounds-96.png")
                  | Icons8 Sounds
                  br
                  small {{ $t('MENU.SOUNDS_DESC', 'Free sounds for emoji and 1000 UI sound effects') }}
                a.app-menu-submenu-item(href="http://ai.icons8.com/Scribble/Search")
                  img.app-menu-image(src="../assets/images/autograph-96.png")
                  | Scribble AI
                  br
                  small {{ $t('MENU.SCRIBBLE_DESC', 'Search icons by drawing') }}
                a.app-menu-submenu-item(href="https://www.iconpharm.com/")
                  img.app-menu-image(src="../assets/images/sheep-96.png")
                  | IconPharm
                  br
                  small {{ $t('MENU.ICONPHARM_DESC', 'Icons8 technology for open source icons') }}
                a.app-menu-submenu-item(v-bind:href="baseUrl + '/welovesvg'")
                  img.app-menu-image(src="../assets/images/year-of-monkey-96.png")
                  | We Love SVG
                  br
                  small {{ $t('MENU.WE_LOVE_SVG_DESC', 'Insert open source icons into your web apps') }}
                a.app-menu-submenu-item(href="https://github.com/icons8/impresser")
                  img.app-menu-image(src="../assets/images/robot-96.png")
                  | Impresser
                  br
                  small {{ $t('MENU.IMPRESSER_DESC', 'As a front-end developer, I want HTML for bots') }}
        a.app-menu-item.blog-menu-item(v-bind:href="blogUrl") {{ $t('MENU.BLOG', 'Blog') }}

      .app-menu-profile(v-if="showLangs || showAuth")
        .app-menu-language(v-if="showLangs")
          .app-menu-item
            app-popup(
              ref="langPopup"
              position="bottom-right"
              responsive-position="top"
              v-bind:responsive-width="800"
              v-bind:show-toggle="false"
            )
              .app-menu-language-icon
                img(v-bind:src="locales[locale].icon")
              div(slot="content")
                .list
                  .list-item(
                    v-on:click="selectLanguage(lang)"
                    v-for="lang in locales"
                  ) {{ lang.name }}

        app-menu-auth(v-if="showAuth")

</template>

<script>
  import logo from '../assets/svg/logo.svg'
  import notifications from '../assets/svg/notifications.svg'
  import menu from '../assets/svg/menu.svg'
  import utils from '../plugins/utils'

  export default {
    name: 'appMenu',
    serverCacheKey: props => JSON.stringify(props),
    props: {
      baseUrl: {
        type: String,
        'default': 'https://icons8.com'
      },
      blogUrl: {
        type: String,
        'default': 'https://icons8.com/blog'
      },
      logo: {
        type: String,
        'default': logo
      },
      logoUrl: {
        type: String,
        'default': 'https://icons8.com'
      },
      logoText: {
        type: String,
        'default': 'Icons8'
      },
      active: {
        type: String
      },
      locale: {
        type: String,
        'default': 'en-US'
      },
      showLogo: {
        type: Boolean,
        'default': true
      },
      showItems: {
        type: Boolean,
        'default': true
      },
      showLangs: {
        type: Boolean,
        'default': true
      },
      showAuth: {
        type: Boolean,
        'default': true
      }
    },
    data () {
      return {
        icons: {
          notifications,
          menu
        },
        show: false,
        isSlotLogo: false,
        locales: utils.locales
      }
    },
    created () {
      if (!this.$t) {
        this.$t = function (term, fallback) {
          return fallback
        }
      }
    },
    mounted () {
      if (this.$slots.logo) {
        this.isSlotLogo = true
      }
      if (this.active) {
        const menuItem = this.$el.querySelector(`.app-menu-item.is-${this.active}`)
        if (menuItem) {
          menuItem.classList.add('is-active')
        }
      }
    },
    methods: {
      selectLanguage (lang) {
        const loc = lang.url + location.pathname
        if (loc !== location.href) location.href = loc
        this.$refs.langPopup.closePopup()
      }
    }
  }
</script>

<style lang="scss">
  @import '../assets/css/variables';
  @import '../assets/css/breakpoints';
  .vertical-line {
    height: 40px;
    width: 1px;
    background: #fff;
    opacity: 0.4;
    display: inline-block;
    margin: 10px 10px 0;
    @media (max-width: $responsive-app-left-sidebars) {
      display: none;
    }
  }
  .app-menu {
    position: relative;
    height: $menu-height;
    padding: 0 1rem;
    font-size: 1.125rem;

    color: white;
    background: #70d467;
    background: linear-gradient(to right, #70d467 0%, #6fbbfa 100%);

    @media (max-width: $responsive-menu-medium) {
      padding: 0 1rem;
    }

    @media (max-width: 75rem) {
      padding: 0 1rem;
    }

    &.is-white {
      background-color: white;
      color: black;

      .app-menu-responsive.is-active {
        .app-menu-item {
          color: white;
        }
      }
    }

    .app-menu-overlay {
      @media (max-width: $responsive-menu-short) {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,0.3);
        z-index: 2;

        &.is-active {
          left: 0;
        }
      }
    }

    .app-menu-responsive {
      @media (max-width: $responsive-menu-short) {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: fixed;
        top: 0;
        bottom: 0;
        left: -201px;
        width: 200px;
        padding: 1rem 1rem 2rem;
        background: #2c3e50;
        transition: 0.4s all ease;
        z-index: 2;

        &.is-active {
          left: 0;
          z-index: 2;
        }
      }
    }

    .app-menu-toggle {
      display: none;
      cursor: pointer;
      @media (max-width: $responsive-menu-short) {
        display: inline-block;
        width: 26px;
        position: absolute;
        top: 18px;
        left: 1rem;

        & > svg {
          fill: currentColor;
        }
      }
    }

    .app-menu-logo {
      display: inline-block;
      width: 3rem;
      line-height: 5.7rem;
      float: left;
      color: inherit;

      @media (max-width: $responsive-menu-short) {
        display: block;
        margin: 0 auto;
        float: none;
      }

      & > svg {
        fill: currentColor;
      }
    }
    .blog-menu-item {
      position: relative;
      &:after{
        position: absolute;
        content: '';
        width: 5px;
        height: 5px;
        background: #FED9A3;
        top: 16px;
        right: 117px;
        border-radius: 50%;
        display: none;
      }
    }
    .menu-item-icons{
      position: relative;
      &:after{
        position: absolute;
        content: '';
        bottom: -4px;
        left: 50%;
        background: url("/vue-static/icon/pointer.svg");
        width: 27px;
        height: 6px;
        margin-left: -13px;
        @media (max-width: $responsive-app-left-sidebars) {
          display: none;
        }
      }
    }
    .app-menu-item {
      display: inline-block;
      color: inherit;
      padding: 0 12px;
      vertical-align: top;
      height: $menu-height - 7px;
      line-height: $menu-height - 16px;
      text-decoration: none;
      border-top: 0.25rem solid transparent;
      border-bottom: 0.25rem solid transparent;
      transition: all 0.4s ease;
      cursor: pointer;

      &:hover, &.is-active {
        border-bottom: 0.25rem solid rgba(0, 0, 0, 0.15);
      }

      .app-popup-arrow {
        display: none;
      }

      @media (max-width: $responsive-menu-wide) {
        padding: 0 8px;
      }
      @media (max-width: $responsive-menu-medium) {
        padding: 0 6px;
        font-size: 1rem;
      }
      @media (max-width: $responsive-menu-short) {
        display: block;
        text-align: left;
      }

      &.is-logo {
        float: left;
        font-size: 20px;
        @media (max-width: $responsive-menu-medium) {
          display: none;
        }
      }
    }

    .app-menu-submenu {
      position: relative;
      &.app-popup .app-popup-content {
        position: fixed;
        width: 400px;
        padding: 2rem 2rem 1rem;
        margin-top: 0;
        text-align: left;
        color: black;
        line-height: 1.4;
        cursor: default;
        @media (max-width: $responsive-menu-medium) {
          width: 360px;
          padding: 1rem 1rem 0.5rem;
        }
        @media (max-width: $responsive-menu-short) {
          position: absolute;
          transform: none;
        }
      }
      &.is-wide .app-popup-content {
        width: 800px;
        @media (max-width: $responsive-menu-medium) {
          width: 360px;
          line-height: 1.2;
        }
      }
    }

    .app-menu-column {
      &.is-half {
        width: 50%;
        float: left;
        @media (max-width: $responsive-menu-medium) {
          width: 100%;
        }
      }
    }

    .app-menu-submenu-item {
      float: left;
      width: 100%;
      margin-bottom: 1rem;
      border-color: transparent;
      text-decoration: none;
      white-space: initial;
      cursor: pointer;

      &>small {
        color: $color-font-light;
        float: left;
        width: calc(100% - 68px);
      }
    }

    .app-menu-image {
      width: 48px;
      float: left;
      margin-right: 1rem;
    }

    .app-menu-center {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      height: $menu-height;
      z-index: 1;

      text-align: center;
      white-space: nowrap;

      @media (max-width: $responsive-menu-medium) {
        position: static;
        left: 0;
        transform: translateX(0);
        display: inline-block;
        vertical-align: top;
        width: auto;
      }
      @media (max-width: $responsive-menu-short) {
        height: auto;
      }
    }

    .app-menu-profile {
      float: right;

      @media (max-width: $responsive-menu-short) {
        float: none;
      }

      .app-menu-item {
        padding: 0 8px;
        & > svg {
          fill: currentColor;
          width: 1.25rem;
          vertical-align: sub;
        }
        @media (max-width: $responsive-menu-medium) {
          padding: 0 6px;
        }
        @media (max-width: $responsive-menu-short) {
          padding: 0 0.75rem;
        }
      }
    }

    .app-menu-language {
      float: right;

      @media (max-width: $responsive-menu-short) {
        float: none;
      }
      .app-menu-item {
        padding: 0 6px;
        @media (max-width: $responsive-menu-short) {
          padding: 0 0.75rem;
        }
      }
      .app-menu-language-icon {
        padding-top: 0.375rem;
        & > img {
          width: 30px;
          vertical-align: sub;
        }
      }
      .app-popup-content {
        width: 110px;
        margin-right: -0.5rem;
      }
    }
  }


  .app-menu-enter-active, .app-menu-leave-active {
    transition: all 0.2s;
  }
  .app-menu-enter, .app-menu-leave-active {
    opacity: 0;
  }
</style>
