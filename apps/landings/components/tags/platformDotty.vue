<template lang="pug">
  .platform-dotty(v-if="icons.length || category")
    .app-page-section
      .container
        h2.app-page-title.is-platform {{ $t('WEB_APP.LANDING_TAGS.PLATFORM_TITLE_DOTTY', {term: term}) }}
        p.app-page-subtitle.is-platform(v-html="$t('WEB_APP.LANDING_TAGS.PLATFORM_DESCRIPTION', {term: term, count: count, platformTitle: 'dotty'})")
        platform-grid(
          v-bind:icons="icons"
          v-bind:category="category"
          v-bind:platform="'dotty'"
          v-bind:iconColor="'c94747'"
          v-bind:iconPlusColor="'c7c7c7'"
          v-bind:term="term"
        )

</template>

<script>
export default {
  name: 'platformDotty',
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
      return this.$store.state.appInfo.iconsCounts.dotty
    }
  }
}
</script>

<style lang="scss" scoped>
  .platform-dotty {
    background-color: white;
    border-bottom: 1px solid #c7c7c7;

    .app-page-subtitle {
      &.is-grey {
        color: #9B9B9B;
      }
    }
    & /deep/ .icon-wrapper {
      &::after {
        border-color: #c7c7c7;
      }
    }
    & /deep/ .icon-name {
      color: #979797;
    }

  }
</style>

