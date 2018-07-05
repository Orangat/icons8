<template lang="pug">
  .docs
    h2 Plugins

    h3 AppModal
    p Pretty modals for everyone!

    pre(v-highlightjs="appModal.html")
      code.html

    pre(v-highlightjs="appModal.js")
      code.javascript

    .button(v-on:click="showModal") Show modal
    app-modal(
      name="modal-example"
      content-class="custom-class"
    )
      p <strong>Yay!</strong> Pretty modal!

    buy-modal-docs

</template>

<script>
  export default {
    name: 'PluginsDocs',
    data () {
      return {
        appModal: {
          html:
`<div class="button" v-on:click="showModal">Show modal</div>
<app-modal
  name="modal-example"
  content-class="custom-class">
  <p><strong>Yay!</strong> Pretty modal!</p>
</app-modal>`,
          js: `showModal () {
  this.$modal.show('modal-example')
}`
        }
      }
    },
    methods: {
      showModal () {
        this.$modal.show('modal-example')
      }
    }
  }
</script>

<style lang="scss">
  .content {
    margin: 0 auto;
    padding: 0 0 30rem;
    width: 960px;

    h3 {
      margin-top: 5rem;
    }
  }
</style>