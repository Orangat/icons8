<template lang="pug">
  .platform-material(v-if="icons.length || category")
    .app-page-section
      .container
        h2.app-page-title.is-platform.is-white {{ $t('WEB_APP.SEO.SEARCH.TITLE_PLATFORM_2', {term: term, platformTitle: 'Material Design'}) }}
        p.app-page-subtitle.is-platform.is-white(v-html="$t('WEB_APP.LANDING_TAGS.PLATFORM_DESCRIPTION_MATERIAL', {term: term})")
        platform-grid(
          v-bind:icons="icons"
          v-bind:category="category"
          v-bind:platform="'adroidL'"
          v-bind:iconColor="'ffffff'"
          v-bind:iconPlusColor="'0da7b9'"
          v-bind:iconCustomSize="48"
          v-bind:term="term"
        )

</template>

<script>
export default {
  name: 'platformMaterial',
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
  .platform-material {
    background-color: #00bdd4;
    border-bottom: 1px solid #0da7b9;

    .app-page-title {
      &.is-white {
        color: white;
      }
    }
    .app-page-subtitle {
      &.is-white {
        color: white;
      }
    }
    & /deep/ .icon-wrapper {
      &::after {
        border-color: #0da7b9;
      }
      &:hover .download-icon {
        color: #ffffff;
      }
    }
    & /deep/ .icon-name {
      color: #0e91a0;
    }

    & /deep/ .all-platform-list {
      color: white;

      &::before {
        background-color: white;
      }
      &::after {
        border-right-color: white;
        border-bottom-color: white;
      }
    }

    & /deep/ h6 {
      color: white;
    }
  }
</style>
