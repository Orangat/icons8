<template lang="pug">
  .container
    div Oops! We cant find&nbsp;
      strong {{ fontTitle }}
      |  font out there...
    div.redirect Try&nbsp;
      a(href="/fonts") another one
      | .
</template>

<script>
  export default {
    data () {
      return {}
    },
    asyncData ({store}) {
      return new Promise(function (resolve) {
        store.dispatch('updateSEO', store.getters['getSeoData'])
        resolve()
      })
    },
    computed: {
      fontTitle() {
        return this.$route.params.fontTitle
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    text-align: center;
    padding-top: 50px;
    font-size: 24px;
    color: #ccc;

    strong {
      font-size: 28px;
      color: #fff;
    }

    .redirect {
      padding-top: 20px;

      a {
        color: #fff;
      }
    }
  }
</style>