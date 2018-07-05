<template lang="pug">
  .music-landing-page
    .app-page-section
      h1.app-page-title.is-music Free Music for Explainer Videos
      p.app-page-subtitle.is-music Music written by our team of composers. Use it for free in all your personal and commercial projects, but please just <a class="is-pretty is-blue" href="https://icons8.com/license" target="_blank">link back</a> to our site.
      share-link(v-bind:text="shareText")

    .app-page-section
      .container
        section.music-wrapper
          music-cover(
            v-for="music in musilListWithPrev"
            v-bind:key="music.src"
            v-bind:music="music"
          )
</template>

<script>
  import config from '../../../public/plugins/config'
  export default {
    layout: 'music',
    fetch ({store}) {
      store.dispatch('updateSEO', {
        title: 'Free Music for Explainer Videos',
        description: 'Music written by our team of composers. Use it for free in the personal and commercial projects.',
        image: `${config.staticCdn}/vue-static/landings/music/preview_music.png`
      })
    },
    data () {
      return {
        musicList: [{
          cover: '/vue-static/landings/music/cover-400/drowing_in_the_pool.png',
          bigCover: '/vue-static/landings/music/cover-1000/drowing_in_the_pool.png',
          title: 'Drowning in a Pool',
          description: 'Quirky arpeggio',
          description2: 'Chill out',
          src: 'https://cdnd.icons8.com/download/music/drowning_in_a_pool.mp3',
          srcZip: 'https://cdnd.icons8.com/download/music/drowning_in_a_pool.zip',
          url: '/drowning_in_a_pool'
        }, {
          cover: '/vue-static/landings/music/cover-400/drone_over_central_park.png',
          bigCover: '/vue-static/landings/music/cover-1000/drone_over_central_park.png',
          title: 'Drone Over Central Park',
          description: 'Dreamy synths',
          description2: 'One-to-one walkthrough',
          src: 'https://cdnd.icons8.com/download/music/drone_over_central_park.mp3',
          srcZip: 'https://cdnd.icons8.com/download/music/drone_over_central_park.zip',
          url: '/drone_over_central_park'
        }, {
          cover:'/vue-static/landings/music/cover-400/to_take_courage.png',
          bigCover:'/vue-static/landings/music/cover-1000/to_take_courage.png',
          title: 'To Take Courage',
          description: 'Magical orchestra',
          description2: 'For inspirational stories',
          src: 'https://cdnd.icons8.com/download/music/to_take_courage.mp3',
          srcZip: 'https://cdnd.icons8.com/download/music/to_take_courage.zip',
          url: '/to_take_courage'
        }, {
          cover: '/vue-static/landings/music/cover-400/almost_sober.png',
          bigCover: '/vue-static/landings/music/cover-1000/almost_sober.png',
          title: 'Almost Sober',
          description: 'Old-school groove',
          description2: 'Casual presentation',
          src: 'https://cdnd.icons8.com/download/music/almost_sober.mp3',
          srcZip: 'https://cdnd.icons8.com/download/music/almost_sober.zip',
          url: '/almost_sober'
        }, {
          cover: '/vue-static/landings/music/cover-400/trip_to_the_east.png',
          bigCover: '/vue-static/landings/music/cover-1000/trip_to_the_east.png',
          title: 'Trip to the East',
          description: 'Melodic percussion',
          description2: 'Almost a dance',
          src: 'https://cdnd.icons8.com/download/music/trip_to_the_east.mp3',
          srcZip: 'https://cdnd.icons8.com/download/music/trip_to_the_east.zip',
          url: '/trip_to_the_east'
        }, {
          cover: '/vue-static/landings/music/cover-400/sand_castle.png',
          bigCover: '/vue-static/landings/music/cover-1000/sand_castle.png',
          title: 'Sand Castle',
          description: 'Playful tic tac',
          description2: 'Lifestyle vlog',
          src: 'https://cdnd.icons8.com/download/music/sand_castle.mp3',
          srcZip: 'https://cdnd.icons8.com/download/music/sand_castle.zip',
          url: '/sand_castle'
        }, {
          cover: '/vue-static/landings/music/cover-400/relaxed_party.png',
          bigCover: '/vue-static/landings/music/cover-1000/relaxed_party.png',
          title: 'Relaxed Party',
          description: 'Lazy clap, solid snap',
          description2: 'Mockup showcase',
          src: 'https://cdnd.icons8.com/download/music/relaxed_party.mp3',
          srcZip: 'https://cdnd.icons8.com/download/music/relaxed_party.zip',
          url: '/relaxed_party'
        }, {
          cover: '/vue-static/landings/music/cover-400/tiny_people.png',
          bigCover: '/vue-static/landings/music/cover-1000/tiny_people.png',
          title: 'Tiny People',
          description: 'Foolish xylophone',
          description2: 'Spirit of inventing',
          src: 'https://cdnd.icons8.com/download/music/tiny_people.mp3',
          srcZip: 'https://cdnd.icons8.com/download/music/tiny_people.zip',
          url: '/tiny_people'
        }, {
          cover: '/vue-static/landings/music/cover-400/entering_the_cave.jpg',
          bigCover: '/vue-static/landings/music/cover-1000/entering_the_cave.jpg',
          title: 'Entering the Cave',
          description: 'Hypnotic drums',
          description2: 'Technology overview',
          src: 'https://cdnd.icons8.com/download/music/entering_the_cave.mp3',
          srcZip: 'https://cdnd.icons8.com/download/music/entering_the_cave.zip',
          url: '/entering_the_cave'
        }, {
          cover: '/vue-static/landings/music/cover-400/chinese_water_torture.png',
          bigCover: '/vue-static/landings/music/cover-1000/chinese_water_torture.png',
          title: 'Chinese Water Torture',
          description: 'Dribbling clave',
          description2: '...or chemistry exam',
          src: 'https://cdnd.icons8.com/download/music/chinese_water_torture.mp3',
          srcZip: 'https://cdnd.icons8.com/download/music/chinese_water_torture.zip',
          url: '/chinese_water_torture'
        }]
      }
    },
    computed: {
      musilListWithPrev() {
        var newMusicList = []
        for (var i = 0; i < this.musicList.length; i++) {
           newMusicList[i] = this.musicList[i]
          if (i == 0) {
            newMusicList[i].prevMusic = this.musicList[this.musicList.length - 1].name
          } else {
            newMusicList[i].prevMusic = this.musicList[i - 1].src
          }
        }
        return newMusicList
      },
      shareText () {
        return 'Music written by our team of composers. Use it for free in all your personal and commercial projects'
      }
    }
  }
</script>

<style lang="scss">
  .music-landing-page {
    .app-page-title.is-music {
      font-size: 46px;

      @media screen and (max-width: 575px){
        font-size: 32px;
      }
    }
    .app-page-subtitle.is-music {
      font-size: 22px;
      max-width: 570px;
      margin-bottom: 45px;

      @media screen and (max-width: 575px){
        font-size: 16px;
      }
    }

    .music-wrapper {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      .music-cover {
        margin: 0 40px 88px;
      }
    }
  }
</style>
