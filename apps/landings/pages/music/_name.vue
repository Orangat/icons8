<template lang="pug">
  .music-item-page
    .app-page-section
      .container
        h1.app-page-title {{ track.title }}
        p.subtitle.is-ma {{track.description }}
        p.subtitle.is-mb.is-ma {{track.description2}}
        section.music-content.row
          .col.col-6
            .music-cover-img.is-cover-big
              img(v-bind:src="track.bigCover")
          .col.col-6
            section.music-content-wrapper
              .music-player
              .music-content-markers
                .music-content__title Markers
                markers-list
              .music-content-extra-tracks
                .music-content__title Extra Tracks
                ul.music-list
                  li.music-item
                    a(href="") Packshot
      .music-features-wrapper
        .container
          section.music-features.row
            .music-features__item.col.col-6(v-for="feature in musicFeatures")
              h2.music-features__title {{feature.title}}
              p.music-features__description(v-html="feature.description") 
      .container
        section.download
          a.button.button-download(href='') Download
          p.subtitle WAV 16 bit/48 KHz
          p.subtitle
            | Use for free, but link 
            a.link(href='') link to us
      section.author-wrapper
        .container
          section.author.row
            .col.col-6
              .autor-about-wrapper
                .author-about
                  span.author__title Composer
                  .author__preview
                    img(src='/vue-static/landings/music/composer.png', alt='')
                  span.author__name De Bronhe
            .col.col-6
              .author-info
                span Classic musician
                span Fan of Bach
                span Concert DJ
                span Composer for the movies
                span Music for Volkswagen commercials
                span Full time Icons8 team member
      h1.app-page-title Simmilar music
      .container
</template>

<script>
export default {
  name: "singleMusic",
  layout: "music",
  data() {
    return {
      musics: {
        'drowning_in_a_pool': {
          cover: '/vue-static/landings/music/cover-400/drowing_in_the_pool.png',
          bigCover: '/vue-static/landings/music/cover-1000/drowing_in_the_pool.png',
          title: 'Drowning in a Pool',
          description: 'Quirky arpeggio',
          description2: 'Chill out',
          src: 'https://cdnd.icons8.com/download/music/spark_adventures.mp3',
          srcZip: 'https://cdnd.icons8.com/download/music/spark_adventures.zip',
          url: '/drowning_in_a_pool'
        },
        'drone_over_central_park': {
            cover: '/vue-static/landings/music/cover-400/drone_over_central_park.png',
            bigCover: '/vue-static/landings/music/cover-1000/drone_over_central_park.png',
            title: 'Drone Over Central Park',
            description: 'Dreamy synths',
            description2: 'One-to-one walkthrough',
            src: 'https://cdnd.icons8.com/download/music/airglow.mp3',
            srcZip: 'https://cdnd.icons8.com/download/music/airglow.zip',
            prevMusic: '/vue-static/landings/music/bottle_done5.wav',
            url: '/drone_over_central_park'
          },
        'to_take_courage': {
            cover:'/vue-static/landings/music/cover-400/to_take_courage.png',
            bigCover:'/vue-static/landings/music/cover-1000/to_take_courage.png',
            title: 'To Take Courage',
            description: 'Magic orchestra',
            description2: 'For inspirational stories',
            src: 'https://cdnd.icons8.com/download/music/to_take_courage.mp3',
            srcZip: 'https://cdnd.icons8.com/download/music/to_take_courage.zip',
            url: '/to_take_courage'
        },
        'almost_sober': {
          cover: '/vue-static/landings/music/cover-400/almost_sober.png',
          bigCover: '/vue-static/landings/music/cover-1000/almost_sober.png',
          title: 'Almost Sober',
          description: 'Old-school groove',
          description2: 'Casual presentation',
          src: 'https://cdnd.icons8.com/download/music/interior.mp3',
          srcZip: 'https://cdnd.icons8.com/download/music/interior.zip',
          url: '/almost_sober'
        },
        'trip_to_the_east': {
          cover: '/vue-static/landings/music/cover-400/trip_to_the_east.png',
          bigCover: '/vue-static/landings/music/cover-1000/trip_to_the_east.png',
          title: 'Trip to the East',
          description: 'Melodic percussion',
          description2: 'Almost a dance',
          src: 'https://cdnd.icons8.com/download/music/mediate.mp3',
          srcZip: 'https://cdnd.icons8.com/download/music/mediate.zip',
          url: '/trip_to_the_east'
        },
        'sand_castle': {
          cover: '/vue-static/landings/music/cover-400/sand_castle.png',
          bigCover: '/vue-static/landings/music/cover-1000/sand_castle.png',
          title: 'Sand Castle',
          description: 'Playful tic tac',
          description2: 'Lifestyle vlog',
          src: 'https://cdnd.icons8.com/download/music/tak_tak.mp3',
          srcZip: 'https://cdnd.icons8.com/download/music/tak_tak.zip',
          url: '/sand_castle'
        },
        'relaxed_party': {
          cover: '/vue-static/landings/music/cover-400/relaxed_party.png',
          bigCover: '/vue-static/landings/music/cover-1000/relaxed_party.png',
          title: 'Relaxed Party',
          description: 'Lazy clap, solid snap',
          description2: 'Invisible operator',
          src: 'https://cdnd.icons8.com/download/music/miami_hub.mp3',
          srcZip: 'https://cdnd.icons8.com/download/music/miami_hub.zip',
          url: '/relaxed_party'
        },
        'tiny_people': {
          cover: '/vue-static/landings/music/cover-400/tiny_people.png',
          bigCover: '/vue-static/landings/music/cover-1000/tiny_people.png',
          title: 'Tiny People',
          description: 'Foolish xylophone',
          description2: 'Spirit of inventing',
          src: 'https://cdnd.icons8.com/download/music/tiny_people.mp3',
          srcZip: 'https://cdnd.icons8.com/download/music/tiny_people.zip',
          url: '/tiny_people'
        },
        'entering_the_cave': {
          cover: '/vue-static/landings/music/cover-400/entering_the_cave.jpg',
          bigCover: '/vue-static/landings/music/cover-1000/entering_the_cave.jpg',
          title: 'Entering the Cave',
          description: 'Hypnotic drums',
          description2: 'Time is fading',
          src: 'https://cdnd.icons8.com/download/music/integral_scape.mp3',
          srcZip: 'https://cdnd.icons8.com/download/music/integral_scape.zip',
          url: '/entering_the_cave'
        },
        'chinese_water_torture': {
          cover: '/vue-static/landings/music/cover-400/chinese_water_torture.png',
          bigCover: '/vue-static/landings/music/cover-1000/chinese_water_torture.png',
          title: 'Chinese Water Torture',
          description: 'Dribbling clave',
          description2: '...or chemistry exam',
          src: 'https://cdnd.icons8.com/download/music/malekular_motion.mp3',
          srcZip: 'https://cdnd.icons8.com/download/music/malekular_motion.zip',
          url: '/chinese_water_torture'
        }
      },
      musicFeatures: [{
            title: 'Mood',
            description: 'Dynamic, universal, meditative'
          },
          {
            title: 'Usage',
            description: 'Solid background for a voice-over'
          },
          {
            title: 'Development',
            description: 'The main reprise repeats the main motive'
          },
          {
            title: 'Instruments',
            description: 'Full of various percussions <br> Ambiental sounds of Hong Kong'
          }]
    };
  },
  computed: {
    track() {
      return this.musics[this.$route.params.name]
    }
  }
};
</script>

