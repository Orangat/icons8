import axios from './plugins/axios'

export default {
  getMainData (callback, mainFontTitle, pairedFontTitle) {
    axios.defaults.headers.get['Pragma'] = 'no-cache'
    axios
      .post('site/main', { mainFontTitle, pairedFontTitle })
      .then(response => {
        if (callback) {
          callback(response.data)
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  getFontsSites (mainFontId, pairedFontId, callback) {
    axios
      .get(`fonts/get-sites/${mainFontId}/${pairedFontId}`)
      .then(response => {
        if (callback) {
          callback(response.data)
        }
      })
      .catch(error => {
        alert(error)
      })
  },
  getStatsData (callback) {
    axios.get('site/stats-data')
      .then(response => {
        callback(response.data)
      })
      .catch(error => {
        console.log(error.message || error.response.data.message)
      })
  },
  getSitesPage (page, callback) {
    axios.get(`sites${page ? '?page=' + page : ''}`)
      .then(response => {
        callback(response.data)
      })
      .catch(error => {
        alert(error.message || error.response.data.message)
      })
  },
  getFontsPage (page, callback) {
    axios.get(`fonts${page ? '?page=' + page : ''}`)
      .then(response => {
        callback(response.data)
      })
      .catch(error => {
        alert(error.message || error.response.data.message)
      })
  }
}
