<template lang="pug">
  .docs
    h3 List
    p Lists useful for menus, navigations, popups
    pre(v-highlightjs="html")
      code.html

    div(v-html="html")
</template>

<script>
  export default {
    name: 'ListDocs',
    data () {
      return {
        html:
`<div class="list" style="width: 200px;">
  <div class="list-item">Popular Icons</div>
  <div class="list-item is-active">New Icons</div>
  <div class="list-item">Animals</div>
  <div class="list-item">Travel</div>
</div>`
      }
    }
  }
</script>