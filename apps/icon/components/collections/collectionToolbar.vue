<template lang="pug">
  .collection-toolbar
    form(v-on:submit.prevent="updateName")
      input.title(
        ref="input"
        v-bind:value="name"
        v-bind:disabled="!collection.edit"
      )
      app-popup(
        v-bind:show-toggle="false"
        v-bind:position="'bottom-right'"
        v-on:open="sharePopupShown"
      )
        .action(
          v-if="!collection.edit"
          v-bind:class="{'is-wide': collection.share}"
          v-html="collection.share ? icons.shared : icons.share"
        )
        div(slot="content")
          div(v-html="$t('WEB_APP.COLLECTIONS.SHARE')")
          .button.is-tiny(
            v-if="!collection.share"
            v-on:click="share"
            v-bind:class="{'is-loading': isSharing}"
          ) {{ $t('WEB_APP.COLLECTIONS.CREATE_PUBLIC_LINK') }}
          input.share-url(
            v-on:click="copyShareUrl"
            v-if="collection.share"
            v-bind:value="collection.share"
          )
      .action(
        v-if="!collection.edit"
        v-html="icons.edit"
        v-on:click.stop="editName"
      )
      .action(
        v-if="collection.edit"
        v-html="icons.cancel"
        v-on:click="stopEditing"
      )
      .action(
        v-if="collection.edit"
        v-html="icons.save"
        v-on:click="updateName"
      )
</template>

<script>
  import edit from './icons/edit.svg'
  import save from './icons/save.svg'
  import cancel from './icons/cancel.svg'
  import share from './icons/share.svg'
  import shared from './icons/shared.svg'
  import { mapState, mapMutations, mapActions } from 'vuex'

  export default {
    name: 'collectionToolbar',
    props: {
    },
    data () {
      return {
        icons: {
          edit,
          save,
          cancel,
          share,
          shared
        },
        isSharing: false
      }
    },
    computed: {
      ...mapState({
        collection: state => state.collections.collection,
        user: state => state.auth.user
      }),
      name () {
        return this.collection.name
      }
    },
    beforeDestroy () {
      document.documentElement.removeEventListener('click', this.outsideClick, false)
    },
    watch: {
      'collection.edit' (edit) {
        if (edit) {
          setTimeout(() => {
            this.$refs.input.select()
            this.$refs.input.focus()
          }, 0)
        }
      }
    },
    methods: {
      ...mapMutations({
        editCollection: 'COLLECTION_EDITING'
      }),
      ...mapActions(['renameCollection', 'shareCollection']),
      editName () {
        this.startEditing()
      },
      updateName () {
        this.stopEditing()
        this.renameCollection(this.$refs.input.value)
      },
      outsideClick (e) {
        if (!this.$el.contains(e.target)) {
          this.stopEditing()
        }
      },
      startEditing () {
        document.documentElement.addEventListener('click', this.outsideClick, false)
        this.editCollection(true)
        this.$forceUpdate()
      },
      stopEditing () {
        document.documentElement.removeEventListener('click', this.outsideClick, false)
        this.editCollection(false)
        this.$forceUpdate()
      },
      share () {
        this.$ensureLogin()
          .then(() => {
            this.isSharing = true
            this.shareCollection(this.collection)
              .then(response => {
                this.collection.share = true
                this.$analytics.track({event: 'Collection was Shared'})
                this.isSharing = false
              })
              .catch(error => {
                this.isSharing = false
                this.$error({
                  title: this.$t('Error'),
                  text: error.message
                })
              })
          })
          .catch(error => {
            this.$error({
              title: this.$t('Error'),
              text: error.message
            })
          })
      },
      sharePopupShown () {
        this.$analytics.track({event: 'Open Collection Sharing Dialog'})
      },
      copyShareUrl () {
        const input = this.$el.querySelector('.share-url')
        if (input) {
          input.select()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/css/variables';
  @import '../../assets/css/mixins';

  .collection-toolbar {
    position: relative;
    height: $collection-toolbar-height;
    border-bottom: 1px solid $color-grey-light;
    padding: 0 0.75rem;
    transition: opacity 0.4s ease;

    .title {
      width: 14rem;
      height: 48px;
      line-height: 48px;
      padding: 0;
      @include font-title;
      font-size: 24px;
      color: $color-font-dark;
      background: none;
      border: none;
    }

    .action {
      float: right;
      width: 32px;
      height: 32px;
      margin-top: 8px;
      vertical-align: top;
      border-radius: 16px;
      cursor: pointer;
      transition: 0.3s all ease;

      &:hover {
        background: #f4f4f4;
      }

      &.is-wide {
        width: 40px;
        & /deep/ svg {
          width: 34px;
        }
      }

      & > /deep/ svg {
        width: 24px;
        height: 24px;
        margin: 4px;
        fill: #9b9b9b;
      }
    }

    .app-popup {
      float: right;
    }
    & /deep/ .app-popup-content {
      width: 260px;
      padding: 1rem;
      text-align: center;
    }
    .button {
      margin-top: 1rem;
    }
    .share-url {
      width: 100%;
      margin-top: 1rem;
    }
  }
</style>
