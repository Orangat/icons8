<template lang="pug">
  v-app#inspire.layout__page
    v-container(fluid)
      v-layout(column align-center)
        v-flex.background
          v-layout(column align-center)
            v-flex.white--text.text-xs-center.display-1 ПАНЕЛЬ УПРАВЛЕНИЯ
        v-flex
          v-card
            v-card-text
              nuxt
</template>

<script>
  export default {
    head () {
      return {
        title: 'Fonts Panel',
        link: [
          {
            href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons',
            rel: 'stylesheet'
          }
        ],
        meta: [
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0'
          }
        ]
      }
    },
  }
</script>

<style lang="scss">
  @import '../../../../node_modules/vuetify/dist/vuetify.min.css';

  .layout__page {
    .container {
      padding: 0;
    }

    .flex.display-1 {
      max-width: 500px;
      padding-top: 40px;
    }

    .background {
      background-color: #1565C0;
      height: 250px;
      width: 100%;
    }

    .card {
      margin-top: -100px;
      background-color: #fff;
      max-width: 500px;
    }
  }
</style>
