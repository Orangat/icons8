<template lang="pug">
  .platform-nolan(v-if="icons.length || category")
    .app-page-section.is-background
      .container
        h2.app-page-title.is-platform {{ $t('WEB_APP.LANDING_TAGS.PLATFORM_TITLE_NOLAN', {term: term}) }}
        p.app-page-subtitle.is-platform(v-html="$t('WEB_APP.LANDING_TAGS.PLATFORM_DESCRIPTION', {term: term, count: count, platformTitle: 'nolan'})")
        platform-grid(
          v-bind:icons="icons"
          v-bind:category="category"
          v-bind:platform="'nolan'"
          v-bind:iconPlusColor="'abccdb'"
          v-bind:term="term"
        )

</template>

<script>
export default {
  name: 'platformNolan',
  props: {
    icons: {
      type: Array,
      'default' () {
        return []
      }
    },
    category: Object,
    term: String
  },
  computed: {
    count () {
      return this.$store.state.appInfo.iconsCounts.nolan
    }
  }
}
</script>

<style lang="scss" scoped>
  .platform-nolan {
    background-color: #E3E7E8;
    border-bottom: 1px solid #abccdb;


    .app-page-section {
      &.is-background {
        position: relative;
        background: url('../../static/vue-static/landings/tags/backgrounds/bg1.png') no-repeat;
        background-size: contain;
        background-position: right bottom;
      }
    }
    & /deep/ .icon-wrapper {
      &::after {
        border-color: #abccdb;
      }
    }
    & /deep/ .icon-name {
      color: #7f9ba8;
    }
    & /deep/ .platform-grid {
      margin-bottom: 930px;
      @media (max-width: 2048px) {
        margin-bottom: 750px;
      }
      @media (max-width: 1680px) {
        margin-bottom: 600px;
      }
      @media (max-width: 1440px) {
        margin-bottom: 530px;
      }
      @media (max-width: 1280px) {
        margin-bottom: 450px;
      }
      @media (max-width: 1024px) {
        margin-bottom: 360px;
      }
      @media (max-width: 800px) {
        margin-bottom: 280px;
      }
      @media (max-width: 720px) {
        margin-bottom: 240px;
      }
      @media (max-width: 640px) {
        margin-bottom: 210px;
      }
      @media (max-width: 425px) {
        margin-bottom: 150px;
      }
    }
  }
</style>

