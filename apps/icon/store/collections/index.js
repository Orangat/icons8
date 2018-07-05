'use strict'

import server from './serverApi.js'
import storage from './storageApi.js'
import download from './download.js'

const COLLECTIONS_LOADED = 'COLLECTIONS_LOADED'
const COLLECTION_ICONS_SYNCED = 'COLLECTION_ICONS_SYNCED'
const COLLECTION_SELECTED = 'COLLECTION_SELECTED'
const COLLECTION_RENAMED = 'COLLECTION_RENAMED'
const COLLECTION_CREATED = 'COLLECTION_CREATED'
const COLLECTION_UPDATED = 'COLLECTION_UPDATED'
const COLLECTION_MERGED = 'COLLECTION_MERGED'
const COLLECTION_REMOVED = 'COLLECTION_REMOVED'
const COLLECTION_EDITING = 'COLLECTION_EDITING'
const COLLECTION_OPENED = 'COLLECTION_OPENED'
const COLLECTION_CLOSED = 'COLLECTION_CLOSED'

const ICONS_LOADED = 'ICONS_LOADED'
const ICON_ADDED_TO_COLLECTION = 'ICON_ADDED_TO_COLLECTION'
const ICON_REMOVED_FROM_COLLECTION = 'ICON_REMOVED_FROM_COLLECTION'

const state = () => ({
  collections: [],
  collection: {},
  isCollectionOpen: false
})

function api (isGuest) {
  if (isGuest) {
    return storage
  } else {
    return server
  }
}

const mutations = {
  [COLLECTIONS_LOADED] (state, collections) {
    state.collections = collections
  },
  [COLLECTION_ICONS_SYNCED] (state, {icons, data}) {
    data.create.forEach((id, i) => {
      const icon = icons[i]
      icon.iconId = icon.id
      icon.id = id
      const base64 = data.attributes[id].svg
      icon.svg = base64 ? window.atob(base64) : undefined
    })
  },
  [COLLECTION_CREATED] (state, collection) {
    collection.edit = false
    state.collections.push(collection)
  },
  [COLLECTION_UPDATED] (state, collection) {
    state.collections.some((c, i) => {
      if (c.id === collection.id) {
        Object.assign(state.collections[i], collection)
        return true
      }
    })
  },
  [COLLECTION_MERGED] (state, {oldCollection, newCollection}) {
    state.collections.some((c, i) => {
      if (c.id === oldCollection.id) {
        Object.assign(state.collections[i], newCollection)
        return true
      }
    })
  },
  [COLLECTION_REMOVED] (state, collection) {
    let index = -1
    state.collections.some((c, i) => {
      if (c.id === collection.id) {
        index = i
        return true
      }
    })
    if (index >= 0) {
      state.collections.splice(index, 1)
    }
  },
  [COLLECTION_SELECTED] (state, collection) {
    if (state.collection) {
      state.collection.edit = false
    }
    if (collection) {
      collection.icons = collection.icons || []
      state.collection = collection
    }
  },
  [COLLECTION_RENAMED] (state, name) {
    if (state.collection) {
      state.collection.name = name
    }
  },
  [COLLECTION_EDITING] (state, edit) {
    if (state.collection) {
      state.collection.edit = edit
    }
  },
  [COLLECTION_OPENED] (state) {
    state.isCollectionOpen = true
  },
  [COLLECTION_CLOSED] (state) {
    state.isCollectionOpen = false
  },
  [ICONS_LOADED] (state, {collection, icons}) {
    collection.icons = icons
    collection.isLoaded = true
  },
  [ICON_ADDED_TO_COLLECTION] (state, icon) {
    state.collection.icons.push(icon)
  },
  [ICON_REMOVED_FROM_COLLECTION] (state, index) {
    state.collection.icons.splice(index, 1)
  }
}

const actions = {
  loadCollections,
  selectCollection,
  loadCollection,
  renameCollection,
  createCollection,
  removeCollection,
  openCollection,
  closeCollection,

  addIconsToCollection,
  removeIconFromCollection,
  toggleIconInCollection,
  downloadCollection,
  generateFont,
  generateIconSet,
  shareCollection
}

function loadCollections ({commit, state, rootState}) {
  return new Promise(function (resolve, reject) {
    api(rootState.auth.user.isGuest)
      .loadCollections(rootState.auth.user.authToken)
      .then(collections => {
        commit(COLLECTIONS_LOADED, collections)
        return prepareCollections({commit, state, rootState}, collections)
      })
      .then(resolve)
      .catch(error => {
        console.error(error)
        reject(error)
      })
  })
}

function prepareCollections ({commit, state, rootState}, collections) {
  return new Promise(function (resolve, reject) {
    let defaultCollection = false
    collections.forEach(collection => {
      if (collection.default) {
        defaultCollection = collection
      }
    })
    if (!defaultCollection) {
      const newCollection = {
        id: '' + new Date().getTime(),
        name: 'Favorites',
        icons: [],
        'default': true
      }
      commit(COLLECTION_CREATED, newCollection)
      commit(COLLECTION_SELECTED, newCollection)
      api(rootState.auth.user.isGuest)
        .createCollection(newCollection, rootState.auth.user.authToken)
        .then(collection => {
          commit(COLLECTION_UPDATED, collection)
          resolve()
        })
        .catch(error => {
          console.error(error)
          reject(error)
        })
    } else {
      selectCollection({commit, state, rootState}, defaultCollection)
        .then(resolve)
        .catch(reject)
    }
  })
}

