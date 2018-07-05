import Konva from 'konva'

const stroke = '#4a90e2'

function initListeners (group, node) {
  node.on('dragmove', function () {
    const layer = this.getLayer()
    update(this)
    layer.draw()
  })
  node.on('mousedown touchstart', function () {
    group.setDraggable(false)
    const topLeft = group.get('.topLeftControl')[0]
    const topRight = group.get('.topRightControl')[0]
    const bottomRight = group.get('.bottomRightControl')[0]
    const bottomLeft = group.get('.bottomLeftControl')[0]
    topLeft.opacity(0)
    topRight.opacity(0)
    bottomRight.opacity(0)
    bottomLeft.opacity(0)
    // this.moveToTop()
  })
  node.on('dragend', function () {
    const layer = this.getLayer()
    console.log('dragend!')
    resetControls(this)
    group.setDraggable(true)
    layer.draw()
  })

  // add hover styling
  node.on('mouseover', function () {
    const layer = this.getLayer()
    // document.body.style.cursor = 'pointer'
    switch (name) {
      case 'topLeftControl':
        document.body.style.cursor = 'nwse-resize'
        break
      case 'topRightControl':
        document.body.style.cursor = 'nesw-resize'
        break
      case 'bottomRightControl':
        document.body.style.cursor = 'nwse-resize'
        break
      case 'bottomLeftControl':
        document.body.style.cursor = 'nesw-resize'
        break
      case 'top':
        document.body.style.cursor = 'ns-resize'
        break
      case 'right':
        document.body.style.cursor = 'ew-resize'
        break
      case 'bottom':
        document.body.style.cursor = 'ns-resize'
        break
      case 'left':
        document.body.style.cursor = 'ew-resize'
        break
      case 'rotate':
      case 'topLeftRotate':
      case 'topRightRotate':
      case 'bottomRightRotate':
      case 'bottomLeftRotate':
        document.body.style.cursor = 'url(//assets.slid.es/assets/icons/block-rotate-icon-16-5dd6c9d1791c78d970282552bd1cd905091397479c1cb18435499daba4255a6b.svg) 8 8,pointer'
        break
    }
    this.setStrokeWidth(2)
    layer.draw()
  })
  node.on('mouseout', function () {
    const layer = this.getLayer()
    document.body.style.cursor = 'default'
    this.setStrokeWidth(1)
    layer.draw()
  })
}

function update (activeAnchor) {
  const group = activeAnchor.getParent()

  const topLeft = group.get('.topLeft')[0]
  const topRight = group.get('.topRight')[0]
  const bottomRight = group.get('.bottomRight')[0]
  const bottomLeft = group.get('.bottomLeft')[0]
  const topLeftControl = group.get('.topLeftControl')[0]
  const topRightControl = group.get('.topRightControl')[0]
  const bottomRightControl = group.get('.bottomRightControl')[0]
  const bottomLeftControl = group.get('.bottomLeftControl')[0]
  const rect = group.get('.rect')[0]
  const line = group.get('.line')[0]
  const image = group.get('Image')[0]

  const rotate = group.get('.rotate')[0]

  const anchorX = activeAnchor.getX()
  const anchorY = activeAnchor.getY()
  let width = image.width()
  let height = image.height()
  const ratio = width / height

  // update anchor positions
  const name = activeAnchor.getName()
  switch (name) {
    case 'topLeftControl':
      width = topRightControl.getX() - anchorX
      height = bottomLeftControl.getY() - anchorY
      break
    case 'topRightControl':
      width = anchorX - topLeftControl.getX()
      height = bottomRightControl.getY() - anchorY
      break
    case 'bottomRightControl':
      width = anchorX - bottomLeftControl.getX()
      height = anchorY - topRightControl.getY()
      break
    case 'bottomLeftControl':
      width = bottomRightControl.getX() - anchorX
      height = anchorY - topLeftControl.getY()
      break
    case 'rotate':
      const angle = Math.atan(width / height) * 180 / Math.PI
      const step = (topLeft.getX() + width / 2 - anchorX) / (width / 2)
      group.rotate(step * angle)
      break
  }

  if (width && height) {
    const newRatio = width / height
    if (newRatio > ratio) {
      width = Math.round(height * ratio * 10) / 10
    } else {
      height = Math.round(width / ratio * 10) / 10
    }
    rect.width(width)
    rect.height(height)
    image.width(width)
    image.height(height)
    //  image.offsetX(width / 2)
    //  image.offsetY(height / 2)
    //  group.setX(image.getX())
    //  group.setY(image.getY())
    // group.width(width)
    // group.height(height)

    let x
    let y
    switch (name) {
      case 'topLeftControl':
        x = bottomRightControl.getX() - width
        y = bottomRightControl.getY() - height
        rect.setX(x)
        rect.setY(y)
        image.setX(x)
        image.setY(y)
        // group.setX(x)
        // group.setY(y)
        break
      case 'topRightControl':
        y = bottomLeftControl.getY() - height
        rect.setY(y)
        image.setY(y)
        // group.setY(y)
        break
      case 'bottomLeftControl':
        x = topRightControl.getX() - width
        rect.setX(x)
        image.setX(x)
        // group.setX(x)
        break
    }
    x = image.getX()
    y = image.getY()
    // group.offsetX(x + width / 2)
    // group.offsetY(y + height / 2)
    line.points([x + width / 2, y, x + width / 2, y - 20])
    topLeft.position({x, y})
    topRight.position({x: x + width, y})
    bottomRight.position({x: x + width, y: y + height})
    bottomLeft.position({x, y: y + height})
    rotate.position({x: x + width / 2, y: y - 20})
  }
}

