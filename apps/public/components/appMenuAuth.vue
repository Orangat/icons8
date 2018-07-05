<template lang="pug">
  .app-menu-auth
    template(v-if="!isGuest")
      a.app-menu-item(v-bind:href="baseUrl + '/profile/summary'") {{ $t('MENU.MY_ACCOUNT', 'My Account') }}
      .app-menu-item(v-on:click="logoutUser" v-html="icons.logout")
    template(v-if="isGuest")
      .app-menu-item.menu-item_login(v-on:click="login") {{ $t('MENU.LOGIN', 'Login') }}
      .app-menu-item(v-on:click="register") {{ $t('MENU.REGISTER', 'Register') }}
</template>

<script>
  import logout from '../assets/svg/logout.svg'
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'appMenuAuth',
    serverCacheKey: () => 'appMenuAuth',
    props: {
      baseUrl: {
        type: String,
        'default': 'https://icons8.com'
      },
    },
    data () {
      return {
        icons: {
          logout
        }
      }
    },
    computed: {
      ...mapState({
        isGuest: state => state.auth.user.isGuest
      })
    },
    created () {
      if (!this.$t) {
        this.$t = function (term, fallback) {
          return fallback
        }
      }
    },
    methods: {
      ...mapActions(['logoutUser']),
      login () {
        this.$modal.show('login-modal')
      },
      register () {
        this.$modal.show('login-modal', {mode: 'register'})
      }
    }
  }
</script>

<style lang="scss">
  .app-menu-auth {
    display: inline-block;
    margin-right: 25px;
  }
  .menu-item_login {
    position: relative;

    &:after {
      content: '';
      position: absolute;
      left: -12px;
      top: 17px;
      width: 16px;
      height: 16px;
      background: url("/vue-static/icon/key.png");
      background-size: contain;
    }
  }
</style>