function selectCollection ({commit, state, rootState}, collection) {
  return new Promise(function (resolve, reject) {
    commit(COLLECTION_SELECTED, collection)
    if (!collection.isLoaded) {
      loadCollection({commit, state, rootState}, collection)
        .then(resolve)
        .catch(reject)
    } else {
      resolve()
    }
  })
}

function loadCollection ({commit, rootState}, collection) {
  return new Promise(function (resolve, reject) {
    if (!rootState.auth.user.isGuest) {
      api(rootState.auth.user.isGuest)
        .loadIcons(collection, rootState.auth.user.authToken)
        .then(icons => {
          commit(ICONS_LOADED, {collection, icons})
          resolve()
        })
        .catch(reject)
    } else {
      resolve()
    }
  })
}

function renameCollection ({commit, state, rootState}, name) {
  commit(COLLECTION_RENAMED, name)
  api(rootState.auth.user.isGuest)
    .syncCollection(state.collection, rootState.auth.user.authToken)
}

function createCollection ({commit, state, rootState}) {
  const token = rootState.auth.user.authToken
  const newCollection = {
    id: token + '.' + new Date().getTime(),
    name: generateNewName(state.collections),
    icons: []
  }
  commit(COLLECTION_CREATED, newCollection)
  commit(COLLECTION_SELECTED, newCollection)
  commit(COLLECTION_EDITING, true)
  api(rootState.auth.user.isGuest)
    .createCollection(newCollection, token)
    .then(collection => {
      // TODO really strange parameters, need to refactor
      commit(COLLECTION_MERGED, {
        oldCollection: newCollection,
        newCollection: collection
      })
    })
    .catch(console.error)
}

function removeCollection ({commit, state, rootState}, collection) {
  if (state.collection.id === collection.id) {
    if (state.collections.length > 1) {
      commit(COLLECTION_SELECTED, state.collections[0])
    } else {
      commit(COLLECTION_SELECTED, undefined)
    }
  }
  api(rootState.auth.user.isGuest)
    .removeCollection(collection, rootState.auth.user.authToken)
    .then(collection => {
      commit(COLLECTION_REMOVED, collection)
      prepareCollections({commit, state, rootState}, state.collections)
    })
    .catch(console.error)
}

function openCollection ({commit}) {
  commit(COLLECTION_OPENED)
}

function closeCollection ({commit}) {
  commit(COLLECTION_CLOSED)
}

function addIconsToCollection ({commit, state, rootState}, icons) {
  return new Promise(function (resolve, reject) {
    const token = rootState.auth.user.authToken
    const iconObjects = []
    icons.forEach(icon => {
      const iconObject = Object.assign({
        iconId: icon.id,
        collection: state.collection.id
      }, icon)
      commit(ICON_ADDED_TO_COLLECTION, iconObject)
      iconObjects.push(iconObject)
    })
    api(rootState.auth.user.isGuest)
      .syncAddedIcons(state.collection, iconObjects, token)
      .then(response => {
        if (!rootState.auth.user.isGuest) {
          commit(COLLECTION_ICONS_SYNCED, {
            icons: iconObjects,
            data: response
          })
        }
        resolve()
      })
      .catch(reject)
  })
}

function removeIconFromCollection ({commit, state, rootState}, oldIcon) {
  return new Promise(function (resolve, reject) {
    let index = -1
    let iconObject
    state.collection.icons.some((icon, i) => {
      // if select icon from collection
      // then real icon id stored in iconId
      if (icon.collection === oldIcon.collection) {
        if (icon.id === oldIcon.id) {
          index = i
          iconObject = icon
          return true
        }
      // if select icon from iconGrid or anything else
      // then real icon id stored in id
      } else {
        if (icon.iconId === oldIcon.id) {
          index = i
          iconObject = icon
          return true
        }
      }
    })
    if (iconObject) {
      commit(ICON_REMOVED_FROM_COLLECTION, index)
      api(rootState.auth.user.isGuest)
        .syncRemovedIcons([iconObject], rootState.auth.user.authToken)
        .then(resolve)
        .catch(reject)
    }
  })
}

function toggleIconInCollection ({commit, state, rootState}, icon) {
  let exists = false
  state.collection.icons.find(i => {
    if (i.iconId === icon.id && !icon.user_icon_id) {
      exists = true
    }
  })
  if (!exists) {
    return addIconsToCollection({commit, state, rootState}, [icon])
  } else {
    return removeIconFromCollection({commit, state, rootState}, icon)
  }
}

function shareCollection ({rootState, commit}, collection) {
  return new Promise(function (resolve, reject) {
    api(rootState.auth.user.isGuest)
      .shareCollection(collection, rootState.auth.user.authToken)
      .then(updatedCollection => {
        commit(COLLECTION_UPDATED, updatedCollection)
      })
      .catch(reject)
  })
}

function generateNewName (collections) {
  let index = 0
  let name
  let valid = false
  while (!valid) {
    index++
    name = `Collection ${index}`
    let exists = false
    collections.forEach(collection => {
      if (collection.name === name) {
        exists = true
      }
    })
    if (!exists) {
      valid = true
    }
  }
  return name
}

function downloadCollection ({rootState}, {collection, icons, options}) {
  const { name } = collection
  return download.downloadCollection({
    ...options,
    icons,
    name
  })
}
function generateFont ({rootState}, {collection, icons}) {
  return download.generateFont(icons, collection, rootState.auth.user.authToken)
}
function generateIconSet ({rootState}, {collection, icons}) {
  return download.generateIconSet(icons, collection.name, rootState.auth.user.authToken)
}

const store = () => ({
  state,
  mutations,
  actions
})

export default store
