<template lang="pug">
.player-page
  //- For desktops
  .player-desktop(v-bind:class="{'player-loading': trackIsLoading}")
    .container
      .player-wrapper
        .player__btn
          svg(v-on:click="prevTrack" class="player__btn--prev" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 50 50")
            g(id="surface1")
              path(style=" " d="M 26 21.851563 L 26 8.152344 L 0.167969 25 L 26 41.847656 L 26 28.148438 L 47 41.84375 L 47 8.152344 Z ")
        .player__btn
          svg(v-if="!isPlaying" v-on:click="onPlay" class="player__btn--play" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 30 30")
            path(d="M 6 3 A 1 1 0 0 0 5 4 A 1 1 0 0 0 5 4.0039062 L 5 15 L 5 25.996094 A 1 1 0 0 0 5 26 A 1 1 0 0 0 6 27 A 1 1 0 0 0 6.5800781 26.8125 L 6.5820312 26.814453 L 26.416016 15.908203 A 1 1 0 0 0 27 15 A 1 1 0 0 0 26.388672 14.078125 L 6.5820312 3.1855469 L 6.5800781 3.1855469 A 1 1 0 0 0 6 3 z")
          svg(v-if="isPlaying" v-on:click="onPause" class="player__btn--pause" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 30 30")
            path(d="M 8 4 C 6.895 4 6 4.895 6 6 L 6 24 C 6 25.105 6.895 26 8 26 L 10 26 C 11.105 26 12 25.105 12 24 L 12 6 C 12 4.895 11.105 4 10 4 L 8 4 z M 20 4 C 18.895 4 18 4.895 18 6 L 18 24 C 18 25.105 18.895 26 20 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 6 C 24 4.895 23.105 4 22 4 L 20 4 z")
        .player__btn
          svg(v-on:click="nextTrack" class="player__btn--next" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 50 50")
            g(id="surface1")
              path(style=" " d="M 49.832031 25 L 24 8.152344 L 24 21.851563 L 3 8.152344 L 3 41.847656 L 24 28.148438 L 24 41.847656 Z ")
        .player__cover
          img(v-bind:src="coverImg")
        .player__track-info
          .player__name {{getName || "Track"}}
          .player__author by 
            nuxt-link(v-bind:to="'/author/' + getAuthorID") {{getAuthor || "Track's author"}}
        .player__duration(v-show="!duration" display="none") 0:00
        .player__duration(v-show="duration" display="none") {{duration | getMin(duration)}}
        .player__wave(v-on:click="relocationProgressLine")
          .waveform-progress__line(v-bind:style="{left: widthWaveformProgress + '%'}")
          .player__waveform(v-bind:class="{'player__waveform--color': getWaveform}")
            .waveform-progress(v-bind:style="{width: widthWaveformProgress + '%'}")
            img(v-if="getWaveform"
                v-bind:src="getWaveform")
        
        .player__duration.player__duration--grey(v-show="!getDuration" display="none") 0:00
        .player__duration.player__duration--grey(v-show="getDuration" display="none") {{getDuration | getMin(getDuration)}}

        .player__volume
          svg(class="icon icon-volume" xmlns="http://www.w3.org/2000/svg")
            path(d="M20.037.65a1 1 0 0 0-.8 1.627 12.907 12.907 0 0 1 .357 15.49.999.999 0 1 0 1.629 1.159A14.92 14.92 0 0 0 24 10.26c0-3.472-1.2-6.67-3.188-9.213a1 1 0 0 0-.775-.397zM11 2.375a.5.5 0 0 0-.883-.322L6.793 6.004H3a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h3.793l3.324 3.951a.5.5 0 0 0 .883-.322V2.375zm3.738 1.22a1 1 0 0 0-.736 1.7A7.157 7.157 0 0 1 16 10.26a7.16 7.16 0 0 1-1.62 4.54.999.999 0 1 0 1.552 1.263A9.178 9.178 0 0 0 18 10.26a9.178 9.178 0 0 0-2.55-6.346 1 1 0 0 0-.712-.318z")
          .player__volume-range
            input(v-on:change="changeVolume" id="size" type="range" min="0.0" max="1.0" step="0.01" v-model="trackVolume")

        .player__download
          a.btn(v-on:click="downloadTrack"
                v-if="!isLoading") Download
          loader(v-if="isLoading")

    info-popup(v-bind:author="getAuthor"
              v-bind:trackId="getTrackId"
              v-bind:authorPrettyId="getAuthorID"
              v-if="showedInfoPopupsById[getTrackId]")


  //- For mobile
  .player-mobile(v-bind:class="{'player-loading': trackIsLoading}")
    .player__wave.player__wave--mobile(v-on:click="relocationProgressLine")
          .waveform-progress__line(v-bind:style="{left: widthWaveformProgress + '%'}")
          .player__waveform(v-bind:class="{'player__waveform--color': getWaveform}")
            .waveform-progress(v-bind:style="{width: widthWaveformProgress + '%'}")
            img(v-if="getWaveform"
                v-bind:src="getWaveform")

    .container

      .player__duration.player__duration--going.player__duration--mobile(v-show="!duration" display="none") 0:00
      .player__duration.player__duration--going.player__duration--mobile(v-show="duration" display="none") {{duration | getMin(duration)}}

      .player__duration.player__duration--all-time.player__duration--mobile.player__duration--grey(v-show="!getDuration" display="none") 0:00
      .player__duration.player__duration--all-time.player__duration--mobile.player__duration--grey(v-show="getDuration" display="none") {{getDuration | getMin(getDuration)}}

      .player-wrapper
        .player__btn.player__btn--mobile
          svg(v-on:click="prevTrack" class="player__btn--prev" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 50 50")
            g(id="surface1")
              path(style=" " d="M 26 21.851563 L 26 8.152344 L 0.167969 25 L 26 41.847656 L 26 28.148438 L 47 41.84375 L 47 8.152344 Z ")
        .player__btn.player__btn--mobile-play
          svg(v-if="!isPlaying" v-on:click="onPlay" class="player__btn--play" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 30 30")
            path(d="M 6 3 A 1 1 0 0 0 5 4 A 1 1 0 0 0 5 4.0039062 L 5 15 L 5 25.996094 A 1 1 0 0 0 5 26 A 1 1 0 0 0 6 27 A 1 1 0 0 0 6.5800781 26.8125 L 6.5820312 26.814453 L 26.416016 15.908203 A 1 1 0 0 0 27 15 A 1 1 0 0 0 26.388672 14.078125 L 6.5820312 3.1855469 L 6.5800781 3.1855469 A 1 1 0 0 0 6 3 z")
          svg(v-if="isPlaying" v-on:click="onPause" class="player__btn--pause" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 30 30")
            path(d="M 8 4 C 6.895 4 6 4.895 6 6 L 6 24 C 6 25.105 6.895 26 8 26 L 10 26 C 11.105 26 12 25.105 12 24 L 12 6 C 12 4.895 11.105 4 10 4 L 8 4 z M 20 4 C 18.895 4 18 4.895 18 6 L 18 24 C 18 25.105 18.895 26 20 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 6 C 24 4.895 23.105 4 22 4 L 20 4 z")
        .player__btn.player__btn--mobile
          svg(v-on:click="nextTrack" class="player__btn--next" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 50 50")
            g(id="surface1")
              path(style=" " d="M 49.832031 25 L 24 8.152344 L 24 21.851563 L 3 8.152344 L 3 41.847656 L 24 28.148438 L 24 41.847656 Z ")
        .player__cover.player__cover--mobile
          img(v-bind:src="coverImg")
        .player__track-info.player__track-info--mobile
          .player__name.player__name--mobile {{getName || "Track"}}
          .player__author.player__author--mobile by 
            nuxt-link(v-bind:to="'/author/' + getAuthorID") {{getAuthor || "Track's author"}}

        .player__download
          a(v-on:click="downloadTrack")
            svg( class="icon-download" xmlns="http://www.w3.org/2000/svg")
              path(d="M18 2H9L7 0H2C.898 0 0 .898 0 2v12c0 1.102.898 2 2 2h16c1.102 0 2-.898 2-2V4c0-1.102-.898-2-2-2zm-8 11L6.5 9h2V5h3v4h2L10 13z")
        
</template>


<script>
import axios from 'axios'
import { Howl, Howler } from "howler";
import { mapState, mapMutations, mapGetters } from "vuex";
import { PLAY, PAUSE, STOP } from "../store";

export default {
  name: "player",
  data() {
    return {
      players: {},
      currentPlayer: undefined,
      lastProgressValue: 0,
      widthWaveformProgress: 0,
      duration: 0,
      trackVolume: 1,
      widthTrackVolume: 0,
      isShowVolume: false,
      isLoading: false
    };
  },
  computed: {
    ...mapState({
      currentTrack: state => state.currentTrack,
      playlist: state => state.playlist,
      currentTrackIndex: state => state.currentTrackIndex,
      statePlaying: state => state.statePlaying,
      showedInfoPopupsById: state => state.showedInfoPopupsById,
      modalOverlay: state => state.isShowModalOverlay,
    }),
    ...mapGetters({
      // проксируем `this.doneCount` в `store.getters.doneTodosCount`
      isPlaying: "isPlaying",
      isStopping: "isStopping",
      isPausing: "isPausing"
    }),
    getName() {
      return this.currentTrack.name;
    },
    getAuthor() {
      if (this.currentTrack && this.currentTrack.user) {
        return this.currentTrack.user.name;
      }
    },
    getAuthorID() {
      if (this.currentTrack && this.currentTrack.user) {
        return this.currentTrack.user.pretty_id;
      }
    },
    getWaveform() {
      if (this.currentTrack && this.currentTrack.waveform) {
        return this.currentTrack.waveform.url;
      }
    },
    getDuration() {
      return this.currentTrack.duration;
    },
    getDownloadLink() {
      if (this.currentTrack && this.currentTrack.preview) {
        return this.currentTrack.preview.url;
      }
      
    },
    getTrackId() {
      if (this.currentTrack && this.currentTrack.id) {
        return this.currentTrack.id;
      }
    },
    trackIsLoading() {
      if (this.currentPlayer && this.currentPlayer.state) {
        return this.currentPlayer.state() === "loading";
      }
    },
    coverImg() {
        if (this.currentTrack && this.currentTrack.cover != null) {
          return this.currentTrack.cover.thumb_url
        } else {
          return false
        }
      }
  },
  filters: {
    getMin: function(seconds) {
        if (!seconds) return ''
        var a = Math.floor(seconds / 60)
        var b = Math.round(seconds % 60)
        if (b<10) {
          b = '0' + b
        }
        var result = a + ':' + b
        return result
      }
  },
  watch: {
    currentTrack() {
     // this.play();
      // this.startPlaying()
    },
    statePlaying(value) {
      // Cледим за statePlaying из store
      if (this.isPlaying) {
        this.play();
      } else if (this.isPausing) {
        this.pause();
      } else if (this.isStopping) {
        this.stop();
      }
    }
  },
  mounted() {
    // console.log("getWaveform", this.currentTrack);
    console.log('getTrackId', this.getTrackId)
  },
  methods: {
    ...mapMutations({
      selectTrack: "CURRENT_TRACK_CHANGED",
      startPlaying: "START_PLAYING",
      stopPlaying: "STOP_PLAYING",
      pausePlaying: "PAUSE_PLAYING",
      showInfoPopup: 'SHOW_INFO_POPUP',
      hideInfoPopup: 'HIDE_INFO_POPUP',
      showModal: 'SHOW_MODAL',
      hideModal: 'HIDE_MODAL'
    }),
    onProgress(callback) {
      this.onProgressInterval = setInterval(() => {
        var seek = this.currentPlayer.seek();
        if (typeof seek == "object") {
          seek = 0;
        }
        if (this.lastProgressValue != seek) {
          this.lastProgressValue = seek;
          if(callback) {
            callback(seek);
          }
        }
      }, 100);
    },
    stopProgressNotifications() {
      if (this.onProgressInterval) {
        clearInterval(this.onProgressInterval);
        this.onProgressInterval = null;
        this.widthWaveformProgress = 0;
        this.duration = 0
      }
    },
    relocationProgressLine(event) {
      const offsetFromLeftSide = event.pageX - event.currentTarget.offsetLeft
      this.widthWaveformProgress = (100 * offsetFromLeftSide) / event.currentTarget.clientWidth
      var setSeconds = (this.getDuration*this.widthWaveformProgress) / 100
      this.currentPlayer.seek(setSeconds);
    },
    onPlay() {
      this.startPlaying();
    },
    onPause() {
      this.pausePlaying();
    },
    onStop() {
      this.stopPlaying();
    },
    play() {
      const self = this;
      const id = this.currentTrack.id;
      if (this.currentPlayer !== this.players[id]) {
        this.stop();
        console.log('stop')
      }
      this.currentPlayer = this.players[id];
      if (this.currentPlayer) {
        if (!this.currentPlayer.playing()) {
          this.currentPlayer.play();
        }
      } else {
        this.currentPlayer = new Howl({
          src: this.currentTrack.preview.url,
          html5: true,
          volume: this.trackVolume,
          onend() {
            self.nextTrack();
            console.log("Finished!");
          }
        });
        this.players[id] = this.currentPlayer; // Кешируем плеер
        this.currentPlayer.play();
      }
      if (!this.onProgressInterval) {
          this.onProgress(time => {
          this.widthWaveformProgress = (100 * time)/this.currentTrack.duration
          // console.log('time', id, time)
          this.duration = time
        })
      }
    },
    pause() {
      if (this.currentPlayer) {
        this.currentPlayer.pause();
      }
    },
    stop() {
      if (this.currentPlayer) {
        this.currentPlayer.stop();
        this.stopProgressNotifications()
      }
    },
    nextTrack() {
      this.stopPlaying();
      if (this.currentTrackIndex === this.playlist.length - 1) {
        this.selectTrack(0);
      } else {
        this.selectTrack(this.currentTrackIndex + 1);
      }
      setTimeout(()=>{
        this.startPlaying()
      })
    },
    prevTrack() {
      this.stopPlaying();
      if (this.currentTrackIndex === 0) {
        this.selectTrack(this.playlist.length - 1);
      } else {
        this.selectTrack(this.currentTrackIndex - 1);
      }
       setTimeout(()=>{
        this.startPlaying()
      })
    },
    changeVolume() {
      console.log('trackVolume', this.trackVolume)
      this.currentPlayer.volume(this.trackVolume);
    },
    downloadTrack() {
      this.isLoading = true
      axios.get('https://api-music.icons8.com/api/v1/tracks/'+ this.getTrackId +'/download-url', {
        withCredentials: true
      }).then((response) => {
        // console.log('response.data',response.data)
        var element = document.createElement('a');
        element.setAttribute('href', response.data.url);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        this.isLoading = false
      })
      
      this.showModal()
      this.showInfoPopup(this.getTrackId)
    }
  }
};
</script>


<style lang="scss">
@import "../assets/css/helpers/variables.scss";
@import "../assets/css/helpers/mixins.scss";

.player-page {
  .player-desktop {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 80px;
    box-shadow: 0px 8px 16px 0 rgba(0, 0, 0, 0.8);
    background-color: white;
    z-index: 10;

    @media (max-width: $responsive-mobile) {
      display: none;
    }
  }

  .player-wrapper{
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    width: 100%;
    height: 80px;
  }

  .player__btn {
    flex-basis: 3%;
    cursor: pointer;
    svg {
      width: 24px;
      height: 24px;
    }

    @media (max-width: $responsive-tablet) {
      flex-basis: 5%;
    }
  }

  .player__cover {
    flex-basis: 65px;
    // height: 65px;
    margin-right: 8px;
    background-color: $color-lightergrey;

    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }

  .player__track-info {
    flex-basis: 15%;
    margin-right: 8px;
  }

  

  .player__name {
    $font-size: 16px;
    $line-height: 1.3;
    $lines-to-show: 2;

    display: block;
    display: -webkit-box;
    max-width: 400px;
    max-height: $font-size*$line-height*$lines-to-show; 
    margin: 0 auto;
    font-size: $font-size;
    line-height: $line-height;
    font-weight: 700;
    -webkit-line-clamp: $lines-to-show;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .player__author {
    $font-size: 12px;
    $line-height: 1.25;
    $lines-to-show: 1;

    display: block;
    display: -webkit-box;
    max-height: $font-size*$line-height*$lines-to-show; 
    margin: 0 auto;
    font-size: $font-size;
    line-height: $line-height;
    font-weight: 500;
    -webkit-line-clamp: $lines-to-show;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    opacity: 0.5;

    a:hover {
      color: $color-link-hover;
    }
  }

  .player__wave {
    position: relative;
    display: flex;
    align-items: flex-end;
    flex-basis: 45%;
    height: 100%;
    margin-right: 8px;
    
  }

  .player__waveform {
    position: relative;
    height: 100%;
    width: 100%;
    background-color: white;
    transition: background-color 0.8s ease-in;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
      z-index: 5;
    }
  }

  .player__waveform--color {
    background-color: #e8e8e8;
  }

  .waveform-progress {
    position: absolute;
    top: 0;
    left: 0;
    // display: flex;
    // flex-direction: row-reverse;
    height: 100%;
    background-color: #FD6B6B;
    z-index: 1;

  }

  .waveform-progress__line {
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 100%;
    background-color: #FD6B6B;
    z-index: 10;

    &::before {
      content: "";
      position: absolute;
      top: -3px;
      left: 50%;
      width: 6px;
      height: 6px;
      background-color: #FD6B6B;
      transform: translateX(-50%) rotate(45deg);
    }
  }

  .player__duration {
    flex-basis: 3%;
    font-size: 12px;
    margin-right: 1%;
  }

  .player__duration--grey {
    color: #e8e8e8;
  }

  .player__volume {
    display: none;
    flex-basis: 10%;
    margin-right: 1%;
    text-align: right;
    align-items: center;

    @media (max-width: $responsive-tablet) {
      display: none;
    }
  }
  .icon-volume {
    width: 24px;
    height: 20px;
    margin-right: 8px;
    fill: $color-body;
    cursor: inherit;
  }

  .player__volume-range {
    width: 88px;
    background-color: white;
    border-radius: 5px;

    input {
      width: 96%;
      cursor: pointer;
    }
  }

  .player__download {
    flex-basis: 16%;
    text-align: right;
    display: flex;
    justify-content: flex-end;


    .btn {
      margin-bottom: 0;
    }
  }

  .player-mobile {
    position: fixed;
    display: none;
    bottom: 0;
    width: 100%;
    height: 68px;
    box-shadow: 0px 8px 16px 0 rgba(0, 0, 0, 0.8);
    background-color: white;
    z-index: 10;
    @media (max-width: $responsive-mobile) {
      display: block;
    }

    .container {
      position: relative;
    }
  }

  .player__wave--mobile {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4%;
  }

  .player__btn--mobile {
    margin-right: 8px;
    svg {
      width: 16px;
      height: 16px;
    }
  }

  .player__btn--mobile-play {
    margin-right: 8px;
  }

  .player__cover--mobile {
    flex-basis: 32px;
    width: 32px;
    height: 32px;
  }

  .player__track-info--mobile {
    flex-basis: 45%;
  }

  .player__name--mobile {
    $font-size: 14px;
    $line-height: 1.3;
    $lines-to-show: 1;

    display: block;
    display: -webkit-box;
    max-width: 400px;
    max-height: $font-size*$line-height*$lines-to-show; 
    margin: 0 auto;
    font-size: $font-size;
    line-height: $line-height;
    font-weight: 700;
    -webkit-line-clamp: $lines-to-show;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

  }

  .player__duration--mobile {
    position: absolute;
    top: 8px;
  }

  .player__duration--going {
    left: 24px;
  }

  .player__duration--all-time {
    right: 24px;
  }

}
</style>



