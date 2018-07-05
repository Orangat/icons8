<template lang="pug">
  .platform-ios7(v-if="icons.length || category")
    .app-page-section.is-background
      .container
        h2.app-page-title.is-platform {{ $t('WEB_APP.SEO.SEARCH.TITLE_PLATFORM', {term: term, platformTitle: 'iOS'})}}
        p.app-page-subtitle.is-platform(v-html="$t('WEB_APP.LANDING_TAGS.PLATFORM_DESCRIPTION_IOS7', {term: term})")
        platform-grid(
          v-bind:icons="icons"
          v-bind:category="category"
          v-bind:platform="'ios'"
          v-bind:iconColor="'3584fc'"
          v-bind:iconPlusColor="'abccdb'"
          v-bind:iconCustomSize="75"
          v-bind:term="term"
        )

</template>

<script>
export default {
  name: 'platformIos7',
  props: {
    icons: {
      type: Array,
      'default' () {
        return []
      }
    },
    category: Object,
    term: String
  }
}
</script>

<style lang="scss" scoped>
  .platform-ios7 {
    background-color: #F0F4F7;
    border-bottom: 1px solid #abccdb;

    .app-page-section {
      &.is-background {
        position: relative;
        background: url('../../static/vue-static/landings/tags/backgrounds/bg2.png') no-repeat;
        background-size: contain;
        background-position: right bottom;
      }
    }
    & /deep/ .icon-wrapper {
      background-color: #F0F4F7;
      &::after {
        border-color: #abccdb;
      }
      &:hover .download-icon {
        color: #3584fc;
      }
    }
    & /deep/ .icon-name {
      color: #7f9ba8;
    }
  }
</style>
