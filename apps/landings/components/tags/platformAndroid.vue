<template lang="pug">
  .platform-android(v-if="icons.length || category")
    .app-page-section
      .container
        h2.app-page-title.is-platform {{ $t('WEB_APP.SEO.SEARCH.TITLE_PLATFORM', {term: term, platformTitle: 'Android'}) }}
        p.app-page-subtitle.is-platform(v-html="$t('WEB_APP.LANDING_TAGS.PLATFORM_DESCRIPTION', {term: term, count: count, platformTitle: 'android'})")
        platform-grid(
          v-bind:icons="icons"
          v-bind:category="category"
          v-bind:platform="'android'"
          v-bind:iconColor="'715f2d'"
          v-bind:iconPlusColor="'d2bf8b'"
          v-bind:iconCustomSize="48"
          v-bind:term="term"
        )

</template>

<script>
export default {
  name: 'platformAndroid',
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
      return this.$store.state.appInfo.iconsCounts.android
    }
  }
}
</script>

<style lang="scss" scoped>
  .platform-android {
    background-color: #faecc6;
    border-bottom: 1px solid #d2bf8b;

    & /deep/ .icon-wrapper {
      &::after {
        border-color: #d2bf8b;
      }
    }
    & /deep/ .icon-name {
      color: #988759;
    }
    & /deep/ .all-platform-list {
      color: black;

      &::before {
        background-color: black;
      }
      &::after {
        border-right-color: black;
        border-bottom-color: black;
      }
    }
  }
</style>

