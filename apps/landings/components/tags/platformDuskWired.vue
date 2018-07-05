<template lang="pug">
  .platform-duskwired(v-if="icons.length || category")
    .app-page-section.is-background
      .container
        h2.app-page-title.is-platform {{ $t('WEB_APP.SEO.SEARCH.TITLE_PLATFORM', {term: term, platformTitle: 'Wired'}) }}
        p.app-page-subtitle.is-platform(v-html="$t('WEB_APP.LANDING_TAGS.PLATFORM_DESCRIPTION', {term: term, count: count, platformTitle: 'wired'})")
        platform-grid(
          v-bind:icons="icons"
          v-bind:category="category"
          v-bind:platform="'Dusk_Wired'"
          v-bind:iconPlusColor="'abccdb'"
          v-bind:term="term"
        )

</template>

<script>
export default {
  name: 'platformDuskWired',
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
      return this.$store.state.appInfo.iconsCounts.Dusk_Wired
    }
  }
}
</script>

<style lang="scss" scoped>
  .platform-duskwired {
    background-color: #F5F8FA;
    border-bottom: 1px solid #abccdb;

    .app-page-section {
      &.is-background {
        position: relative;
        background: url('../../static/vue-static/landings/tags/backgrounds/bg4.png') no-repeat;
        background-size: contain;
        background-position: right bottom;
      }
    }

    & /deep/ .icon-wrapper {
      background-color: #F5F8FA;
      &::after {
        border-color: #abccdb;
      }
    }
    & /deep/ .icon-name {
      color: #8eb1c1;
    }
  }
</style>
