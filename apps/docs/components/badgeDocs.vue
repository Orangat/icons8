<template lang="pug">
  .docs
    h3 Badge
    p Simple but useful badge. Easy to use, just create element with <code>.badge</code> class
    pre(v-highlightjs="html")
      code.html

    div(v-html="html")
</template>

<script>
  export default {
    name: 'BadgeDocs',
    data () {
      return {
        html:
`SVG Icons <span class="badge">Free</span>
Color Icons <span class="badge is-big">New</span>`
      }
    }
  }
</script>