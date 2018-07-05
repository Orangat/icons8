<template lang="pug">
  .editor-sidebar
    h1 Moose Composer
    .title Backgrounds
    .list
      .item.transparent-background(
        v-for="item in backgrounds"
        v-on:click="selectBackground(item)"
        v-bind:class="{'is-active': item === background, 'is-loading': item.isLoading}"
      )
        img(v-bind:src="item.thumb")

    .title Models
    .list
      .item.transparent-background(
        v-for="item in models"
        v-on:click="selectModel(item)"
        v-bind:class="{'is-loading': item.isLoading}"
      )
        img(v-bind:src="item.thumb")

    .title Objects
    .list
      .item.transparent-background(
        v-for="item in objects"
        v-on:click="selectObject(item)"
        v-bind:class="{'is-loading': item.isLoading}"
      )
        img(v-bind:src="item.thumb")
</template>

<script>
  import photosApi from '../api/photos'
  import { mapState, mapActions, mapMutations } from 'vuex'

  export default {
    name: 'editorSidebar',
    data ()  {
      return {
        background: {}
      }
    },
    computed: {
      ...mapState({
        backgrounds: state => state.editor.backgrounds,
        objects: state => state.editor.objects,
        models: state => state.editor.models
      })
    },
    mounted () {
      this.init()
    },
    methods: {
      ...mapMutations({
        backgroundLoading: 'BACKGROUND_LOADING',
        modelLoading: 'MODEL_LOADING'
      }),
      ...mapActions([
        'setBackgrounds',
        'setObjects',
        'setModels',
        'objectLoading'
      ]),
      init () {
        photosApi.loadFirstPhotos()
          /**
           * @param background.asset
           * @param background.url
           * @param background.thumb
           * @param background.thumb1x
           * @param background.modelPoints
           */
          .then(responses => {
            const backgrounds = responses[0].backgrounds
            backgrounds.forEach(background => {
              background.url = background.asset.url
              background.thumb = background.thumb1x.url
              background.isLoading = false
              if (!background.modelPoints.length) {
                background.modelPoints.push({
                  x: 0.67,
                  y: 1
                })
              }
              if (!background.modelPoints.length) {
                background.modelPoints.push({
                  x: 0.33,
                  y: 1
                })
              }
            })
            this.setBackgrounds(backgrounds).then(() => {
              this.background = this.backgrounds[0]
            }).catch((error) => {
              console.log('error', error)
            })

            const objects = responses[1].objects
            objects.forEach(object => {
              object.isObject = true
              object.url = object.asset.url
              object.thumb = object.thumb1x.url
              object.isLoading = false
              if (!object.point) {
                object.point = {}
                object.point.x = 0.5
                object.point.y = 1
              }
            })
            this.setObjects(objects).catch((error) => {
              console.log('error', error)
            })

            const models = responses[2].models
            models.forEach(model => {
              model.isModel = true
              model.url = model.asset.url
              model.thumb = model.thumb1x.url
              model.isLoading = false
              if (!model.point) {
                model.point = {}
                model.point.x = 0.5
                model.point.y = 1
              }
            })
            this.setModels(models).catch((error) => {
              console.log('error', error)
            })
          })
      },
      selectBackground (obj) {
        this.backgroundLoading(obj)
        this.$emit('background-changed', obj)
      },
      selectObject (obj) {
        this.objectLoading(obj)
        this.$emit('object-changed', obj)
      },
      selectModel (obj) {
        this.modelLoading(obj)
        this.$emit('model-changed', obj)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/css/mixins';

  $sidebar-width: 274px;
  $sidebar-color: #3b3b3b;
  .editor-sidebar {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: $sidebar-width;
    color: #c4c4c4;
    background-color: $sidebar-color;
    font-size: 12px;
    font-weight: 500;
    overflow-y: auto;

    h1 {
      text-align: left;
      font-weight: 700;
      font-size: 20px;
      margin-left: 8px;
      color: #c4c4c4;
    }
  }

  .title {
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin: 16px 0 0 8px;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    margin: 3px;
  }

  .item {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    vertical-align: top;
    width: 80px;
    height: 80px;
    margin: 4px;
    border: 1px solid $sidebar-color;
    border-radius: 3px;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s ease;

    &:hover, &.is-active {
      box-shadow: inset 0 0 2px white;
    }
    &.is-loading {
      @include loading(#4a90e2, 3px);
      &:after {
        z-index: 1;
      }
      &:before {
        content: '';
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255,255,255,0.6);
      }
    }

    &>img {
      width: 100%;
      min-height: 100%;
      object-fit: cover;
      transition: 0.3s all ease;
    }
  }
</style>
