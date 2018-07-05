<template lang="pug">
.mood-page
  sticky-header(v-bind:categories="moods"
                v-bind:link="'/mood/'"
                v-bind:categorySubtitle="'Moods'")
  main.main-content
    .container
      tracks-list(v-bind:tracks="tracks"
                  v-bind:title="moodTitle")
      .btn-wrapper
        button.btn(v-show="isShowBtnMore" v-on:click="loadTracks") Show more
</template>

<script>
import axios from 'axios'
import { mapActions, mapMutations } from 'vuex'

export default {
  asyncData({params, store}) {

    return new Promise (function(resolve){
      const promises = []
      promises.push(axios.get('https://api-music.icons8.com/api/v1/moods'))
      promises.push(axios.get('https://api-music.icons8.com/api/v1/tracks', {
        params: {
          sort_by: 'rating.total',
          mood_pretty_ids: params.id,
          direction: 'desc',
          page: 1,
          per_page: 50,
          fields: 'id, cover(thumb_url), name, user(name, pretty_id), tags(title, pretty_id), duration, bpm, preview(url), waveform(url), pro, content_id'
        }
      }))

      Promise.all(promises).then(responses => {
        const moods = responses[0].data
        const tracks = responses[1].data.tracks

        let moodTitle = 'Mood'
        const filteredMood = moods.filter(item => params.id === item.pretty_id)[0]
        if (filteredMood && filteredMood.title) {
          moodTitle = filteredMood.title
        }

        let image = ''
        if (tracks[0] && tracks[0].cover != null) {
          image = tracks[0].cover.thumb_url
        }

        store.dispatch('updateSEO', {
          title: `Royalty Free ${moodTitle} Music`,
          description: `Download your ${moodTitle} background music for your videos, movies, and websites. Free both for personal and commercial projects.`,
          image
        })

        let isShowBtnMore = true
        if (tracks && tracks.length < 50) {
            isShowBtnMore = false
        }
        resolve({
          moods,
          tracks: tracks,
          moodId: params.id,
          isShowBtnMore: isShowBtnMore,
          moodTitle
        })
      }).catch(error => {
        console.log('error', error)
        resolve()
      })
    })
  },
  data () {
    return {
      moods: [],
      tracks: [],
      moodId: undefined,
      currentPage: 1,
      isShowBtnMore: false,
      moodTitle: 'Mood'
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
          mood_pretty_ids: this.moodId,
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



