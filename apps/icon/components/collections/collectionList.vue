<template lang="pug">
  .collection-list
    .collections
      .collection.is-favorites(v-if="defaultCollection")
        .preview(v-on:click="activateCollection(defaultCollection)")
          app-icon.icon(
            v-for="icon in getPreviewIcons(defaultCollection.icons)"
            v-bind:key="icon.id"
            v-bind:icon="icon"
            v-bind:custom-size="48"
          )
          img(v-if="!defaultCollection.icons.length" src="/vue-static/icon/collection-favorites.png")
          .title Favorites
            .favorites-icon(v-html="$icons.bookmark")
          .info
            template(v-if="defaultCollection.icons.length") {{defaultCollection.icons.length }} icons
            template(v-if="!defaultCollection.icons.length")
             | Just mark beloved icons to <br> use them later.

      .collection
        .preview.is-create(v-on:click.stop="createCollection")
        .title New Collection
        .info Just drag icons here

      .collection(
        v-for="collection in collections"
        v-if="!collection.default"
        v-bind:class="{'is-active': collection === currentCollection}"
      )
        .preview(v-on:click="activateCollection(collection)")
          app-icon.icon(
            v-for="icon in getPreviewIcons(collection.icons)"
            v-bind:key="icon.id"
            v-bind:icon="icon"
            v-bind:custom-size="32"
          )

          .remove(
            v-html="icons.remove"
            v-on:click.stop="tryRemoveCollection(collection)"
          )
        .title {{ collection.name }}
        .info
          template(v-if="collection.icons.length") {{collection.icons.length }} icons
          template(v-if="!collection.icons.length") Just drag icons here

    app-modal(
      name="remove-collection"
      v-bind:width="292"
      v-bind:content-class="'remove-collection-modal'"
    )
      p {{$t('WEB_APP.COLLECTIONS.DELETE_COLLECTION')}}
      .button(v-on:click="confirmRemove") {{$t('WEB_APP.COLLECTIONS.DELETE_ACTION')}}
</template>

<script>
  import edit from './icons/edit.svg'
  import confirm from './icons/save.svg'
  import remove from './icons/remove.svg'
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'collectionList',
    data () {
      return {
        icons: {
          edit,
          confirm,
          remove
        },
        removingCollection: false
      }
    },
    computed: {
      ...mapState({
        collections: state => state.collections.collections,
        currentCollection: state => state.collections.collection
      }),
      defaultCollection () {
        let defaultCollection = undefined
        this.collections.forEach(collection => {
          if (collection.default) {
            defaultCollection = collection
          }
        })
        return defaultCollection
      }
    },
    methods: {
      ...mapActions([
        'selectCollection',
        'createCollection',
        'removeCollection',
        'openCollection'
      ]),
      getPreviewIcons (icons) {
        return Array.isArray(icons) ? icons.slice(0, 9) : []
      },
      tryRemoveCollection (collection) {
        this.removingCollection = collection
        this.$modal.show('remove-collection')
      },
      confirmRemove () {
        this.removeCollection(this.removingCollection)
        this.removingCollection = false
        this.$modal.hide('remove-collection')
      },
      activateCollection (collection) {
        this.selectCollection(collection).then(() => {
          this.$forceUpdate()
        })
        this.openCollection()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/css/variables';
  .collection-list {
    transition: opacity 0.4s ease;
    padding-top: 64px;

    .collections {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0;
    }

    .collection {
      position: relative;
      margin-bottom: 24px;
      cursor: pointer;

      transition: 0.2s all ease;
      &:hover {
        .preview {
          background-color: #E9F3FF;
        }
        .remove {
          display: block;
        }
      }

      &.is-favorites {
        width: 100%;

        .preview {
          display: block;
          height: 144px;
          padding: 24px 18px;
          width: 100%;
          background-color: #FDF8EB;
          white-space: nowrap;
          overflow: hidden;

          &:after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            width: 48px;
            background: #FDF8EB;
            background: linear-gradient(to right, rgba(253, 248, 235, 0) 0%, rgba(253, 248, 235, 1) 80%);
          }

          &>img {
            width: 162px;
            position: absolute;
            top: 6px;
            right: 6px;
          }
        }
        .icon {
          width: 48px;
          height: 48px;
        }
        .title {
          position: static;
          font-size: 18px;
          line-height: 24px;
          text-align: left;
          margin-top: 0;
        }
        .info {
          color: #888;
          position: static;
          text-align: left;
        }
      }
    }

    .preview {
      position: relative;
      width: 152px;
      height: 152px;
      padding: 16px;
      background-color: #f3f3f3;
      border-radius: 6px;

      &.is-create {
        &:before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          margin-left: -13px;
          height: 1px;
          width: 28px;
          border-bottom: 2px solid #d2d2d2;
        }
        &:after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          margin-top: -13px;
          height: 28px;
          width: 1px;
          border-right: 2px solid #d2d2d2;
        }
      }
    }

    .title {
      margin-top: 8px;
      padding: 0 6px;
      line-height: 16px;
      font-size: 16px;
      color: #555;
      text-align: center;
    }

    .info {
      padding: 0 6px;
      line-height: 16px;
      font-size: 12px;
      color: #aaa;
      text-align: center;
    }

    .remove {
      display: none;
      position: absolute;
      top: -6px;
      right: -6px;
      width: 20px;
      height: 20px;

      & > /deep/ svg {
        width: 100%;
        height: 100%;
      }
    }

    .icon {
      display: inline-block;
      width: 32px;
      height: 32px;
      margin: 4px;
      vertical-align: top;

      &:nth-child(n+10) {
        display: none;
      }

      & > /deep/ svg,
      & > /deep/ img {
        width: 100%;
        height: 100%;
      }
    }

    .favorites-icon {
      display: inline-block;
      position: relative;
      top: 2px;
      width: 14px;
      height: 14px;
      margin-left: 8px;
      & > /deep/ svg {
        width: 100%;
        height: 100%;
      }
    }

    & /deep/ .remove-collection-modal {
      top: 10rem;
      right: 7rem;
      left: auto;
      transform: none;
    }
  }
</style>
