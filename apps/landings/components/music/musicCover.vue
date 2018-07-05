<template lang="pug">
  .music-cover
    .music-cover-img(
      v-bind:class="{'is-loading': !loaded && isMusicPlay, 'is-show': isMusicPlay && loaded}"
    )
      img(v-bind:src="music.cover" v-bind:alt="music.title")
      .button-player(
        v-if="!(isMusicPlay && !loaded)"
        v-on:click="togglePlay"
      )
        .button-player-element(
          v-bind:class="{ 'button-play': !isMusicPlay, 'button-pause': isMusicPlay && loaded }"
        )

      .download(
        v-on:click="download"
      ) Download

    h2.music-title
      //- a(v-bind:href="'/music' + music.url") {{music.title}}
      span {{music.title}}
    p.music-description {{music.description}}
    p.music-description {{music.description2}}
</template>

<script>
  import soundBus from '~/plugins/soundBus'

  export default {
    name: 'musicCover',
    data () {
      return {
        isPlayShow: false,
        isMusicPlay: false,
        player: undefined,
        loaded: false,
        isLoading: false
      }
    },
    props: {
      music: Object
    },
    mounted () {
      soundBus.$once(`soundLoaded:${this.music.src}`, () => {
        this.loaded = true
        if (this.isMusicPlay) {
          this.play()
        }
      })
      soundBus.$on(`soundPlayed`, (src) => {
        if (this.player && src !== this.music.src) {
          this.player.paused = true
          this.isMusicPlay = false
        }
      })
      soundBus.$on(`soundComplete`, (src) => {
        console.log(this.music.prevMusic, src)
        if (src === this.music.prevMusic) {
           console.log('hi')
          this.togglePlay()
        }
      })
    },
    methods: {
      play () {
        if (!this.loaded && !this.isLoading) {
          this.isLoading = true
          window.createjs.Sound.registerSound({
            src: this.music.src,
            id: this.music.src
          })
        }
        this.player = window.createjs.Sound.play(this.music.src)
        this.player.volume = 0.2
        this.player.on('complete', function() {
          console.log('complete!')
          this.togglePlay()
          soundBus.$emit('soundComplete', this.music.src)
        }, this)
        soundBus.$emit('soundPlayed', this.music.src)
      },
      togglePlay () {
        this.isMusicPlay = !this.isMusicPlay
        if (this.isMusicPlay) {
          this.play()
        } else {
          this.player.paused = true
        }
      },
      download () {
        this.$ensureLogin({
          mode: 'register',
          registerTitle: 'Register to Download',
          description: `No money involved. Word of honor!`
        })
          .then(() => {
            window.location = this.music.srcZip
          })
      },
      getPlayer () {
        if (this.player) {
          return this.player
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "~assets/css/music/variables.scss";
  @import "../../../public/assets/css/mixins.scss";
  @import "../../../public/assets/css/variables.scss";

  .music-cover {
    width: 220px;
    line-height: 1.4;

    &:nth-child(4n), &:last-child {
      margin-right: 0;
    }

    .music-cover-img {
      position: relative;
      max-width: 200px;
      min-height: 200px;
      max-height: 200px;
      margin-bottom: 8px;
      background-color: $color-lightgrey;
      cursor: pointer;
      overflow: hidden;

      &:hover, &.is-show {
        img {
          opacity: 0.3;
        }
        .button-player, .download {
          opacity: 1;
        }
      }
      &.is-loading {
        @include loading(#000, 6px, 100px);
        &:after {
          margin-top: 0;
          top: 27px;
        }
      }

      img {
        display: block;
        width: 100%;
        height: auto;
        transition: opacity 0.3s ease;
      }
    }

    .music-title {
      font-size: 20px;
      text-align: left;
      line-height: 1.3;
      margin: 0;
    }

    .music-description {
      font-size: 16px;
      font-weight: lighter;
      margin: 0;
      color: $color-font;
    }

    .button-player {
      opacity: 0;
      position: absolute;
      top: 27px;
      transform: translateX(-50%);
      left: 50%;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: black;
      transition: opacity 0.3s ease;
    }

    .button-play {
      position: absolute;
      top: 50%;
      transform: translate(-50%,-50%);
      left: 55%;
      border-top: 22px solid transparent;
      border-left: 36px solid $color-player-elements;
      border-bottom: 22px solid transparent;
      cursor: pointer;
    }

    .color {
      border-left-color: red;
    }

    .button-pause {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      width: 30px;
      height: 45px;
    }

    .button-pause::before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 10px;
      background-color: $color-player-elements;
      border-radius: 10px;
    }

    .button-pause::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      width: 10px;
      background-color: $color-player-elements;
      border-radius: 10px;
    }

    .download {
      opacity: 0;
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-color: transparent;
      border: 2px solid black;
      border-radius: 3px;
      font-weight: bold;
      padding: 0 10px;
      color: black;
      transition: opacity 0.3s ease;
    }
  }
</style>
