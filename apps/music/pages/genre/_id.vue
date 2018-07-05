<template lang="pug">
.genre-page
  sticky-header(v-bind:categories="genres"
                v-bind:link="'/genre/'"
                v-bind:categorySubtitle="'Genres'")
  main.main-content
    .container
      tracks-list(v-bind:tracks="tracks"
                  v-bind:title="genreTitle")
      .btn-wrapper
        button.btn(v-show="isShowBtnMore" v-on:click="loadTracks") Show more
</template>

<script>
import axios from 'axios'
import { mapActions, mapMutations } from 'vuex'

export default {
  asyncData({params, store}) {

    return new Promise (function(resolve, reject){
      const promises = []
      console.log('options', params)
      promises.push(axios.get('https://api-music.icons8.com/api/v1/genres'))
      promises.push(axios.get('https://api-music.icons8.com/api/v1/tracks', {
        params: {
          sort_by: 'rating.total',
          genre_pretty_ids: params.id,
          direction: 'desc',
          page: 1,
          per_page: 50,
          fields: 'id, cover(thumb_url), name, user(name, pretty_id), tags(title, pretty_id), duration, bpm, preview(url), waveform(url), pro, content_id'
        }
      }))

      Promise.all(promises).then(responses => {
        const tracks = responses[1].data.tracks
        const genres = responses[0].data

        let genreTitle = 'Genre'
        const filteredGenre = genres.filter(item => params.id === item.pretty_id)[0]
        if (filteredGenre && filteredGenre.title) {
          genreTitle = filteredGenre.title
        }

        let image = ''
        if (tracks[0] && tracks[0].cover != null) {
          image = tracks[0].cover.thumb_url
        }

        store.dispatch('updateSEO', {
          title: `Royalty Free ${genreTitle} Music`,
          description: `Download your ${genreTitle} background music for your videos, movies, and websites. Free both for personal and commercial projects.`,
          image
        })

        let isShowBtnMore = true
        if (tracks && tracks.length < 50) {
            isShowBtnMore = false
        }
        resolve({
          genres,
          tracks: tracks,
          genreId: params.id,
          genreTitle,
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
      genres: [],
      tracks: [],
      genreId: undefined,
      currentPage: 1,
      isShowBtnMore: false,
      genreTitle: 'Genre'
    }
  },
  mounted () {
     this.initPlayerAction(this.tracks)
  },
  methods: {
    ...mapMutations({
      selectTrack: 'CURRENT_TRACK_CHANGED',
      loadPlaylist: 'PLAYLIST_LOADED',
    }),
    ...mapActions({
      initPlayerAction: 'initPlayerAction'
    }),
    loadTracks() {
      this.currentPage += 1
      axios.get('https://api-music.icons8.com/api/v1/tracks', {
        params: {
          sort_by: 'rating.total',
          genre_pretty_ids: this.genreId,
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



