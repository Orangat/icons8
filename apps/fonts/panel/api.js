import axios from './plugins/axios'

export default {
  login (login, password, remember, callback) {
    axios.post(`site/login`, {
      login,
      password,
      remember
    })
      .then(response => {
        callback(null, response.data)
      })
      .catch(() => {
        callback(new Error())
      })
  },
  logout (callback) {
    axios.post(`site/logout`)
      .then(response => {
        callback()
      })
      .catch((error) => {
        console.log(error.response.data.message)
      })
  },
  isInProgress (callback) {
    axios.post(`site/progress`)
      .then(response => {
        callback(response)
      })
      .catch((error) => {
        console.log(error.response.data.message)
      })
  },
  collect (yearFrom, monthFrom, yearTo, monthTo, override, callback) {
    axios.get(`site/start/${yearFrom}/${monthFrom}/${yearTo}/${monthTo}${override ? '/1' : ''}`)
      .then(response => {
        callback(response.data)
      })
      .catch((error) => {
        console.log(error.response.data.message)
      })
  },
  getConfig (callback) {
    return axios.get(`site/config`)
      .then(response => {
        callback(response.data)
      })
      .catch(error => {
        console.log(error.response.data.message)
      })
  },
  getExcludedFonts (callback) {
    axios.get(`fonts-excluded`)
      .then(response => {
        callback(response.data)
      })
      .catch(error => {
        console.log(error.response.data.message)
      })
  },
  removeExcludedFont (excludedFont, callback) {
    axios.delete(`fonts-excluded/${excludedFont.id}`)
      .then(() => {
        callback()
      })
      .catch(error => {
        console.log(error.response.data.message)
      })
  },
  saveExcludedFont (excludedFont, callback) {
    let query = null

    if (excludedFont.id) {
      query = axios.put(`fonts-excluded/${excludedFont.id}`, excludedFont)
    } else {
      query = axios.post(`fonts-excluded`, excludedFont)
    }

    query
      .then((response) => {
        callback(null, response.data)
      })
      .catch(error => {
        callback(new Error(error.response.data[0].message))
      })
  },
  getExcludedSites (callback) {
    axios.get(`sites-excluded`)
      .then(response => {
        callback(response.data)
      })
      .catch(error => {
        console.log(error.response.data.message)
      })
  },
  removeExcludedSite (excludedSite, callback) {
    axios.delete(`sites-excluded/${excludedSite.id}`)
      .then(() => {
        callback()
      })
      .catch(error => {
        console.log(error.response)
      })
  },
  saveExcludedSite (excludedSite, callback) {
    let query = null

    if (excludedSite.id) {
      query = axios.put(`sites-excluded/${excludedSite.id}`, excludedSite)
    } else {
      query = axios.post(`sites-excluded`, excludedSite)
    }

    query
      .then((response) => {
        callback(null, response.data)
      })
      .catch(error => {
        callback(new Error(error.response.data[0].message))
      })
  },
  getSites (page, callback) {
    axios.get(`sites${page ? '?page=' + page : ''}`)
      .then(response => {
        callback(response.data, response.headers['x-pagination-page-count'])
      })
      .catch(error => {
        console.log(error.response.data.message)
      })
  },
  getFonts (page, callback) {
    axios.get(`fonts${page ? '?page=' + page : ''}`)
      .then(response => {
        callback(response.data, response.headers['x-pagination-page-count'])
      })
      .catch(error => {
        console.log(error.response.data.message)
      })
  },
  getStats (callback) {
    axios.get(`site/stats`)
      .then(response => {
        if (callback) {
          callback(response.data)
        }
      })
      .catch(error => {
        console.log(error.response.data.message)
      })
  },
  synchronizeExcludedSites (callback) {
    axios.get(`sites/synchronize`)
      .then(() => {
        callback()
      })
      .catch(error => {
        console.log(error.response.data.message)
      })
  },
  synchronizeExcludedFonts (callback) {
    axios.get(`fonts/synchronize`)
      .then(() => {
        callback()
      })
      .catch(error => {
        console.log(error.response.data.message)
      })
  }
}
