<template lang="pug">
  .page.upload-page(v-if="!isGuest")
    .app-page-section
      h1.app-page-title Feed Us Your Icons
      p.app-page-subtitle {{ subtitle }}

      img.feed-me(src="/vue-static/bro/feedme.gif")

    .app-page-section
      h1.app-page-title.is-small What's Your Style?

      .grid
        nuxt-link.icon(
          v-for="platform in platforms"
          v-bind:key="platform.id"
          v-bind:to="`/upload/${platform.apiCode}`"
        )
          app-icon(
            v-bind:platform="platform.apiCode"
            v-bind:svg="platform.image || '<svg></svg>'"
          )
          .icon-title {{ platform.title }}

</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'UploadPage',
    data () {
      return {
        subtitle: 'Upload up to 200 icons at once. We\'ll use a number of algorithms to match and tag your icons. You\'re welcome to edit the tags, but if not, never mind. We\'ll do it for you.',
        homeIcons: [
          {
            id: 73,
            platform: 'ios7'
          }, {
            id: 59809,
            platform: 'ios11'
          }, {
            id: 5572,
            platform: 'androidL'
          }, {
            id: 12229,
            platform: 'color'
          }, {
            id: 14096,
            platform: 'win10'
          }, {
            id: 21081,
            platform: 'office'
          }, {
            id: 47772,
            platform: 'Dusk_Wired'
          }, {
            id: 42814,
            platform: 'dusk'
          }, {
            id: 41651,
            platform: 'ultraviolet'
          }, {
            id: 42439,
            platform: 'dotty'
          }, {
            id: 44013,
            platform: 'nolan'
          }, {
            id: 43699,
            platform: 'p1em'
          }, {
            id: 3200,
            platform: 'android'
          }, {
            id: 72,
            platform: 'win8'
          }, {
            id: 61447,
            platform: 'cotton'
          }, {
            id: 43699,
            platform: 'agata'
          }
        ]
      }
    },
    computed:{
      ...mapState({
        isGuest: (state) => state.auth.user.isGuest,
        platforms: (state) => state.platforms
      })
    },
    methods: {
      getPlatformName (code) {
        return this.platforms[code] ? this.platforms[code].title : code
      }
    }
  }
</script>

<style lang="scss">
  @import '../../assets/css/variables';
  @import '../../assets/css/mixins';

  .upload-page {
    background-color: #fafafa;

    .feed-me {
      display: block;
      width: 160px;
      margin: 4rem auto 0;
    }
    .grid {
      margin: 2rem auto;
      max-width: 960px;
      min-width: 600px;
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      &.is-popup {
        margin: 1.5rem auto;
      }
    }
    .icon {
      position: relative;
      display: inline-block;
      width: 114px;
      height: 114px;
      margin-bottom: 0.5rem;
      border-radius: 5px;
      color: inherit;
      cursor: pointer;
      transition: 0.4s all ease;
      &:hover {
        background-color: #f4f4f4;
        text-decoration: none;
      }
    }
    .app-icon {
      margin: 6px auto;
    }
    .icon-title {
      text-align: center;
      font-size: 16px;
      font-weight: 300;
    }
  }
</style>
