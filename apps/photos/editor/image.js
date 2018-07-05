import Konva from 'konva'
import resize from './resize'
import scale from './scale'

function init (object) {
  const imageObj = new Image()
  imageObj.crossOrigin = 'anonymous'
  imageObj.onload = () => {
    console.log('imageObj', imageObj)
    console.log('width', imageObj.width)
    console.log('height', imageObj.height)

    const coords = this.getObjectCoords(object) || {
      x: 100, y: 100
    }
    const scale = scale(this.stage, imageObj, 0.5)
    object.width = imageObj.width * scale
    object.height = imageObj.height * scale
    console.log('coords', coords)
    object.node = new Konva.Image({
      image: imageObj,
      width: object.width,
      height: object.height,
      x: object.width / 2,
      y: object.height / 2,
      offsetX: object.width / 2,
      offsetY: object.height / 2
    })

    object.group = new Konva.Group({
      x: coords.x,
      y: coords.y - 100,
      offsetX: object.width / 2,
      offsetY: object.height / 2,
      opacity: 0,
      draggable: true
    })
    object.group.add(object.node)
    resize.init(object)

    // add the shape to the layer
    this.layer.add(object.group)
    // add the layer to the stage
    this.stage.add(this.layer)

    object.tween = new Konva.Tween({
      node: object.group,
      y: coords.y,
      opacity: 1,
      easing: Konva.Easings.BounceEaseOut,
      duration: 0.75
    })
    object.tween.play()

    object.group.on('click', () => {
      console.log('click')
      this.activeElement = object
      this.showToolbar = true
    })

    object.group.on('dragstart', () => {
      // this.showToolbar = false
    })

    object.group.on('dragmove', () => {
      if (object === this.activeElement) {
        this.$refs.toolbar.calculatePosition()
      }
    })

    object.group.on('dragend', () => {
      // this.showToolbar = true
    })
  }
  imageObj.src = object.url
}

function initListeners (group) {
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

function showHelpers (image) {
  image.group.find(node => {
    if (node.attrs.helper) {
      node.opacity(1)
    }
  })
}

function hideHelpers (image) {
  image.group.find(node => {
    if (node.attrs.helper) {
      node.opacity(0)
    }
  })
}

export default {
  init,
  showHelpers,
  hideHelpers
}
