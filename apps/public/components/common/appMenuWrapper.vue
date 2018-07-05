<template lang="pug">
  .app-menu
    .app-menu-toggle(v-on:click="show = true" v-html="icons.menu")
    a.app-menu-logo(v-if="!isSlotLogo" v-bind:href="logoUrl" v-html="logo")
    a.app-menu-logo(v-if="isSlotLogo" v-bind:href="logoUrl")
      slot(name="logo")
    a.app-menu-item.is-logo(v-bind:href="logoUrl") {{ logoText }}

    transition(name="app-modal")
      .app-menu-overlay(v-on:click="show=false" v-if="show")

    .app-menu-responsive(v-bind:class="{'is-active': show}")
      .app-menu-center
        slot
      .app-menu-profile
        slot(name="profile")

</template>

<script>
  import logo from '../../assets/svg/logo.svg'
  import menu from '../../assets/svg/menu.svg'

  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'appMenu',
    serverCacheKey: props => JSON.stringify(props),
    props: {
      baseUrl: {
        type: String,
        'default': 'https://icons8.com'
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
      }
    },
    data () {
      return {
        icons: {
          menu
        },
        show: false,
        isSlotLogo: false
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
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/css/variables';
  @import '../../assets/css/breakpoints';

  .app-menu {
    position: relative;
    z-index: 10;
    height: $menu-height;
    padding: 0 2rem;
    font-size: 1.125rem;

    color: white;
    background: #70d467;
    background: linear-gradient(to right, #70d467 0%,#6fbbfa 100%);

    @media (max-width: $responsive-menu-medium) {
      padding: 0 1rem;
    }

    @media (max-width: 75rem) {
      padding: 0 1rem;
    }

    .app-menu-overlay {
      @media (max-width: $responsive-menu-short) {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,0.3);

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

        &.is-active {
          left: 0;
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
        top: 10px;
        left: 1rem;

        & > /deep/ svg {
          fill: currentColor;
        }
      }
    }

    .app-menu-logo {
      display: inline-block;
      width: $menu-height;
      height: $menu-height;
      line-height: $menu-height;
      float: left;
      color: inherit;

      @media (max-width: $responsive-menu-short) {
        display: block;
        margin: 0 auto;
        float: none;
      }

      & > /deep/ svg {
        fill: currentColor;
      }
    }

    .app-menu-item {
      display: inline-block;
      color: inherit;
      padding: 0 12px;
      vertical-align: top;
      height: $menu-height;
      line-height: $menu-height - 8px;
      text-decoration: none;
      border-top: 0.25rem solid transparent;
      border-bottom: 0.25rem solid transparent;
      transition: all 0.4s ease;
      cursor: pointer;

      &:hover, &.is-active {
        border-bottom: 0.25rem solid rgba(0, 0, 0, 0.15);
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
  }


  .app-menu-enter-active, .app-menu-leave-active {
    transition: all 0.2s;
  }
  .app-menu-enter, .app-menu-leave-active {
    opacity: 0;
  }
</style>
