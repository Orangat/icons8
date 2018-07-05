<template lang="pug">
  input.click-to-copy(
    v-on:click="copy"
    v-bind:value="text"
    v-bind:style="{'width': `${text.length * 7}px`}"
    readonly
  )
</template>

<script>
  export default {
    name: 'appPage',
    props: {
      text: {
        type: String,
        'default': ''
      }
    },
    methods: {
      copy () {
        this.$el.select()
      }
    },
    mounted () {
      this.$el.width = 100
    }
  }
</script>

<style lang="scss">
  @import '../../assets/css/variables';

  .click-to-copy {
    display: inline-block;
    padding: 0;
    margin: 0;
    text-align: center;
    font-size: inherit;
    color: inherit;
    border: none;
    border-bottom: 2px solid transparent;
    border-radius: 0;
    background: none;
    cursor: pointer;
    transition: 0.3s all ease;

    &:hover {
      border-bottom: 2px solid $color-font;
    }
  }
</style>
