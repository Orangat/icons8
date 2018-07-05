<template lang="pug">
  .mem-page
    div(v-for="icon in icons") {{ icon.name }}
</template>

<script>
import axios from '../plugins/axios'
import config from '../plugins/config'

export default {
  name: 'searchLandingPage',
  layout: 'app-landing',
  scrollToTop: true,
  asyncData () {
    const url = 'api/iconsets/v4/search'
    const params = {
      term: 'home',
      amount: 50,
      offset: 0,
      platform: 'color',
      language: 'en-US'
    }
    return axios
      .request({
        url,
        baseURL: config.searchUrl,
        method: 'get',
        params
      })
      .then(response => {
        if (response.data.icons) {
          const {icons, success, message} = response.data
          return {icons, success, message}
        } else {
          return {message: 'Server error'}
        }
      })
      .catch(error => {
        console.error('page error', error)
      })
  },
  data () {
    return {
      icons: []
    }
  },
  mounted () {
    setTimeout(() => {
      console.log('reload')
      window.location.reload(true)
    }, 25)
  }
}
</script>
