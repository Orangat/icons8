<template lang="pug">
  .platform-metro(v-if="icons.length || category")
    .app-page-section
      .container
        h2.app-page-title.is-platform {{ $t('WEB_APP.SEO.SEARCH.TITLE_PLATFORM', {term: term, platformTitle: 'Metro'}) }}
        p.app-page-subtitle.is-platform(v-html="$t('WEB_APP.LANDING_TAGS.PLATFORM_DESCRIPTION_METRO', {term: term})")
        platform-grid(
          v-bind:icons="icons"
          v-bind:category="category"
          v-bind:platform="'win8'"
          v-bind:iconColor="'4193f3'"
          v-bind:iconPlusColor="'c7c7c7'"
          v-bind:iconCustomSize="52"
          v-bind:term="term"
        )


</template>

<script>
export default {
  name: 'platformMetro',
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
  .platform-metro {
    background-color: white;
    border-bottom: 1px solid #c7c7c7;

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

