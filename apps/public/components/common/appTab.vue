<template lang="pug">
  .app-tabs-content(v-if="isActive")
    slot
</template>

<script>
  export default {
    name: 'appTab',
    props: {
      title: {
        type: String
      },
      active: {
        type: Boolean
      }
    },
    data () {
      return {
        isActive: false
      }
    },
    methods: {
      activate () {
        this.isActive = true
      },
      deactivate () {
        this.isActive = false
      }
    },
    created () {
      this.isActive = this.active
    }
  }
</script>
