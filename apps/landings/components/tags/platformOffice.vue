<template lang="pug">
  .platform-office(v-if="icons.length || category")
    .app-page-section
      .container
        h2.app-page-title.is-platform {{ $t('WEB_APP.SEO.SEARCH.TITLE_PLATFORM', {term: term, platformTitle: 'Microsoft Office Icon Pack'}) }}
        p.app-page-subtitle.is-platform(v-html="$t('WEB_APP.LANDING_TAGS.PLATFORM_DESCRIPTION', {term: term, count: count, platformTitle: 'Office'})")
        platform-grid(
          v-bind:icons="icons"
          v-bind:category="category"
          v-bind:platform="'office'"
          v-bind:iconPlusColor="'e4e2e2'"
          v-bind:iconCustomSize="80"
          v-bind:term="term"
        )

</template>

<script>
export default {
  name: 'platformOffice',
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
      return this.$store.state.appInfo.iconsCounts.office
    }
  }
}
</script>

<style lang="scss" scoped>
  .platform-office {
    background-color: #ffffff;
    border-bottom: 1px solid #e4e2e2;

    & /deep/ .icon-wrapper {
      &::after {
        border-color: #e4e2e2;
      }
    }
    & /deep/ .icon-name {
      color: #b2b2b2;
    }
  }
</style>

