<template lang="pug">
  .app-comments
    .just-comments(
      v-bind:data-locale="locale"
      data-sort="desc"
      data-allowguests="true"
      data-hideattribution="true"
      data-ignorequery="true"
      data-recaptcha="true"
      v-bind:data-pageid="pageId"
      data-apikey="d3f574e9-4a22-4e45-9b8d-2e1b399b3b49"
    )
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'appComments',
    props: {
      id: String
    },
    data () {
      return {
        pageId: undefined
      }
    },
    computed: {
      ...mapState({
        locale: state => {
          return state.lang.locale.split('-').join('_')
        }
      })
    },
    mounted () {
      this.pageId = this.id || location.host + location.pathname
      this.loadComments()
    },
    methods: {
      loadComments () {
        const s = document.createElement('script')
        s.src = '//just-comments.com/w.js'
        s.setAttribute('data-timestamp', +new Date())
        s.onload = () => {
          console.log('comments loaded')
        }
        this.$el.appendChild(s)
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/css/variables";

  .app-comments {
    .Comment__container--1XV1c {
      padding-bottom: 24px;
    }
    .Comment__footer--JEd1_ {
      button {
        text-transform: capitalize;
        border-bottom: none;
      }
    }
    .jcSendCommentButton {
      padding: 0 .75rem;
      background-color: $color-red;
      border-radius: 3px;
      text-shadow: none;
    }
    .jcTextInput {
      margin-bottom: 16px;
    }
    .CommentsForm__notifications--IvcR_{
      margin-top: 0;

      label {
        input {
          vertical-align: 0px;
        }
      }
    }
    .Comments__comments__credit--1ZVGA {
      text-align: left;
      padding-left: 64px;
      margin-top: 24px;
      opacity: 0.3;
    }
  }
</style>
