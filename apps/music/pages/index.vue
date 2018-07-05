<template lang="pug">
.music-page
  app-menu(
    v-bind:show-logo="false"
    v-bind:show-items="false"
    v-bind:show-langs="false"
  )
  header.page-header-wrapper
    .container
      .page-header
        .product-name.product-name--bottom-indent.product-name--mobile--hidden
          svg.logo(xmlns="http://www.w3.org/2000/svg")
            path(d="M4.484 27.406H0V5h15.688v4.484H4.483v4.485h6.72v4.484h-6.72v8.953zm31.172-3.953c0 1.24-.234 2.404-.703 3.492a8.96 8.96 0 0 1-1.922 2.844 9.12 9.12 0 0 1-2.851 1.914 8.735 8.735 0 0 1-3.492.703 8.735 8.735 0 0 1-3.493-.703 9.026 9.026 0 0 1-2.843-1.914 9.026 9.026 0 0 1-1.915-2.844 8.735 8.735 0 0 1-.703-3.492V10h4.47v13.453c0 .615.116 1.193.35 1.735a4.54 4.54 0 0 0 .962 1.421c.406.407.882.727 1.43.961a4.376 4.376 0 0 0 1.741.352c.615 0 1.196-.117 1.743-.352a4.515 4.515 0 0 0 1.43-.96 4.54 4.54 0 0 0 .96-1.422 4.32 4.32 0 0 0 .352-1.735V10h4.484v13.453zm21.719 1.688a11.5 11.5 0 0 1-7.484 2.75c-1.063 0-2.086-.138-3.07-.414a11.479 11.479 0 0 1-2.758-1.172 11.952 11.952 0 0 1-2.344-1.813 11.286 11.286 0 0 1-1.813-2.344c-.5-.859-.888-1.783-1.164-2.773a11.402 11.402 0 0 1-.414-3.078c0-1.063.138-2.083.414-3.063.276-.979.664-1.898 1.164-2.757.5-.86 1.104-1.641 1.813-2.344a11.718 11.718 0 0 1 2.343-1.805 11.67 11.67 0 0 1 2.758-1.164 11.317 11.317 0 0 1 3.07-.414 11.5 11.5 0 0 1 7.484 2.75l-2.343 3.906a7.52 7.52 0 0 0-2.343-1.617 6.854 6.854 0 0 0-2.797-.586 6.82 6.82 0 0 0-2.758.563 7.344 7.344 0 0 0-2.258 1.523 7.18 7.18 0 0 0-1.531 2.25 6.82 6.82 0 0 0-.563 2.758c0 .99.188 1.917.563 2.781a7.25 7.25 0 0 0 1.531 2.266 7.276 7.276 0 0 0 2.258 1.531 6.82 6.82 0 0 0 2.758.563c.562 0 1.109-.068 1.64-.204a7.546 7.546 0 0 0 1.516-.562v-6.375h4.328v8.844zM78.5 13.453c0 1.24-.234 2.404-.703 3.492a8.96 8.96 0 0 1-1.922 2.844 9.12 9.12 0 0 1-2.852 1.914 8.735 8.735 0 0 1-3.492.703 8.735 8.735 0 0 1-3.492-.703 9.026 9.026 0 0 1-2.844-1.914 9.026 9.026 0 0 1-1.914-2.844 8.735 8.735 0 0 1-.703-3.492V0h4.469v13.453c0 .615.117 1.193.351 1.735a4.54 4.54 0 0 0 .961 1.421c.407.407.883.727 1.43.961a4.376 4.376 0 0 0 1.742.352c.615 0 1.196-.117 1.742-.352a4.515 4.515 0 0 0 1.43-.96 4.54 4.54 0 0 0 .961-1.422 4.32 4.32 0 0 0 .352-1.735V0H78.5v13.453zm3.89 13.953h15.36V5H82.39v4.484h10.876v4.485h-7.36v4.484h7.36v4.469H82.39v4.484z" fill-rule="evenodd")
        .header-mobile
          .product-name
            svg.logo(xmlns="http://www.w3.org/2000/svg")
              path(d="M4.484 27.406H0V5h15.688v4.484H4.483v4.485h6.72v4.484h-6.72v8.953zm31.172-3.953c0 1.24-.234 2.404-.703 3.492a8.96 8.96 0 0 1-1.922 2.844 9.12 9.12 0 0 1-2.851 1.914 8.735 8.735 0 0 1-3.492.703 8.735 8.735 0 0 1-3.493-.703 9.026 9.026 0 0 1-2.843-1.914 9.026 9.026 0 0 1-1.915-2.844 8.735 8.735 0 0 1-.703-3.492V10h4.47v13.453c0 .615.116 1.193.35 1.735a4.54 4.54 0 0 0 .962 1.421c.406.407.882.727 1.43.961a4.376 4.376 0 0 0 1.741.352c.615 0 1.196-.117 1.743-.352a4.515 4.515 0 0 0 1.43-.96 4.54 4.54 0 0 0 .96-1.422 4.32 4.32 0 0 0 .352-1.735V10h4.484v13.453zm21.719 1.688a11.5 11.5 0 0 1-7.484 2.75c-1.063 0-2.086-.138-3.07-.414a11.479 11.479 0 0 1-2.758-1.172 11.952 11.952 0 0 1-2.344-1.813 11.286 11.286 0 0 1-1.813-2.344c-.5-.859-.888-1.783-1.164-2.773a11.402 11.402 0 0 1-.414-3.078c0-1.063.138-2.083.414-3.063.276-.979.664-1.898 1.164-2.757.5-.86 1.104-1.641 1.813-2.344a11.718 11.718 0 0 1 2.343-1.805 11.67 11.67 0 0 1 2.758-1.164 11.317 11.317 0 0 1 3.07-.414 11.5 11.5 0 0 1 7.484 2.75l-2.343 3.906a7.52 7.52 0 0 0-2.343-1.617 6.854 6.854 0 0 0-2.797-.586 6.82 6.82 0 0 0-2.758.563 7.344 7.344 0 0 0-2.258 1.523 7.18 7.18 0 0 0-1.531 2.25 6.82 6.82 0 0 0-.563 2.758c0 .99.188 1.917.563 2.781a7.25 7.25 0 0 0 1.531 2.266 7.276 7.276 0 0 0 2.258 1.531 6.82 6.82 0 0 0 2.758.563c.562 0 1.109-.068 1.64-.204a7.546 7.546 0 0 0 1.516-.562v-6.375h4.328v8.844zM78.5 13.453c0 1.24-.234 2.404-.703 3.492a8.96 8.96 0 0 1-1.922 2.844 9.12 9.12 0 0 1-2.852 1.914 8.735 8.735 0 0 1-3.492.703 8.735 8.735 0 0 1-3.492-.703 9.026 9.026 0 0 1-2.844-1.914 9.026 9.026 0 0 1-1.914-2.844 8.735 8.735 0 0 1-.703-3.492V0h4.469v13.453c0 .615.117 1.193.351 1.735a4.54 4.54 0 0 0 .961 1.421c.407.407.883.727 1.43.961a4.376 4.376 0 0 0 1.742.352c.615 0 1.196-.117 1.742-.352a4.515 4.515 0 0 0 1.43-.96 4.54 4.54 0 0 0 .961-1.422 4.32 4.32 0 0 0 .352-1.735V0H78.5v13.453zm3.89 13.953h15.36V5H82.39v4.484h10.876v4.485h-7.36v4.484h7.36v4.469H82.39v4.484z" fill-rule="evenodd")
          search
        h1.title.title--big Free Music
          br
          | for Your Videos
        p.subtitle.subtitle--mobile-hidden.subtitle--bottom-indent Much, much more picky than other marketplaces. Much, much
          br
          | cheaper than Hans Zimmer. In fact, it’s &nbsp;
          a.link.is-white(href="/license") free for a link
        p.subtitle.subtitle--mobile Much, much more picky than other marketplaces. Much, much cheaper than Hans Zimmer. In fact, it’s &nbsp;
          a.link.is-white(href="/license") free for a link
        .play-all(v-on:click="playAll" ref="playAllBtn")
          .play-all__icon
          | Play Tracks
  main.page-content
    .container
      .tabs
        .tabs-header
          .tabs-header__title(v-on:click="isThemes"
                              v-bind:class="{'tabs-header__title--active': isThemesList}") Themes
          .tabs-header__title(v-on:click="isGenres"
                              v-bind:class="{'tabs-header__title--active': isGenresList}") Genres
          .tabs-header__title(v-on:click="isMoods"
                              v-bind:class="{'tabs-header__title--active': isMoodsList}") Moods
        search.search--hidden

      categories(v-show="isThemesList"
                v-bind:categories="themes"
                v-bind:showListCategories="true"
                v-bind:link="'/theme/'"
                v-bind:mainPage="true"
                v-bind:isShowingSearch="false")
      categories(v-show="isGenresList"
                v-bind:categories="genres"
                v-bind:showListCategories="true"
                v-bind:link="'/genre/'"
                v-bind:mainPage="true"
                v-bind:isShowingSearch="false")
      categories(v-show="isMoodsList"
                v-bind:categories="moods"
                v-bind:showListCategories="true"
                v-bind:link="'/mood/'"
                v-bind:mainPage="true"
                v-bind:isShowingSearch="false")
      tracks-list(v-bind:tracks="ratingTracks"
                  v-bind:title="'Action'")
      tracks-list(v-bind:tracks="tracksIndie"
                  v-bind:title="'Indie'")
      tracks-list(v-bind:tracks="tracksClassical"
                  v-bind:title="'Classical'")
      h2.subtitle.subtitle--bottom-indent All music is&nbsp;
        a.link(href="https://icons8.com/license") free for a link
        |  &nbsp;or&nbsp;
        a.link(href="https://icons8.com/paid-license-99") $20/month


