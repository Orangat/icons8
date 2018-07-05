<template lang="pug">
  .login-modal
    app-modal(
      ref="modal"
      name="login-modal"
      v-bind:width="464"
      v-bind:content-class="'login-form'"
      v-on:shown="shown"
    )
      template(v-if="mode === 'login'")
        app-icon(
          v-if="iconId"
          v-bind:id="iconId"
          v-bind:custom-size="96"
        )
        .wrap-title
          h3.title(v-html="loginTitleText")
          a.switch-mode(v-on:click="mode='register'") {{ $t('WEB_APP.REGISTER_MODAL.REGISTER', 'Register') }}
        .description(v-if="descriptionText" v-html="descriptionText")
        form.is-big(v-on:submit.prevent="submit('login')")
          div
            .form-item
              input(v-model="email" name="email" placeholder="Email" v-bind:class="emailClasses")

              input(v-model="password" type="password" name="password" placeholder="Password" v-bind:class="passwordClasses")
          .form-controls
            button.button(
              type="submit"
              v-bind:class="{'is-loading': isLoading}"
            ) {{ $t('WEB_APP.REGISTER_MODAL.LOGIN', 'Login') }}


      template(v-if="mode === 'register'")
        app-icon(
          v-if="iconId"
          v-bind:id="iconId"
          v-bind:custom-size="80"
        )
        .wrap-title
          h3.title(v-html="registerTitleText")
          a.switch-mode(v-on:click="mode='login'") {{ $t('WEB_APP.REGISTER_MODAL.LOGIN', 'Login') }}
        .description(v-if="descriptionText" v-html="descriptionText")
        form.is-big(v-on:submit.prevent="submit('register')")
          div
            .form-item
              input(v-model="email" name="email" placeholder="Email" v-bind:class="emailClasses")

              input(v-model="name" name="name" placeholder="Name")

              input(v-model="password" type="password" name="password" placeholder="Password" v-bind:class="passwordClasses")
          .form-controls
            button.button(
              type="submit"
              v-bind:class="{'is-loading': isLoading}"
            ) {{ $t('WEB_APP.REGISTER_MODAL.CREATE_ACCOUNT', 'Create Account') }}
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'loginModal',
    props: {
      registerTitle: String,
      loginTitle: String,
      description: String
    },
    data () {
      return {
        email: '',
        name: '',
        password: '',
        isLoading: false,
        mode: undefined,
        errors: {password: false, email: false},
        registerTitleText: '',
        loginTitleText: '',
        descriptionText: '',
        iconId: undefined
      }
    },
    computed: {
      emailClasses () {
        return {
          'is-invalid': this.errors.email
        }
      },
      passwordClasses () {
        return {
          'is-invalid': this.errors.password
        }
      }
    },
    created () {
      if (!this.$t) {
        this.$t = function (term, fallback) {
          return fallback
        }
      }
    },
    methods: {
      ...mapActions({
        loginUser: 'loginUser',
        registerUser: 'registerUser'
      }),
      shown (params) {
        this.mode = params.mode || 'login'
        this.registerTitleText = params.registerTitle || this.registerTitle || this.$t('WEB_APP.REGISTER_MODAL.REGISTER', 'Register')
        this.loginTitleText = params.loginTitle || this.loginTitle || this.$t('WEB_APP.REGISTER_MODAL.LOGIN', 'Login')
        this.descriptionText = params.description || this.description || ''
        this.iconId = params.iconId
      },
      submit (action) {
        this.isLoading = true
        this[`${action}User`]({
          email: this.email,
          password: this.password
        })
          .then(() => {
            this.isLoading = false
            if (this.$refs.modal.callback) {
              this.$refs.modal.callback()
            }
            this.$modal.hide('login-modal')
          })
          .catch(error => {
            this.isLoading = false
            console.log('login error', error)
            if (error.response && error.response.errors) {
              this.errors.email = error.response.errors.email
              this.errors.password = error.response.errors.password
              this.$error({
                title: this.$t(`${action} failed`),
                text: (this.errors.email || this.errors.password)[0]
              })
            } else {
              this.$error({
                title: this.$t(`${action} failed`),
                text: error.message
              })
            }
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/css/variables';

  .login-modal {

    & /deep/ .login-form {
      padding: 40px 48px 48px;
      text-align: left;
      line-height: 1.5;
      border-radius: 8px;

      .title, .button, .form-item input {
        font-family: 'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'San Francisco', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Segoe UI', 'Fira Sans', Roboto, Oxygen, Ubuntu, 'Droid Sans', 'Arial', sans-serif;
        font-weight: 400;
      }

      .title {
        float: left;
        margin-top: 0;
      }

      .button {
        min-width: 136px;
        border-radius: 6px;
      }

      &>.app-icon {
        margin: 0 auto;
      }
      &>form {
        margin-top: 1.75rem;

        .form-item {
          margin: 0;
          &>input {
            position: relative;
            border: none;
            border-radius: 0;
            background: #F3F3F3;

            &:focus {
              z-index: 1;
            }
            &:first-child {
              border-radius: 8px 8px 0 0;
              margin-bottom: 2px;
            }
            &:last-child {
              border-radius: 0 0 8px 8px;
              margin-top: 2px;
            }
            &:nth-child(2) {
              top: -1px;
            }
            &:nth-child(3) {
              top: -2px;
            }
          }
        }
      }
      .switch-mode {
        display: inline-block;
        font-size: 1.125rem;
        margin-top: 0.5rem;
        margin-left: 1.25rem;
        float: right;
      }
    }
  }
</style>
