<template lang="pug">
  .docs
    h3 Button
    p Simple but useful button. Easy to use, just create element with <code>.button</code> class
    pre(v-highlightjs="html")
      code.html

    div(v-html="html")

    h3 Button Group
    pre(v-highlightjs="group")
      code.html

    div(v-html="group")
</template>

<script>
  export default {
    name: 'ButtonDocs',
    data () {
      return {
        html:
`<div class="button">Hello</div>
<div class="button is-loading">Hello</div>
<div class="button is-small">Small</div>
<div class="button is-tiny">Tiny</div>
<div class="button is-white">White</div>
<div class="button is-white is-loading">Hello</div>
<div class="button is-orange">Orange</div>
<div class="button is-gray">Gray</div>
<div class="button is-disabled">Disabled</div>`,
        group:
`<div class="button-group">
  <div class="button">Hello</div>
  <div class="button is-white">Hello</div>
  <div class="button is-white is-loading">Small</div>
</div>`
      }
    }
  }
</script>