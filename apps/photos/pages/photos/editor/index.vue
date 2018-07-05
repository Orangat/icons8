<template lang="pug">
  .photo-editor
    editor-sidebar(
      v-on:background-changed="selectBackground"
      v-on:object-changed="selectObject"
      v-on:model-changed="selectModel"
    )
    object-sidebar(
      v-bind:element="activeElement"
      v-on:element-changed="selectRelated"
    )
    .workspace
      .container
        editor-toolbar(
          ref="toolbar"
          v-bind:stage="stage"
          v-bind:element="activeElement"
          v-bind:show="showToolbar"
          v-bind:scale="scale"
          v-on:remove="remove"
        )
        #container.transparent-background
      br
      .footer
        .button-group
          .button.editor-button(v-on:click="download") Download
          .button.editor-button(v-on:click="exportFile") Export
          .button.editor-button(v-on:click="importFile") Import
          //.button.is-yellow.is-bold x
</template>

<script>
  import Konva from 'konva'
  import editor from '../../../editor'
  import debounce from 'debounce'
  import resize from '../../../editor/resize'
  import imageApi from '../../../editor/image'
  import download from '../../../editor/download'
  import scaleApi from '../../../editor/scale'

  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'photoEditor',
    data ()  {
      return {
        stage: undefined,
        layer: undefined,
        width: 800,
        height: 450,
        actualWidth: 800,

        background: undefined,
        images: [],
        activeElement: undefined,
        showToolbar: false,

        ready: false,
        container: undefined,
        containerId: 'container',
        scale: 1,
        actualScale: 1,
        toolbarElement: undefined,
        json: {},
      }
    },
    computed: {
      ...mapState({
        backgrounds: state => state.editor.backgrounds,
        objects: state => state.editor.objects,
        models: state => state.editor.models
      })
    },
    watch: {
      backgrounds () {
        if (this.backgrounds.length) {
          this.checkReady()
        }
      },
      objects () {
        if (this.objects.length) {
          this.checkReady()
        }
      },
      models () {
        if (this.models.length) {
          this.checkReady()
        }
      }
    },
    mounted () {
      this.container = this.$el.querySelector('.container')
      this.toolbarElement = this.$el.querySelector('.editor-toolbar')
      document.documentElement.addEventListener('click', this.outsideClick, false)
    },
    beforeDestroy () {
      document.documentElement.removeEventListener('click', this.outsideClick, false)
    },
    methods: {
      ...mapMutations({
        backgroundLoaded: 'BACKGROUND_LOADED',
        objectLoaded: 'OBJECT_LOADED',
        modelLoaded: 'MODEL_LOADED'
      }),
      outsideClick (e) {
        console.log('outsideClick', this.container, e.target)
        if (!this.container.contains(e.target)) {
          this.hideHelpers(true)
        }
      },
      checkReady () {
        if (this.backgrounds.length && this.objects.length && this.models.length && !this.ready) {
          this.ready = true
          this.init()
        }
      },
      init () {
        console.log('init')
        // first we need to create a stage
        this.stage = new Konva.Stage({
          container: this.containerId,   // id of container <div>
          width: this.width,
          height: this.height
        })

        // then create layer
        this.layer = new Konva.Layer()

        // const zoomLevel = 4
        // this.layer.on('mouseenter', () => {
        //   this.layer.scale({
        //     x : zoomLevel,
        //     y : zoomLevel
        //   });
        //   this.layer.draw();
        // });
        //
        // this.layer.on('mousemove', (e) => {
        //   var pos = this.stage.getPointerPosition();
        //   this.layer.x( - (pos.x));
        //   this.layer.y( - (pos.y));
        //   this.layer.draw();
        // });
        //
        // this.layer.on('mouseleave', () => {
        //   this.layer.x(0);
        //   this.layer.y(0);
        //   this.layer.scale({
        //     x : 1,
        //     y : 1
        //   });
        //   this.layer.draw();
        // });

        this.addBackground(this.backgrounds[0])
        this.addImage(this.models[4])
        this.addImage(this.objects[0])

        this.fitStageIntoParentContainer()
        // adapt the stage on any window resize
        window.addEventListener('resize', () => {
          this.fitStageIntoParentContainerDebounce()
        })
        //this.$nextTick(this.fitStageIntoParentContainer)
        // const container = this.$el.querySelector('.container')
        // container.style.display = 'block'
        // this.stage.width(this.width)
        // this.stage.height(this.height)
        // this.stage.draw()
      },
      fitStageIntoParentContainer (scaleStage = false) {
        //const container = this.$el.querySelector('.container')
        //container.style.display = 'block'
        // now we need to fit stage into parent
        console.log('this.container', this.container)
        const containerWidth = this.container.offsetWidth
        console.log('containerWidth', containerWidth)
        // to do this we need to scale the stage
        this.scale = containerWidth / this.width
        this.actualScale = containerWidth / this.stage.actualWidth
        this.stage.actualScale = this.actualScale

        console.log('scale', this.scale)
        console.log('this.width', this.width)
        console.log('this.height', this.height)
        this.stage.width(this.width * this.scale)
        this.stage.height(this.height * this.scale)
        if (scaleStage) {
          this.stage.scale({ x: this.actualScale, y: this.actualScale })
        } else {
          this.stage.actualWidth = this.width * this.scale
          this.stage.actualHeight = this.height * this.scale
        }
        this.stage.draw()
      },
      fitStageIntoParentContainerDebounce: debounce(function () {
        this.fitStageIntoParentContainer(true)
      }, 250),
      addBackground (obj) {
        this.background = {
          url: obj.url
        }
        const imageObj = new Image()
        imageObj.crossOrigin = 'anonymous'
        imageObj.onload = () => {
          console.log('imageObj', imageObj)
          console.log('width', imageObj.width)
          console.log('height', imageObj.height)

          this.backgroundLoaded(obj)

          const scale = scaleApi.coverScale(this.stage, imageObj)
          const width = imageObj.width * scale
          const height = imageObj.height * scale
          console.log('scale', scale)
          console.log('width', width)
          console.log('height', height)
          this.background.node = new Konva.Image({
            x: 0,
            y: 0,
            image: imageObj,
            width,
            height,
            // width: imageObj.width > width ? imageObj.width : width,
            // height: imageObj.height > height ? imageObj.height : height,
            draggable: true,
            url: this.background.url
          });
          this.getBackgroundModelPointCoords()
          this.getBackgroundObjectPointCoords()
          console.log('this.background.node', this.background.node)

          // add the shape to the layer
          this.layer.add(this.background.node)
          this.background.node.moveToBottom()
          // add the layer to the stage
          this.stage.add(this.layer)

          this.background.node.on('click', () => {
            console.log('click')
            this.activeElement = undefined
            this.hideHelpers()
            this.layer.draw()
          })

          this.background.node.on('dragmove', () => {
            const node = this.background.node
            const x = node.x()
            const y = node.y()
            const width = node.width()
            const height = node.height()
            const stageWidth = this.stage.width()
            const stageHeight = this.stage.height()
            if (x > -10 && x < 10) {
              node.x(0)
            }
            if (x + width > stageWidth - 10 && x + width < stageWidth + 10) {
              node.x(stageWidth - width)
            }
            if (y > -10 && y < 10) {
              node.y(0)
            }
            if (y + height > stageHeight - 10 && y + height < stageHeight + 10) {
              node.y(stageHeight - height)
            }
          })
        }
        imageObj.src = this.background.url
      },
      addImage (obj) {
        const image = {
          id: obj.id,
          url: obj.url,
          isModel: obj.isModel,
          isObject: obj.isObject,
        }
        const imageObj = new Image()
        imageObj.crossOrigin = 'anonymous'
        imageObj.onload = () => {
          console.log('imageObj', imageObj)
          console.log('width', imageObj.width)
          console.log('height', imageObj.height)

          if (obj.isModel) {
            this.modelLoaded(obj)
          }
          if (obj.isObject) {
            this.objectLoaded(obj)
          }

          let ratio = 0.5
          console.log('image.width / image.height', imageObj.width / imageObj.height)
          if (image.isModel && imageObj.width / imageObj.height > 1) {
            ratio = 1
          }
          const scale = scaleApi.fitScale(this.stage, imageObj, ratio)
          const width = imageObj.width * scale
          const height = imageObj.height * scale
          console.log('scale', scale)
          console.log('width', width)
          console.log('height', height)
          image.width = width
          image.height = height
          const coords = this.getImageCoords(image) || {
            x: image.isModel ? 0 : this.stage.actualWidth/2, y: this.stage.actualHeight - height
          }
          console.log('coords.x', coords.x)
          console.log('this.stage.width()', this.stage.width())
          console.log('this.stage.height()', this.stage.height())
          image.node = new Konva.Image({
            image: imageObj,
            width,
            height,
            x: coords.x,
            y: coords.y,
            aspectRatio: width / height,
            //offsetX: image.width / 2,
            //offsetY: image.height / 2,
            url: image.url
          });

          image.group = new Konva.Group({
            // width,
            // height,
            // x: coords.x,
            // y: coords.y,
            // offsetX: width / 2,
            // offsetY: height / 2,
            name: 'ImageGroup',
            opacity: 0,
            draggable: true
          });
          console.log('image.group.attrs', image.group.attrs)
          image.group.add(image.node)
          resize.init(image)

          // add the shape to the layer
          this.layer.add(image.group)
          //image.group.rotate(45)
          // add the layer to the stage
          this.stage.add(this.layer)

          image.tween = new Konva.Tween({
            node: image.group,
            //x: coords.x,
            opacity: 1,
            easing: Konva.Easings.EaseOut,
            duration: 0.5
          })
          image.tween.play()

          image.group.on('click', () => {
            console.log('click')
            this.activeElement = image
            this.hideHelpers()
            this.showToolbar = true
            imageApi.showHelpers(image)
            this.layer.draw();
          })

          image.group.on('dragmove', () => {
            if (image === this.activeElement) {
              this.$refs.toolbar.calculatePosition()
            }
            const group = image.group
            const node = image.node
            const x = group.x()
            const y = group.y()
            const x2 = node.x()
            const y2 = node.y()
            const width = node.width()
            const height = node.height()
            const stageWidth = this.stage.width()
            const stageHeight = this.stage.height()
            if (x + x2 > -10 && x + x2 < 10) {
              group.x(0 - x2)
            }
            if (x + x2 + width > stageWidth - 10 && x + x2 + width < stageWidth + 10) {
              group.x(stageWidth - width - x2)
            }
            if (y + y2 > -10 && y + y2 < 10) {
              group.y(0 - y2)
            }
            if (y + y2 + height > stageHeight - 10 && y + y2 + height < stageHeight + 10) {
              group.y(stageHeight - height - y2)
            }
          })
        }
        imageObj.src = image.url
        this.images.push(image)
      },
      hideHelpers (forceRedraw = false) {
        this.images.forEach(image => {
          console.log('hideHelpers image', image)
          imageApi.hideHelpers(image)
        })
        this.showToolbar = false
        if (forceRedraw) {
          this.layer.draw();
        }
      },
      getBackgroundModelPointCoords () {
        const attrs = this.background.node.attrs
        if (!this.background.model) return
        this.background.model.coords = {
          x: attrs.x + attrs.width * this.background.model.point.x,
          y: attrs.y + attrs.height * this.background.model.point.y
        }
      },
      getBackgroundObjectPointCoords () {
        const attrs = this.background.node.attrs
        if (!this.background.object) return
        this.background.object.coords = {
          x: attrs.x + attrs.width * this.background.object.point.x,
          y: attrs.y + attrs.height * this.background.object.point.y
        }
      },
      getImageCoords (image) {
        if (image.isModel) {
          if (!this.background.model) return
          return {
            x: this.background.model.coords.x - image.asset.width * (image.point.x - 0.5),
            y: this.background.model.coords.y - image.asset.height * (image.point.y - 0.5)
          }
        } else {
          if (!this.background.object) return
          return {
            x: this.background.object.coords.x - image.asset.width * (image.point.x - 0.5),
            y: this.background.object.coords.y - image.asset.height * (image.point.y - 0.5)
          }
        }
      },
      selectBackground (item) {
        this.background.node.destroy()
        this.background = item
        this.addBackground(item)
        this.stage.draw()
      },
      selectModel (item) {
        this.addImage(item)
        this.stage.draw()
      },
      selectObject (item) {
        this.addImage(item)
        this.stage.draw()
      },
      selectRelated (element) {
        console.log('selectRelated element', element)
      },
      download () {
        console.log('download')
        download(this.stage.toDataURL({ pixelRatio: 1}), 'collage.png')
      },
      exportFile () {
        const json = editor.exportFile(this.stage)
        this.json = JSON.parse(json)
        console.log('this.json', this.json)
      },
      importFile () {
        this.stage = editor.importFile(this.json, this.containerId)
      },
      remove () {
        this.activeElement.group.destroy()
        this.stage.draw()
        this.showToolbar = false
      }
    }
  }
</script>

<style lang="scss">
  @import '../../../assets/css/mixins';

  $sidebar-width: 274px;

  .photo-editor {
    @include customScrollbar(#3b3b3b, #6b6b6b);

    .workspace {
      position: absolute;
      top: 0;
      left: $sidebar-width;
      right: $sidebar-width;
      bottom: 0;
      padding: 2rem;
      background-color: #262626;
    }

    .container {
      position: relative;
      margin: 0;
      width: 100%;
    }
    #container {
      box-shadow: 0 1px 36px 0 rgba(0,0,0,0.9);
    }
    .footer {
      text-align: center;
    }
    .editor-button {
      padding: 0 16px;
      height: 32px;
      line-height: 30px;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      border-radius: 2px;
      color: #c4c4c4;
      background-color: #000;
      border-color: #000;

      &:hover {
        background-color: #1a1a1a;
        border-color: #1a1a1a;
      }
    }
  }
</style>
