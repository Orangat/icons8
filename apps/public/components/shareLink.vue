<template lang="pug">
  .share-link(v-bind:class="{'is-short': isShort}")
    template(v-if="isShort")
      a.item
        .icon(v-html="icons.link")
      a.item.is-facebook(v-bind:href="facebookUrl")
        .icon(v-html="icons.facebook")
      a.item.is-twitter(v-bind:href="twitterUrl")
        .icon(v-html="icons.twitter")

    template(v-else="!isShort")
      a.item.is-twitter(v-bind:href="twitterUrl" target="_blank")
        .icon(v-html="icons.twitter")
        | Twitter
      a.item.is-facebook(v-bind:href="facebookUrl" target="_blank")
        .icon(v-html="icons.facebook")
        | Facebook
      a.item.is-google(v-bind:href="googleUrl" target="_blank")
        .icon(v-html="icons.googlePlus")
        | Google+
      template(v-if="showLink")
        br
        click-to-copy(v-bind:text="shareUrl")

</template>

<script>
  import link from '../assets/svg/link.svg'
  import twitter from '../assets/svg/twitter.svg'
  import facebook from '../assets/svg/facebook.svg'
  import googlePlus from '../assets/svg/googleplus.svg'

  export default {
    name: 'shareLink',
    props: {
      url: {
        type: String,
        'default': undefined
      },
      text: {
        type: String,
        'default': 'Icons8'
      },
      type: {
        type: String,
        validator (value) {
          return value === 'normal' ||
            value === 'short'
        },
        'default': 'normal'
      },
      showLink: {
        type: Boolean
      }
    },
    data () {
      return {
        shareUrl: undefined,
        icons: {
          link,
          twitter,
          facebook,
          googlePlus
        }
      }
    },
    computed: {
      isShort () {
        return this.type === 'short'
      },
      encodedUrl () {
        return encodeURIComponent(this.shareUrl)
      },
      encodedText () {
        return encodeURIComponent(this.text)
      },
      twitterUrl () {
        return `http://www.twitter.com/share?url=${this.encodedUrl}&text=${this.encodedText}&via=icons_8`
      },
      facebookUrl () {
        return `http://www.facebook.com/sharer/sharer.php?u=${this.encodedUrl}`
      },
      googleUrl () {
        return `https://plus.google.com/share?url=${this.encodedUrl}`
      }
    },
    mounted () {
      this.shareUrl = this.url || location.href
    }
  }
</script>

<style lang="scss" scoped>
  .share-link {
    margin: 0 auto;
    text-align: center;
    font-size: 1rem;

    .item {
      display: inline-block;
      position: relative;
      white-space: nowrap;
      border-radius: 3px;
      height: 2rem;
      line-height: 2rem;
      padding: 0 0.5rem;
      margin: 0.5rem;
      color: #fff;
      fill: #fff;
      background-color: rgba(0, 0, 0, 0.25);
      vertical-align: top;
      transition: 0.3s all ease-out;
      cursor: pointer;
      text-decoration: none;

      &.is-twitter {
        &:hover {
          background-color: rgba(0, 183, 236, 0.7);
        }
      }
      &.is-facebook {
        &:hover {
          background-color: rgba(66, 84, 151, 0.7);
        }
      }
      &.is-google {
        &:hover {
          background-color: rgba(221, 66, 65, 0.7);
        }
      }
    }

    .icon {
      display: inline-block;
      width: 1.25rem;
      height: 2rem;
      margin-right: 0.5rem;
      vertical-align: top;
      &> /deep/ svg {
        width: 100%;
        height: 100%;
      }
    }

    &.is-short {
      .share-link-item {

      }
    }

    .click-to-copy {
      margin-top: 1rem;
      font-size: 1rem;
    }
  }
</style>
