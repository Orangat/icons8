<template lang="pug">
  .language-detection(v-if="isShown")
    .text(v-on:click="selectLanguage" v-html="text")
    .close(v-on:click="hide" v-html="icons.cancel")
</template>

<script>
  import utils from '../plugins/utils'
  import cancel from '../assets/svg/cancel.svg'

  import { mapState } from 'vuex'
  export default {
    name: 'languageDetection',
    serverCacheKey: props => JSON.stringify(props),
    props: {
      lang: String
    },
    data () {
      return {
        isShown: false,
        locales: utils.locales,
        userLocale: undefined,
        icons: {
          cancel
        }
      }
    },
    computed: {
      ...mapState({
        userLoaded: (state) => state.auth.user.loaded,
        userCountry: (state) => state.auth.user.userCountry,
        locale: state => state.lang.locale
      }),
      text () {
        const image = `<img class="flag" src="${this.locales[this.userLocale].icon}"/>`
        const messages = {
          'en-US': `Switch to ${image} English`,
          'es-ES': `Cambiar a ${image} Español`,
          'fr-FR': `Passer au ${image} Français`,
          'it-IT': `Passare a ${image} Italiano`,
          'de-DE': `Auf ${image} Deutsch`,
          'ru-RU': `Переключиться на ${image} Русский`,
          'pt-BR': `Mudar para ${image} Português`,
          'pl-PL': `Przełączyć na ${image} Polski`,
          'zh-CN': `切换到 ${image} 中国`,
          'ja-JP': `${image} 日本語に切り替える`
        }
        return messages[this.userLocale]
      }
    },
    watch: {
      userLoaded () {
        if (this.userLoaded) {
          const country = this.userCountry || 'US'
          if (this.locale && !this.locale.includes(country, 3)) {
            Object.keys(this.locales).some(locale => {
              if (this.locales[locale].countries.indexOf(country) >= 0) {
                this.userLocale = locale
                return true
              }
            })
            if (this.userLocale && !localStorage.getItem('savedLang')) {
              this.show()
            }
          }
        }
      }
    },
    methods: {
      show () {
        this.isShown = true
        document.body.classList.add('is-notification-shown')
      },
      hide () {
        this.isShown = false
        document.body.classList.remove('is-notification-shown')
        localStorage.setItem('savedLang', true)
      },
      selectLanguage () {
        const loc = this.locales[this.userLocale].url + location.pathname
        if (loc !== location.href) location.href = loc
        localStorage.setItem('savedLang', true)
      }
    }
  }
</script>

<style lang="scss">
  @import '../assets/css/variables';

  .is-notification-shown {
    position: absolute;
    top: 2.25rem;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .language-detection {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 2.25rem;
    line-height: 2.25rem;
    z-index: 20;
    background: $color-green-light;
    text-align: center;
    color: white;
    font-weight: 400;

    .text {
      display: inline-block;
      cursor: pointer;
    }

    .flag {
      width: 30px;
      vertical-align: middle;
    }

    .close {
      position: absolute;
      top: 0;
      right: 0;
      width: 2.25rem;
      height: 2.25rem;
      line-height: 2.25rem;
      text-align: center;
      cursor: pointer;

      &>svg {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        vertical-align: middle;
        fill: currentColor;
      }
    }
  }
</style>
