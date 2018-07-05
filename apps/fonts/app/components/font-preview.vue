<template lang="pug">
  .font
    .layout.column
      .outline(ref="outline" :class="{ png: font && font.source && font.source.filename, lost: !(font && font.loaded) }")
        div(v-if="font && font.loaded") {{ font ? text : '' }}
        .lost__container.text--center(v-else)
          .lost__image
            img(src="~/static/vue-static/fonts-app/lost-preview.png")
          .lost__text Damn! Preview is lost.
      .layout.layout--wrap.layout--space-between.row.description
        .title {{ font ? font.title : '' }}
        .link(v-if="isSourceService(font)")
          a(:href="getSourceLink(font)" target="_blank") Get from {{ getSourceLinkText(font) }}
</template>

<script>
  import config from '~/config.js'
  import { mapGetters, mapState } from 'vuex'

  export default {
    props: ['font'],
    data () {
      return {
        text: '',
        pngSourceTitle: config.pngSourceTitle
      }
    },
    computed: {
      ...mapGetters(['getSourceLink', 'getSourceLinkText', 'isSourceService']),
      ...mapState({
        loadedFonts: state => state.loadedFonts
      })
    },
    watch: {
      font: {
        handler: function (font) {
          if (font.loaded === true) {
            this.setPreview()
          } else {
            this.clearOutline()
          }
        }
      }
    },
    methods: {
      /*
       * Set font-family/preview if font is loaded
       */
      setPreview () {
        this.clearOutline()
        if (this.font && this.font.loaded && this.$refs.outline) {
          if (this.font.source && this.font.source.filename) {
            this.$refs.outline.style.backgroundImage = `url('${`/vue-static/fonts-app/previews/${this.font.source.filename}`}')`
          } else if (this.font.source) {
            const fontSourceData = this.font.source.data ? JSON.parse(this.font.source.data) : {}
            this.text = 'Aa'

            switch (this.font.source.title) {
              case config.fontsSquirrelSourceTitle:
                this.text = ''
                this.$refs.outline.style.backgroundImage = `url("data:image/png;base64,${fontSourceData.listing_image_inverted}")`
                break
              case config.googleSourceTitle:
                this.$refs.outline.style.fontFamily = `"${this.font.title}"`
                break
              case config.typekitSourceTitle:
                this.$refs.outline.style.fontFamily = `"${fontSourceData.web_id}"`
                break
            }
          }
        }
      },
      clearOutline() {
        this.text = ''
        this.$refs.outline.style.backgroundImage = 'none'
        this.$refs.outline.style.fontFamily = ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/css/variables';
  @import '../assets/css/mixins';

  .font {
    width: 50%;
    white-space: nowrap;

    .title {
      text-transform: capitalize;
      white-space: normal;
      font-size: 24px;
      padding-right: 10px;
    }

    .link a {
      font-family: 'Lora', serif;
      font-style: italic;
      color: #7a7a7a;
      line-height: normal;
      text-decoration: none;
      white-space: normal;

      &:hover {
        color: $redColor;
      }
    }

    .outline {
      line-height: 233px;
      height: 240px;
      color: #fff;
      font-size: 255px;
      border-bottom: 1px solid #bdbdbd;
      background: no-repeat 0 50%;
    }

    .lost {
      &__container {
        line-height: normal;
        font-size: 12px;
      }

      &__image {

        img {
          max-width: calc(100% - 37px);
        }
      }

      &__text {
        color: #7f7f7f;
        font-family: 'HelveticaNeueCyr', sans-serif;
        margin-top: 15px;
        white-space: normal;
      }
    }

    .description {
      padding: 9px 0 14px 0;
    }
  }

  // Mobile
  @media (min-width: 0) {
    .font {
      .lost {
        &__text {
          font-size: 18px;
        }

        &__image {
          display: none;
        }
      }

      .outline {
        line-height: 110px;
        height: 105px;
        font-size: 90px;
        padding-left: 0;
      }

      .outline.png {
        background-size: contain;
      }

     .title {
        font-size: 16px;
      }

      .link a {
        font-size: 12px;
      }
    }
  }

  @media (min-width: 350px) {
    .font {
      .lost {
        &__image {
          display: block;
        }
      }
    }
  }

  // Desktop
  @media (min-width: 771px) {
    .font {
      .lost {
        &__container {
          margin-top: 10px;
        }
      }

      .title {
        font-size: 20px;
      }
    }
  }

  @media (min-width: 1115px) {
    .font {
      .outline {
        line-height: 133px;
        height: 140px;
        font-size: 155px;
        padding-left: 30px;
      }

      .lost {
        padding-left: 0;

        &__container {
          margin-top: 30px;
        }

        &__text {
          font-size: 20px;
        }
      }

      .outline.png {
        background-size: auto 180px;
      }

      .link a {
        font-size: 14px;
      }
    }
  }

  @media (min-width: 1450px) {
    .font {
      .lost {
        &__container {
          margin-top: 60px;
        }

        &__text {
          font-size: 32px;
        }
      }

      .outline {
        line-height: 233px;
        height: 240px;
        font-size: 255px;
        padding-left: 30px;
      }

      .lost {
        padding-left: 0;

        &__container {
          margin-top: 60px;
        }

        &__text {
          font-size: 32px;
        }
      }

      .outline.png {
        background-size: auto 280px;
      }

      .link a {
        font-size: 16px;
      }

      .title {
        font-size: 24px;
      }
    }
  }
</style>
