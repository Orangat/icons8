<template lang="pug">
  .icon-recolor
    color-picker(
      v-bind:tooltip="$t('WEB_APP.EFFECT.RECOLOR.ADD')"
      v-model="color"
      v-bind:preview-color="true"
      v-bind:position="position"
      v-on:open="onOpen"
    )
</template>

<script>
  export default {
    name: 'iconRecolor',
    props: {
      position: {
        'default': 'bottom-right'
      }
    },
    data () {
      return {
      }
    },
    computed: {
      color: {
        get () {
          return this.$store.state.icon.color
        },
        set (value) {
          this.$store.dispatch('changeColor', value)
        }
      }
    },
    methods: {
      onOpen () {
        this.$analytics.track({
          event: 'Recolored',
          category: 'Editing'
        })
      }
    }
  }
</script>
