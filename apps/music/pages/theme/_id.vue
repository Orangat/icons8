<template lang="pug">
.mood-page
  sticky-header(v-bind:categories="themes"
                v-bind:link="'/theme/'"
                v-bind:categorySubtitle="'Themes'")
  main.main-content
    .container
      tracks-list(v-bind:tracks="tracks"
                  v-bind:title="themeTitle")
      .btn-wrapper
        button.btn(v-show="isShowBtnMore" v-on:click="loadTracks") Show more
</template>

<script>
import axios from 'axios'
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  asyncData({params, store}) {

    return new Promise (function(resolve){
      const promises = []
      promises.push(axios.get('https://api-music.icons8.com/api/v1/themes'))
      promises.push(axios.get('https://api-music.icons8.com/api/v1/tracks', {
        params: {
          sort_by: 'rating.total',
          theme_pretty_ids: params.id,
          direction: 'desc',
          page: 1,
          per_page: 50,
          fields: 'id, cover(thumb_url), name, user(name, pretty_id), tags(title, pretty_id), duration, bpm, preview(url), waveform(url), pro, content_id'
        }
      }))

      Promise.all(promises).then(responses => {
        const themes = responses[0].data
        const tracks = responses[1].data.tracks

        let themeTitle = 'Theme'
        var filteredTheme = themes.filter(item => params.id === item.pretty_id)[0]
        if (filteredTheme && filteredTheme.title) {
          themeTitle = filteredTheme.title
        }

        let image = ''
        if (tracks[0] && tracks[0].cover != null) {
          image = tracks[0].cover.thumb_url
        }

        store.dispatch('updateSEO', {
          title: `Royalty Free ${themeTitle} Music`,
          description: `Download your ${themeTitle} background music for your videos, movies, and websites. Free both for personal and commercial projects.`,
          image
        })


        let isShowBtnMore = true

        if (tracks && tracks.length < 50) {
            isShowBtnMore = false
        }

        resolve({
          themes,
          tracks: tracks,
          themeID: params.id,
          themeTitle,
          isShowBtnMore: isShowBtnMore,
        })
      }).catch(error => {
        console.log('error', error)
        resolve()
      })
    })
  },
  data () {
    return {
      themes: [],
      tracks: [],
      themeID: undefined,
      currentPage: 1,
      themeTitle: 'Theme',
      isShowBtnMore: false
    }
  },
  mounted () {
    this.initPlayerAction(this.tracks)
  },
  methods: {
    ...mapActions({
      initPlayerAction: 'initPlayerAction'
    }),
    ...mapMutations({
      selectTrack: 'CURRENT_TRACK_CHANGED',
      loadPlaylist: 'PLAYLIST_LOADED',
    }),
    loadTracks() {
      this.currentPage += 1
      axios.get('https://api-music.icons8.com/api/v1/tracks', {
        params: {
          sort_by: 'rating.total',
          theme_pretty_ids: this.themeID,
          direction: 'desc',
          page: this.currentPage,
          per_page: 50,
          fields: 'id, cover(thumb_url), name, user(name, pretty_id), tags(title, pretty_id), duration, bpm, preview(url), waveform(url), pro, content_id'
        }
      })
        .then(response => {
          this.tracks = this.tracks.concat(response.data.tracks)
          if (response.data.tracks && response.data.tracks.length<50) {
            this.isShowBtnMore = false
          }
        })
    }
  }
}
</script>



