<template lang="pug">
  .docs
    h3 Panel
    p Utility class, usually panels used with popups
    pre(v-highlightjs="html")
      code.html

    div(v-html="html")
    pre(v-highlightjs="html2")
      code.html

    div(v-html="html2")
</template>

<script>
  export default {
    name: 'PanelDocs',
    data () {
      return {
        html:
`<div class="panel" style="width: 200px;">Some content</div>`,
        html2:
`<div class="panel" style="width: 200px;">
  <div class="list"">
    <div class="list-item">Popular Icons</div>
    <div class="list-item is-active">New Icons</div>
    <div class="list-item">Animals</div>
    <div class="list-item">Travel</div>
  </div>
</div>`
      }
    }
  }
</script>