<template lang="pug">
  .icon-tags
    .icon-tags-title(v-if="shortTags.length") {{$t('WEB_APP.VIEW_ICONS.BROWSE_TAG')}}
    a.tag(
      v-for="tag in shortTags"
      v-bind:key="tag"
      v-bind:href="`/icon/set/${tag ? tag.toLowerCase() : ''}`"
    ) {{ tag }}
</template>

<script>
  export default {
    name: 'iconTags',
    props: {
      tags: {
        type: Array
      }
    },
    computed: {
      shortTags () {
        return this.tags ? this.tags.slice(0, 50) : []
      }
    }
  }
</script>

<style lang="scss">
  .icon-tags {
    .icon-tags-title {
      display: inline-block;
      margin-right: 0.5rem;
    }
  }
</style>
