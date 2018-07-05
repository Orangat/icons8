<template lang="pug">
  .docs
    h2 VUE Components

    h3 AppMenu
    pre(v-highlightjs="html")
      code.html
    app-menu
    br

    pre(v-highlightjs="html2")
      code.html
    app-menu(active="photos" logo-text="World" logo-url="http://google.com")
      div(slot="logo") Hello

    h3 ColorPicker
    pre(v-highlightjs="color.html")
      code.html
    color-picker
</template>

<script>
  export default {
    name: 'VUEDocs',
    data () {
      return {
        html: `<app-menu></app-menu>`,
        html2: `<app-menu active="photos" logo-text="World" logo-url="http://google.com">
  <div slot="logo">Hello</div>
</app-menu>`,
        color: {
          html: `<color-picker></color-picker>`
        }
      }
    }
  }
</script>