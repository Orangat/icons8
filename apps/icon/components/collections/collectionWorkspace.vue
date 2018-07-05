<template lang="pug">
  .collection-workspace
    template(v-if="collection.icons && collection.icons.length")
      icon-recolor
      .icons-container
        .icons
          .icon(
            v-for="icon in collection.icons"
            v-bind:key="icon.id"
            v-bind:class="{'is-unavailable': !isIconsAvailable({icon})}"
          )
            app-icon(
              v-bind:style="iconStyles"
              v-bind:icon="icon"
            )
            .paid(v-html="icons.dollar" v-if="!isIconsAvailable({icon})")
            .remove(v-html="icons.remove" v-on:click="tryRemoveIcon(icon)")

          label.icon.is-new
            input.upload-input(type="file" multiple v-on:change="handleUpload")

      download-collection

    template(v-if="!collection.icons || !collection.icons.length")
      .welcome-title {{$t('WEB_APP.COLLECTIONS.NEW_TITLE')}}
      .welcome
        .info
          .info-icon(v-html="icons.colors")
          div(v-html="$t('WEB_APP.COLLECTIONS.EDIT_AND_DOWNLOAD')")
        .info
          .info-icon(v-html="icons.fonts")
          div(v-html="$t('WEB_APP.COLLECTIONS.CREATE_FONTS')")
        .info
          .info-icon(v-html="icons.collections")
          div(v-html="$t('WEB_APP.COLLECTIONS.STORE_COLLECTIONS')")

        label.upload
          div(v-html="$t('WEB_APP.COLLECTIONS.DRAG_DROP_ICONS_OR')")
          .icon.is-new.is-big {{$t('WEB_APP.COLLECTIONS.UPLOAD_SVG')}}
          input.upload-input(type="file" multiple v-on:change="handleUpload")
      img.welcome-image(src="/vue-static/icon/collection-new.png")

    app-modal(
      name="remove-icon-from-collection"
      v-bind:width="292"
      v-bind:content-class="'remove-icon-from-collection-modal'"
    )
      p {{$t('WEB_APP.COLLECTIONS.REMOVE_ICONS')}}
      .button(v-on:click="confirmRemove") {{$t('WEB_APP.COLLECTIONS.DELETE_ACTION')}}
      | &nbsp;&nbsp;&nbsp;&nbsp;
      a(v-on:click="cancelRemove") {{$t('WEB_APP.COLLECTIONS.CANCEL_ACTION')}}
</template>

<script>
  import dollar from '../../../public/assets/svg/dollar.svg'
  import collections from './icons/info/collections.svg'
  import colors from './icons/info/colors.svg'
  import fonts from './icons/info/fonts.svg'
  import remove from './icons/remove.svg'
  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    name: 'collectionWorkspace',
    data () {
      return {
        icons: {
          collections,
          colors,
          fonts,
          dollar,
          remove
        },
        removingIcon: false
      }
    },
    computed: {
      ...mapGetters(['isIconsAvailable']),
      ...mapState({
        collection: state => state.collections.collection
      }),
      iconStyles () {
        return {
          fill: `#${this.$store.state.icon.color}`
        }
      }
    },
    methods : {
      ...mapActions([
        'removeIconFromCollection',
        'uploadIcons',
        'addIconsToCollection'
      ]),
      tryRemoveIcon (icon) {
        this.removingIcon = icon
        this.$modal.show('remove-icon-from-collection')
      },
      confirmRemove () {
        this.removeIconFromCollection(this.removingIcon)
        this.removingCollection = false
        this.$modal.hide('remove-icon-from-collection')
      },
      cancelRemove () {
        this.$modal.hide('remove-icon-from-collection')
      },
      handleUpload (e) {
        if (!e.target.files.length) {
          return
        }
        this.uploadIcons(Array.from(e.target.files))
          .then(icons => {
            this.addIconsToCollection(icons)
          })
          .catch(error => {
            this.$error({
              title: 'Upload failed',
              text: error.message
            })
          })
        this.$analytics.track({
          event: 'Uploaded own SVG',
          category: 'Downloads'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/css/variables';

  .collection-workspace {
    position: absolute;
    top: $collection-toolbar-height;
    bottom: 0;
    width: 100%;
    text-align: center;
    transition: opacity 0.4s ease;

    .icons-container {
      width: 100%;
      padding-top: 1rem;
      max-height: 100%;
      overflow-y: auto;
    }
    .icons {
      width: 100%;
      max-height: 100%;
      padding: 1rem 0 9rem;
    }

    .icon {
      position: relative;
      display: inline-block;
      width: 4.5rem;
      height: 4.5rem;
      margin: 0.125rem;
      border-radius: 5px;
      cursor: pointer;
      vertical-align: top;
      transition: background 0.2s ease;

      &:hover {
        background: #f4f4f4;
        .remove {
          opacity: 1;
        }
      }

      &.is-unavailable {
        &>.app-icon {
          opacity: 0.35;
        }
      }

      &>.app-icon {
        margin: 4px auto 0;
        width: 100%;
      }

      &.is-new {
        position: relative;
        background-color: white;
        border: 1px dashed #d2d2d2;
        padding-top: 3rem;
        font-size: 12px;

        &:hover {
          background: #fafafa;
        }

        &:before {
          content: '';
          position: absolute;
          top: 45%;
          left: 50%;
          margin-left: -10px;
          height: 1px;
          width: 22px;
          border-bottom: 2px solid #d2d2d2;
        }
        &:after {
          content: '';
          position: absolute;
          top: 45%;
          left: 50%;
          margin-top: -10px;
          height: 22px;
          width: 1px;
          border-right: 2px solid #d2d2d2;
        }

        &.is-big {
          width: 5.5rem;
          height: 5.5rem;
          padding-top: 4rem;
        }
      }
    }

    .paid {
      position: absolute;
      top: 0;
      left: 0;
      width: 22px;
      height: 22px;
      transition: all 0.2s ease;
    }

    .remove {
      opacity: 0;
      position: absolute;
      top: 0;
      right: 0;
      width: 20px;
      height: 20px;
      transition: opacity 0.4s ease;

      & > /deep/ svg {
        width: 100%;
        height: 100%;
      }
    }

    .welcome-title {
      font-size: 18px;
      padding: 0.5rem 0 1rem;
    }

    .welcome {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 1rem;
    }

    .welcome-image {
      width: 320px;
    }

    .info {
      text-align: center;
      font-size: 12px;
    }

    .info-icon {
      width: 32px;
      height: 32px;
      margin: 0 auto 0.5rem;

      & > /deep/ svg {
        fill: #d2d2d2;
      }
    }

    .upload {
      width: 100%;
      margin-top: 2.5rem;
      padding-top: 2.5rem;
      line-height: 1.1;
      font-size: 14px;
      border-top: 1px solid $color-grey-light;
    }

    .download-collection {
      position: relative;
      margin-top: -150px;
      width: 100%;
      padding-top: 2rem;
      background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 20%, rgba(255,255,255,1) 100%);
    }

    & /deep/ .remove-icon-from-collection-modal {
      top: 10rem;
      right: 7rem;
      left: auto;
      transform: none;
    }

    .upload-input {
      display: none;
    }

    .icon-recolor {
      position: absolute;
      top: 0.5rem;
      left: 0.75rem;
      z-index: 1;
    }
  }
</style>
