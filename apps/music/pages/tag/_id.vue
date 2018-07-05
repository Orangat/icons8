<template lang="pug">
.author-page
  sticky-header(v-bind:categories="genres"
                v-bind:categorySubtitle="'Genres'"
                v-bind:link="'/genre/'")
  main.main-content
    .container
      tracks-list(v-bind:tracks="tracks"
                  v-bind:title="tagTitle")
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
      promises.push(axios.get('https://api-music.icons8.com/api/v1/genres'))
      promises.push(axios.get('https://api-music.icons8.com/api/v1/tracks', {
        params: {
          sort_by: 'rating.total',
          tag_pretty_ids: params.id,
          direction: 'desc',
          page: 1,
          per_page: 50,
          fields: 'id, cover(thumb_url), name, user(name, pretty_id), tags(title, pretty_id), duration, bpm, preview(url), waveform(url), pro, content_id'
        }
      }))
      promises.push(axios.get('https://api-music.icons8.com/api/v1/tags/'))

      Promise.all(promises).then(responses => {
        const tracks = responses[1].data.tracks
        const tags = responses[2].data
        let tagTitle = 'Tag'

        const filteredTag = tags.filter(tag => params.id === tag.pretty_id)[0]
        if (filteredTag) {
          tagTitle = filteredTag.title
        }

        let image = ''
        if (tracks[0] && tracks[0].cover != null) {
          image = tracks[0].cover.thumb_url
        }

        store.dispatch('updateSEO', {
          title: `${tagTitle} Background Music`,
          description: `Download your ${tagTitle} background music for your videos, movies, and websites. Free both for personal and commercial projects.`,
          image
        })

        let isShowBtnMore = true
        if (tracks && tracks.length < 50) {
            isShowBtnMore = false
        }
        resolve({
          genres: responses[0].data,
          tags,
          tracks: tracks,
          tagId: params.id,
          tagTitle,
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
      tags: [],
      tagId: undefined,
      currentPage: 1,
      tagTitle: 'Tag',
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
          tag_pretty_ids: this.tagId,
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



