'use strict'

const BACKGROUNDS_LOADED = 'BACKGROUNDS_LOADED'
const OBJECTS_LOADED = 'OBJECTS_LOADED'
const MODELS_LOADED = 'MODELS_LOADED'

const BACKGROUND_LOADING = 'BACKGROUND_LOADING'
const OBJECT_LOADING = 'OBJECT_LOADING'
const MODEL_LOADING = 'MODEL_LOADING'

const BACKGROUND_LOADED = 'BACKGROUND_LOADED'
const OBJECT_LOADED = 'OBJECT_LOADED'
const MODEL_LOADED = 'MODEL_LOADED'

const ACTIVE_ELEMENT_SELECTED = 'ACTIVE_ELEMENT_SELECTED'

const state = () => ({
  backgrounds: [],
  models: [],
  objects: [],
  activeElement: undefined
})

const mutations = {
  [BACKGROUNDS_LOADED] (state, backgrounds) {
    state.backgrounds = backgrounds
  },
  [OBJECTS_LOADED] (state, objects) {
    state.objects = objects
  },
  [MODELS_LOADED] (state, models) {
    state.models = models
  },
  [BACKGROUND_LOADING] (state, obj) {
    state.backgrounds.forEach(background => {
      if (background.id === obj.id) {
        background.isLoading = true
      }
    })
  },
  [OBJECT_LOADING] (state, obj) {
    state.objects.forEach(object => {
      if (object.id === obj.id) {
        object.isLoading = true
      }
    })
  },
  [MODEL_LOADING] (state, obj) {
    state.models.forEach(model => {
      if (model.id === obj.id) {
        model.isLoading = true
      }
    })
  },
  [BACKGROUND_LOADED] (state, background) {
    background.isLoading = false
  },
  [OBJECT_LOADED] (state, object) {
    object.isLoading = false
  },
  [MODEL_LOADED] (state, model) {
    model.isLoading = false
  },
  [ACTIVE_ELEMENT_SELECTED] (state, element) {
    state.activeElement = element
  }
}

const actions = {
  setBackgrounds ({commit}, backgrounds) {
    return new Promise(function (resolve) {
      commit(BACKGROUNDS_LOADED, backgrounds)
      resolve()
    })
  },
  setObjects ({commit}, objects) {
    return new Promise(function (resolve) {
      commit(OBJECTS_LOADED, objects)
      resolve()
    })
  },
  setModels ({commit}, models) {
    return new Promise(function (resolve) {
      commit(MODELS_LOADED, models)
      resolve()
    })
  },
  objectLoading ({commit}, object) {
    console.log('action1')
    return new Promise(function (resolve) {
      commit(OBJECT_LOADING, object)
      resolve()
    })
  },
  setActiveElement ({commit}, element) {
    return new Promise(function (resolve) {
      commit(ACTIVE_ELEMENT_SELECTED, element)
      resolve()
    })
  }
}

const store = () => ({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  actions
})

export default store
