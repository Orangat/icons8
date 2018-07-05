<template lang="pug">
.tracks-list
  h1.track-list__title.title {{title}}
  .tracks-list-wrapper(v-for="(track, index) in tracks")
    app-track(v-bind:track="track"
              v-on:play="onPlay(index)"
              v-on:pause="onPause")
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'

export default {
  name: 'tracksList',
  props: {
    tracks: Array,
    title: String,
  },
  computed: {

  },
  methods: {
    ...mapMutations({
      selectTrack: 'CURRENT_TRACK_CHANGED',
      loadPlaylist: 'PLAYLIST_LOADED',
      startPlaying: 'START_PLAYING',
      stopPlaying: 'STOP_PLAYING',
      pausePlaying: 'PAUSE_PLAYING'
    }),
    onPlay (index) {
      this.loadPlaylist(this.tracks) //В эту мутацию мы передаем n-трека(this.tracks)
      this.stopPlaying()
      this.selectTrack(index)
      // this.pausePlaying()
      setTimeout(()=>{
        this.startPlaying()
      }, 100)
      
    },
    onPause () {
      this.pausePlaying()
    }
  }
}
</script>

<style lang="scss">
@import "../assets/css/helpers/variables.scss";

.tracks-list {
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;

  .track-list__title {
    margin-top: 16px;
    margin-bottom: 40px;

    @media (max-width: $responsive-mobile) {
      margin-top: 0;
      margin-bottom: 24px;
    }
  }
  .tracks-list-wrapper {
    width: 100%;
  }
}
</style>

