<template lang="pug">
  .app-ads
    .container
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'appAds',
    props: {
      landingAds: false
    },
    data () {
      return {
        container: undefined
      }
    },
    computed: {
      ...mapState({
        user: state => state.auth.user
      })
    },
    mounted () {
      this.container = this.$el.querySelector('.container')
    },
    watch: {
      '$route' () {
        this.loadAds()
      },
      'user.loaded' () {
        if (this.user.isGuest) {
          this.loadAds()
        }
      },
      'user.isGuest' () {
        if (this.user.loaded && this.user.isGuest) {
          this.loadAds()
        } else {
          this.cleanAds()
        }
      }
    },
    methods: {
      loadAds () {
        if (this.user.isGuest && this.lang !== 'zh-cN') {
          this.cleanAds()

          const v = {
            id: "Setup.Icons8.com.Desktop.icons8.com_300x250_icon_page",
            placement: "2aGmKEGh8rxYA6TTytYvHRDFTjIXQFuROUvhUIC5xJD.Q7"
          }
          if (this.landingAds) {
            v.id = "Setup.Icons8.com.Desktop.icons8.com_300x250_front_page"
            v.placement = "UtjwgZb.1wnADY044qnodrqq.qcrdzugUzMb4aTIpez.m7"
          }
          const ads = document.createElement('iframe')
          ads.setAttribute('id', v.id)
          ads.setAttribute('width', '300')
          ads.setAttribute('HEIGHT', '250')
          ads.setAttribute('FRAMEBORDER', '0')
          ads.setAttribute('SCROLLING', 'no')
          ads.setAttribute('MARGINHEIGHT', '0')
          ads.setAttribute('MARGINWIDTH', '0')
          ads.setAttribute('TOPMARGIN', '0')
          ads.setAttribute('LEFTMARGIN', '0')
          ads.setAttribute('ALLOWTRANSPARENCY', 'true')
          this.container.appendChild(ads)
          const doc = ads.contentWindow.document
          if (location.protocol.substr(0,4) === 'http') {
            doc.write(unescape('%3C') + 'script src="' + location.protocol + '//lv.adocean.pl/_' + (new Date()).getTime() + '/ad.js?id=' + v.placement + '/x=' + screen.width + '/y=' + screen.height + '" type="text/javascript"' + unescape('%3E%3C') + '/script' + unescape('%3E'))
          }
          doc.close()
        }
      },
      cleanAds () {
        while (this.container.firstChild) {
          this.container.removeChild(this.container.firstChild)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app-ads {
    margin: 2rem auto 0;
    max-width: 300px;

    &:after {
      content: "";
      display: table;
      clear: both;
    }

    .carbon {
      font-size: 12px;
      text-align: left;
      text-decoration: none;

      & /deep/ .carbon-img {
        float: left;
        margin-right: 0.5rem;
        text-decoration: none;
        border: none;
      }
      & /deep/ .carbon-text {
        text-decoration: none;
        border: none;
      }
    }
  }
</style>
