<template lang="pug">
  .platform-ultraviolet(v-if="icons.length || category")
    .app-page-section.is-background
      .container
        h2.app-page-title.is-platform {{ $t('WEB_APP.LANDING_TAGS.PLATFORM_TITLE_ULTRAVIOLET', {term: term}) }}
        p.app-page-subtitle.is-platform(v-html="$t('WEB_APP.LANDING_TAGS.PLATFORM_DESCRIPTION', {term: term, count: count, platformTitle: 'ultraviolet'})")
        platform-grid(
          v-bind:icons="icons"
          v-bind:category="category"
          v-bind:platform="'ultraviolet'"
          v-bind:iconPlusColor="'c1a353'"
          v-bind:iconCustomSize="80"
          v-bind:term="term"
        )

</template>

<script>
export default {
  name: 'platformUltraviolet',
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
      return this.$store.state.appInfo.iconsCounts.ultraviolet
    }
  }
}
</script>

<style lang="scss" scoped>
  .platform-ultraviolet {
    background-color: #f1d077;
    border-bottom: 1px solid #c1a353;

    & /deep/ .icon-wrapper {
      &::after {
        border-color: #c1a353;
      }
    }
    & /deep/ .icon-name {
      color: #a58940;
    }
    .icon-grid {
      margin-bottom: 320px;
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
