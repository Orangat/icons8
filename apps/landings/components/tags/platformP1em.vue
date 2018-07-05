<template lang="pug">
  .platform-p1em(v-if="icons.length || category")
    .app-page-section
      .container
        h2.app-page-title.is-platform {{ $t('WEB_APP.LANDING_TAGS.PLATFORM_TITLE_1EM', {term: term}) }}
        p.app-page-subtitle.is-platform(v-html="$t('WEB_APP.LANDING_TAGS.PLATFORM_DESCRIPTION_1EM', {term: term})")
        platform-grid(
          v-bind:icons="icons"
          v-bind:category="category"
          v-bind:platform="'p1em'"
          v-bind:iconColor="'8c8f8f'"
          v-bind:iconPlusColor="'c7c7c7'"
          v-bind:iconCustomSize="32"
          v-bind:term="term"
        )

</template>

<script>
export default {
  name: 'platformP1em',
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
  .platform-p1em {
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
