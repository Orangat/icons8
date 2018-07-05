<template lang="pug">
  .platform-dusk(v-if="icons.length || category")
    .app-page-section
      .container
        h2.app-page-title.is-platform {{ $t('WEB_APP.SEO.SEARCH.TITLE_PLATFORM', {term: term, platformTitle: 'Dusk — Color'}) }}
        p.app-page-subtitle.is-platform(v-html="$t('WEB_APP.LANDING_TAGS.PLATFORM_DESCRIPTION', {term: term, count: count, platformTitle: 'dusk'})")
        platform-grid(
          v-bind:icons="icons"
        v-bind:category="category"
        v-bind:platform="'dusk'"
          v-bind:iconColor="'85cbf8'"
          v-bind:iconPlusColor="'c7c7c7'"
          v-bind:term="term"
        )

</template>

<script>
export default {
  name: 'platformDusk',
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
      return this.$store.state.appInfo.iconsCounts.dusk
    }
  }
}
</script>

<style lang="scss" scoped>
  .platform-dusk {
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