</template>

<script>
import axios from 'axios'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  asyncData({store}) {
    return new Promise (function(resolve){
      store.dispatch('updateSEO', {
        title: 'Free Royalty Free Music — Fugue',
        description: 'Download free background music for your videos, movies, and websites. Free both for personal and commercial projects.',
        image: 'https://cdnd.icons8.com/download/images/share/fugue.png'
      })
      const promises = []

      promises.push(axios.get('https://api-music.icons8.com/api/v1/genres'))
      promises.push(axios.get('https://api-music.icons8.com/api/v1/moods'))
      promises.push(axios.get('https://api-music.icons8.com/api/v1/tracks', {
        params: {
          sort_by: 'rating.total',
          direction: 'desc',
          page: 1,
          per_page: 4,
          genre_ids: '5a3958260b7a6a219a2cf604',
          fields: 'id, cover(thumb_url), name, user(name, pretty_id), tags(title, pretty_id), duration, bpm, preview(url), waveform(url), pro, content_id'
        }
      }))
      promises.push(axios.get('https://api-music.icons8.com/api/v1/tracks', {
        params: {
          sort_by: 'rating.total',
          direction: 'desc',
          page: 1,
          per_page: 4,
          genre_ids: '5a3958260b7a6a219a2cf5f9',
          fields: 'id, cover(thumb_url), name, user(name, pretty_id), tags(title, pretty_id), duration, bpm, preview(url), waveform(url), pro, content_id'
        }
      }))
      promises.push(axios.get('https://api-music.icons8.com/api/v1/themes'))
      promises.push(axios.get('https://api-music.icons8.com/api/v1/tracks', {
        params: {
          sort_by: 'rating.total',
          direction: 'desc',
          themes_pretty_id: 'action',
          page: 1,
          per_page: 4,
          fields: 'id, cover(thumb_url), name, user(name, pretty_id), tags(title, pretty_id), duration, bpm, preview(url), waveform(url), rating(sound, melody, curator_score, total), pro, content_id'
        }
      }))

      Promise.all(promises).then(responses => {
        resolve({
          genres: responses[0].data,
          moods: responses[1].data,
          tracksIndie: responses[2].data.tracks,
          tracksClassical: responses[3].data.tracks,
          themes: responses[4].data,
          ratingTracks: responses[5].data.tracks,

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
      moods: [],
      tracksIndie: [],
      tracksClassical: [],
      themes: [],
      ratingTracks: [],
      isThemesList: true,
      isGenresList: false,
      isMoodsList: false,
    }
  },
  computed: {
    ...mapState({
      isPlayerInit: state => state.isPlayerInit
    }),
  },
  mounted () {
    this.initPlayerAction(this.ratingTracks)
  },
  methods: {
    ...mapActions({
      initPlayerAction: 'initPlayerAction' // map `this.add()` to `this.$store.dispatch('increment')`
    }),
    ...mapMutations({
      selectTrack: 'CURRENT_TRACK_CHANGED',
      loadPlaylist: 'PLAYLIST_LOADED',
      startPlaying: 'START_PLAYING',
      initPlayer: 'INIT_PLAYER'
    }),
    playAll() {
      // в сафари кнопка не работает, непонятно почему помогает setTiemout
      setTimeout(()=>{
        this.startPlaying()
      }, 100)
      this.$refs.playAllBtn.classList.add('play-all--disabled')
    },
    isThemes() {
      this.isThemesList = true
      this.isGenresList= false
      this.isMoodsList= false
    },
    isGenres() {
      this.isThemesList = false
      this.isGenresList= true
      this.isMoodsList= false
    },
    isMoods() {
      this.isThemesList = false
      this.isGenresList= false
      this.isMoodsList= true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/helpers/variables";

.music-page {

  .page-header-wrapper {
    background-color: #D3C3B6;
  }

  .page-header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 180px;
    padding-bottom: 180px;
    margin-bottom: 80px;
    background: url('../static/vue-static/music/backgrounds/fugue.png') no-repeat;
    background-size: contain;
    background-position: bottom right;

    @media(max-width: $responsive-tablet) {
      padding-top: 80px;
      padding-bottom: 80px;
      margin-bottom: 40px;
    }

    @media (max-width: $responsive-mobile) {
      padding-top: 24px;
      padding-bottom: 256px;
      margin-bottom: 24px;
    }
  }

  .header-mobile {
    position: relative;
    display: none;
    width: 100%;
    margin-bottom: 24px;
    @media (max-width: $responsive-mobile) {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .play-all {
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 5px;
    background-color: $color-body;
    color: white;
    cursor: pointer;

    &:hover {
      color: $color-link-hover;

      .play-all__icon {
        border-left-color: $color-link-hover;
      }
    }




    @media (max-width: $responsive-mobile) {
      display: none;
    }
  }

  .play-all__icon {
    width: 0;
    height: 0;
    margin-right: 8px;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;

    border-left: 12px solid white;
  }
  .play-all--disabled {
    color: $color-lightergrey;
    opacity: 0.5;
    cursor: default;
    transition: all 0.3s ease-in;
    &:hover {
      color: $color-lightergrey;

      .play-all__icon {
        border-left-color: $color-lightergrey;
      }
    }

  }

  .tabs {
    position: relative;
    display: flex;
    justify-content: space-between;
    height: 56px;

    @media (max-width: $responsive-mobile) {
      height: 48px;
    }
  }
  .tabs-header {
    display: flex;
  }
  .tabs-header__title {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 700;
    line-height: 1.3;
    margin: 0;
    margin-right: 48px;
    color: #7E7E7E;
    cursor: pointer;

    @media (max-width: $responsive-mobile) {
      font-size: 16px;
    }
  }
  .tabs-header__title--active {
    color: black;

    border-bottom: 2px solid black;
  }

  .search--hidden{
    @media(max-width: $responsive-mobile) {
      display: none;
    }
  }
}
</style>


