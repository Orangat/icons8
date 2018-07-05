<template lang="pug">
  .download-collection-selector
    download-selector(
      popup-position="center"
      v-bind:icons="collection.icons"
      v-bind:multi-size="false"
    )
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'downloadCollectionSelector',
    computed: {
      ...mapState({
        collection: state => state.collections.collection
      })
    }
  }
</script>
