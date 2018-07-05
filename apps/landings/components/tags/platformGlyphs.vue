<template lang="pug">
  .platform-ios11(v-if="icons.length || category")
    .app-page-section
      .container
        h2.app-page-title.is-platform {{ $t('WEB_APP.SEO.SEARCH.TITLE_PLATFORM_2', {term: term, platformTitle: 'Glyphs'}) }}
        p.app-page-subtitle.is-platform(v-html="$t('WEB_APP.LANDING_TAGS.PLATFORM_DESCRIPTION_GLYPHS', {term: term})")
        platform-grid(
          v-bind:icons="icons"
        v-bind:category="category"
        v-bind:platform="'ios11'"
          v-bind:iconColor="'8b8e8e'"
          v-bind:iconPlusColor="'d4d4d4'"
          v-bind:iconCustomSize="60"
          v-bind:term="term"
        )

</template>

<script>
export default {
  name: 'platformIos11',
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
  .platform-ios11 {
    background-color: #f5f8fa;
    border-bottom: 1px solid #d4d4d4;

    & /deep/ .icon-wrapper{
      &::after {
        border-color: #d4d4d4;
      }
    }
    & /deep/ .icon-name {
      color: #b2b2b2;
    }
  }
</style>
