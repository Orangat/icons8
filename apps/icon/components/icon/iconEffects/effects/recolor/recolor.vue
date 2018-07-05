<template lang="pug">
  .effect-options-recolor
    .effect-options-field
      color-picker(
        v-for="color in params.colorsMap"
        v-bind:key="color.initColor"
        v-model="color.currentColor"
        v-bind:show-color="true"
      )
</template>

<script>
  import effect from './index'

  export default {
    data () {
      return {
        params: effect.params
      }
    },
    watch: {
      'params.colorsMap': {
        handler () {
          effect.activate(this.params)
        },
        deep: true
      }
    }
  }
</script>

<style lang="scss">
  .effect-options-recolor {
    .effect-options-field {
      .color-picker {
        float: none;
        margin-right: 0.25rem;
      }
    }
  }
</style>
