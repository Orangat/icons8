function fitScale (stage, object, ratio = 1) {
  console.log('stage.getWidth()', stage.getWidth())
  const w1 = stage.actualWidth
  const h1 = stage.actualHeight
  const w2 = object.width
  const h2 = object.height

  let ratioW = w1 / w2
  let ratioH = h1 / h2

  const ratio1 = w1 / h1
  const ratio2 = w2 / h2
  if (ratio1 >= ratio2) {
    return ratioH * ratio
  } else {
    return ratioW * ratio
  }
}

function coverScale (stage, object, ratio = 1) {
  console.log('stage.getWidth()', stage.getWidth())
  const w1 = stage.actualWidth
  const h1 = stage.actualHeight
  const w2 = object.width
  const h2 = object.height

  let ratioW = w1 / w2
  let ratioH = h1 / h2

  if (ratioW > ratioH) {
    return ratioW * ratio
  } else {
    return ratioH * ratio
  }
}

export default {
  fitScale,
  coverScale
}