<style lang="scss">
  @import "~assets/css/music/variables.scss";
  @import "~assets/css/music/music.scss";
  @import "../../../public/assets/css/variables.scss";

  .music-item-page {
    .music-content {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      width: 100%;
    }
    .music-player {
      min-height: 90px;
      margin-bottom: 60px;
      background-color: $color-lightgrey;
    }
    .music-content__title {
      font-size: 20px;
      margin-bottom: 24px;
    }
    .music-features-wrapper {
      width: 100%;
      background-color: $color-lightgrey;
    }
    .music-features {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: flex-start;
      padding: 126px 0;
      // @media #{$laptop-min-width} {
      //   padding: 90px 0;
      // }
    }
    .music-features__item {
      width: 50%;
      margin-bottom: 50px;
    }
    .music-features__title {
      font-size: 24px;
      text-align: left;
      margin-bottom: 12px;
    }
    .music-fetures__description {
      font-size: 20px;
      font-weight: lighter;
      color: $color-font;
    }
    .download {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 96px 0;
    }
    .download .subtitle {
      font-size: 20px;
      font-weight: lighter;
      margin-bottom: 6px;
    }
    .button-download {
      font-size: 34px;
      padding: 10px 36px;
      margin-bottom: 16px;
      border-radius: 5px;
      height: auto;
      background-color: $color-blue;
      border-color: $color-blue;
      color: white;
    }
    .author-wrapper {
      width: 100%;
      margin-bottom: 85px;
      background-color: $color-lightgrey;
    }
    .author {
      padding: 126px 0;
      // @media #{$laptop-min-width} {
      //   padding: 90px 0;
      // }
    }
    .autor-about-wrapper {
      display: flex;
    }
    .author-about {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      margin-left: auto;
    }
    .author__title {
      text-transform: uppercase;
      letter-spacing: 6px;
      color: $color-carrot;
    }
    .author__preview {
      width: 140px;
    }
    .author__preview img {
      width: 100%;
      height: auto;
    }
    .author-info {
      display: flex;
      flex-direction: column;
    }
    .author-info {
      font-size: 20px;
      font-weight: lighter;
      line-height: 36px;
      color: $color-font;
    }
  }
</style>