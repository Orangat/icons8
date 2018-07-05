<template lang="pug">
  .markers-list
    ul.music-list
      li.music-item(v-for="marker in markersList")
        a(href="")
          span.music-count {{marker.time}}
          | {{marker.description}}
</template>

<script>
export default {
  name: 'markersList',
  data () {
    return {
      markersList: [{
        time: '0:52',
        description: 'Bells develop the first culmination'
      }, {
        time: '0:40',
        description: 'Some interesting variations'
      }, {
        time: '1:42',
        description: 'Emotional peak'
      }]
    }
  }
}
</script>

<style lang="scss">
  .markers-list{
    .music-list {
      list-style-type: none;
      padding: 0;
    }
  }
</style>