function resetControls (activeAnchor) {
  const group = activeAnchor.getParent()
  const image = group.get('Image')[0]
  const topLeft = group.get('.topLeftControl')[0]
  const topRight = group.get('.topRightControl')[0]
  const bottomRight = group.get('.bottomRightControl')[0]
  const bottomLeft = group.get('.bottomLeftControl')[0]

  const x = image.getX()
  const y = image.getY()
  const width = image.width()
  const height = image.height()

  topLeft.position({x, y})
  topRight.position({x: x + width, y})
  bottomRight.position({x: x + width, y: y + height})
  bottomLeft.position({x, y: y + height})
  topLeft.opacity(1)
  topRight.opacity(1)
  bottomRight.opacity(1)
  bottomLeft.opacity(1)
}

function addAnchor (object, x, y, name, radius = 4, fill = '#4a90e2') {
  const anchor = new Konva.Circle({
    x,
    y,
    stroke,
    fill,
    strokeWidth: 1,
    radius,
    name,
    draggable: true,
    dragOnTop: false,
    opacity: 0,
    helper: true
  })
  initListeners(object.group, anchor)
  object.group.add(anchor)
}

function addRect (object, width, height) {
  const rect = new Konva.Rect({
    width,
    height,
    name: 'rect',
    stroke: stroke,
    strokeWidth: 2,
    x: object.node.getX(),
    y: object.node.getY(),
    opacity: 0,
    helper: true
  })
  object.group.add(rect)
}

function addLine (object, width) {
  const line = new Konva.Line({
    points: [
      object.node.getX() + width / 2, object.node.getY(),
      object.node.getX() + width / 2, object.node.getY() - 20
    ],
    name: 'line',
    stroke: stroke,
    strokeWidth: 2,
    opacity: 0,
    helper: true
  })
  object.group.add(line)
}

function init (object) {
  const position = object.node.position()
  const width = position.x + object.node.width()
  const height = position.y + object.node.height()
  addRect(object, object.width, object.height)
  addLine(object, object.width, object.height)

  // const rotateRadius = 10
  // addAnchor(object, position.x, position.y, 'topLeftRotate', rotateRadius)
  // addAnchor(object, width, position.y, 'topRightRotate', rotateRadius)
  // addAnchor(object, width, height, 'bottomRightRotate', rotateRadius)
  // addAnchor(object, position.x, height, 'bottomLeftRotate', rotateRadius)

  addAnchor(object, position.x, position.y, 'topLeft')
  addAnchor(object, width, position.y, 'topRight')
  addAnchor(object, width, height, 'bottomRight')
  addAnchor(object, position.x, height, 'bottomLeft')

  addAnchor(object, position.x + object.node.width() / 2, position.y - 20, 'rotate')

  addAnchor(object, position.x, position.y, 'topLeftControl')
  addAnchor(object, width, position.y, 'topRightControl')
  addAnchor(object, width, height, 'bottomRightControl')
  addAnchor(object, position.x, height, 'bottomLeftControl')
}

export default {
  init,
  initListeners,
  update
}
