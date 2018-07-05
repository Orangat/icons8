<template lang="pug">
  .docs
    h3 Buy Modal
    p Simple modal for selecting buy method

    pre(v-highlightjs="html")
      code.html

    pre(v-highlightjs="js")
      code.javascript

    .button(v-on:click="showModal") Show modal
    buy-modal
</template>

<script>
  export default {
    name: 'PanelDocs',
    data () {
      return {
        html:
          `<div class="button" v-on:click="showModal">Show modal</div>
<buy-modal></buy-modal>`,
        js: `showModal () {
  this.$modal.show('modal-example')
}`
      }
    },
    methods: {
      showModal () {
        this.$modal.show('buy-modal')
      }
    }
  }
</script>