<template lang="pug">
  form(@submit.prevent="submit")
    p(v-if="alert") {{alert.message}}
    input(placeholder="Email" v-model="email")
    input(placeholder="Password" v-model="password" type="password")
    .button(:class="{'is-loading': loading}" :disabled="loading") Log In
</template>

<script>
  export default {
    layout: 'fullscreen',
    data () {
      return {
        email: '',
        password: '',
        alert: null,
        loading: false
      }
    },
    methods: {
      submit () {
      }
    }
  }
</script>
