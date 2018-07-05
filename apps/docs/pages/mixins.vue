<template lang="pug">
  .docs
    h2 Mixins

    h3 Loader
    p Useful for internal development, just include loading mixins with some params or leave defaults (#aaa, 2px, 3rem)
    pre(v-highlightjs="styles")
      code.scss

    pre(v-highlightjs="html")
      code.html

    <div class="some-element is-loading"></div>
</template>

<script>
  export default {
    name: 'MixinsDocs',
    data () {
      return {
        styles:
`.some-element {
    position: relative;
    @include loading(red, 2px, 3rem);
    width: 5rem;
    height: 5rem;
}`,
        html: `<div class="some-element is-loading"></div>`
      }
    }
  }
</script>

<style lang="scss">
  @import '../../src/assets/css/mixins';
  .some-element {
    position: relative;
    @include loading(red, 2px, 3rem);
    width: 5rem;
    height: 5rem;
  }
</style>