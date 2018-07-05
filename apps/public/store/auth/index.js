'use strict'

import axios from '../../../icon/plugins/axios'
import config from '../../../icon/plugins/config'

const USER_LOGGED_IN = 'USER_LOGGED_IN'
const USER_LOGGED_OUT = 'USER_LOGGED_OUT'
const USER_TOKEN_CHANGED = 'USER_TOKEN_CHANGED'

const state = () => ({
  user: {
    isGuest: true,
    activeLicense: false,
    authToken: false,
    loaded: false,
    licenses: undefined
  },
  token: false
})

const mutations = {
  [USER_LOGGED_IN] (state, user) {
    user.loaded = true
    state.user = user
    if (process.browser && window.Intercom) {
      if (user.isGuest) {
        window.Intercom('boot', {
          app_id: config.intercomAppId,
          created_at: Math.round(new Date().getTime() / 1000)
        })
      } else {
        window.Intercom('update', {
          app_id: config.intercomAppId,
          name: user.name,
          email: user.email,
          created_at: Math.round(new Date().getTime() / 1000)
        })
      }
    }
    if (process.browser && !user.isGuest && window.$crisp) {
      window.$crisp.push('set', 'user:email', [user.email])
      window.$crisp.push('set', 'user:nickname', [user.name])
    }
  },
  [USER_LOGGED_OUT] (state) {
    state.user = {
      isGuest: true,
      activeLicense: false,
      authToken: false,
      loaded: true
    }
    state.token = false
    localStorage.setItem('jwtToken', '')
    if (process.browser && window.Intercom) {
      window.Intercom('shutdown')
    }
  },
  [USER_TOKEN_CHANGED] (state, token) {
    state.user.loaded = true
    state.user.isGuest = !token
    state.token = token
    localStorage.setItem('jwtToken', token)
  }
}

const actions = {
  fillUserInfo ({commit}) {
    return new Promise(function (resolve, reject) {
      if (state.user) {
        resolve()
        return
      }
      axios
        .request({
          url: '/api/service/user-info',
          baseURL: config.apiUrl,
          method: 'get',
          withCredentials: true
        })
        .then(response => {
          commit(USER_LOGGED_IN, response.data.result)
          resolve()
        })
        .catch(reject)
    })
  },
  loginUser ({commit}, user) {
    return loginUser({commit}, {user})
  },
  logoutUser ({commit}) {
    commit(USER_LOGGED_OUT)
    if (!config.jwtLogin) {
      return new Promise(function (resolve, reject) {
        axios
          .request({
            url: config.logoutUrl || '/authAjax/logout',
            baseURL: config.backendUrl,
            method: 'get',
            withCredentials: true
          })
          .then(resolve)
          .catch(reject)
      })
    }
  },
  registerUser ({commit}, user) {
    return loginUser({commit}, {user, isRegister: true})
  }
}

function loginUser ({commit}, {user, isRegister = false}) {
  return new Promise(function (resolve, reject) {
    let options
    if (config.jwtLogin) {
      options = {
        data: {
          email: user.email,
          password: user.password
        }
      }
    } else {
      options = {
        data: {
          'RegisterForm[email]': user.email,
          'RegisterForm[password]': user.password
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Requested-With': 'XMLHttpRequest'
        },
        transformRequest: function (obj) {
          let str = []
          for (let p in obj) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
          }
          return str.join('&')
        }
      }
    }
    let url = config.loginUrl || '/authAjax/login'
    if (isRegister) {
      url = '/authAjax/register'
    }
    axios
      .request({
        url,
        baseURL: config.backendUrl,
        method: 'post',
        withCredentials: true,
        ...options
      })
      .then(response => {
        if (config.jwtLogin) {
          if (response.data.status === 'success') {
            commit(USER_TOKEN_CHANGED, response.data.response.accessToken)
            resolve()
          } else {
            reject({message: 'Response error', response: response.data})
          }
          return
        }
        if (response.data.success && response.data.auth) {
          commit(USER_LOGGED_IN, response.data.auth)
          resolve()
        } else {
          reject({message: 'Response error', response: response.data})
        }
      })
      .catch(reject)
  })
}

const store = () => ({
  state,
  mutations,
  actions
})

export default store
