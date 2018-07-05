<template lang="pug">
  v-container
    form
      v-layout(column align-center)
        v-flex.form
          v-text-field(
            v-model='login'
            :error-messages="errors"
            label='Логин'
            required
          )
          v-text-field(
            v-model='password'
            label='Пароль'
            :append-icon="passwordHidden ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (passwordHidden = !passwordHidden)"
            :type="passwordHidden ? 'password' : 'text'"
            required
          )
          v-checkbox(
            v-model='remember'
            value='1'
            label='Запомнить'
            type='checkbox'
          )
        v-flex
          v-progress-circular(v-if="loading" indeterminate color="primary")
          v-btn(v-else color="info" @click='submit') Вход
</template>

<script>
  import api from '../../../api'

  export default {
    layout: 'page',
    data() {
      return {
        login: null,
        password: null,
        remember: 0,
        loading: false,
        passwordHidden: true,
        errors: []
      }
    },
    methods: {
      submit() {
        this.loading = true
        this.errors = []

        const callback = (error, user) => {
          this.loading = false

          if (error) {
            this.errors.push('Неправильный логин или пароль')
          } else {
            this.$store.commit('setUser', user)
            this.$router.push('/fonts/panel');
          }
        }

        api.login(this.login, this.password, this.remember, callback)
      },
    }
  }
</script>

<style lang="scss" scoped>
  .flex.form {
    min-width: 300px;
    max-width: 300px;
    width: 100%;
  }
</style>
