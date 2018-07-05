import Konva from 'konva'
import resizeApi from './resize'

function importFile (json, container) {
  const stage = Konva.Node.create(json, container)
  loadImages(stage)
  loadListeners(stage)
  return stage
}

function loadImages (stage) {
  stage.find('Image').forEach(image => {
    console.log('image', image)
    const imageObj = new Image()
    imageObj.onload = () => {
      image.image(imageObj)
      stage.draw()
    }
    imageObj.src = image.attrs.url
  })
}

function loadListeners (stage) {
  stage.find('.ImageGroup').forEach(group => {
    console.log('group', group)
    group.find(node => {
      console.log('node', node)
      if (node.attrs.helper) {
        resizeApi.initListeners(group, node)
      }
    })
  })
}

export default {
  importFile
}
