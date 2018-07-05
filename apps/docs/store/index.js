'use strict'

import Vuex from 'vuex'
import auth from '../../src/store/auth'

const store = new Vuex.Store({
  modules: {
    auth: auth({
      apiUrl: 'http://api.local-icons8.com',
      backendUrl: 'http://local-icons8.com'
    })
  }
})

export default () => store
