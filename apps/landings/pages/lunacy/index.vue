<template lang="pug">
  .lunacy
    #sticky.warm-black_back
      header
        #logo
          a(href='https://icons8.com/lunacy')
            img.mark(src='vue-static/landings/lunacy/logo_mark.png', alt='Lunacy Crystall')
            img.word(src='vue-static/landings/lunacy/logo_word.png', alt='Lunacy Wordmark')
        nav
          a(href="https://community.icons8.com/") Community
          a(href="https://lunatics.icons8.com/") Request Features
          a(href="https://docs.icons8.com/release-notes/") Release Notes
        a.small_wired.white_wired_btn(href='http://desktop.icons8.com/lunacy/LunacySetup.exe')
          | Download
    main
      .warm-black_back
        section#foreword
          h1.white_txt
            | Free Sketch for Windows
          p.white_txt.light
            | Native Windows app that works offline and supports .sketch files
          .wrap_btn( :class="{opacity: !isReady}")
            .cta(v-if='isWin7')
              a.big_filled.isNoBgPic(href='http://desktop.icons8.com/lunacy/LunacySetup.exe')
                | Download for free
            .cta(v-else)
              a.big_filled(href='https://www.microsoft.com/store/apps/9pnlmkkpcljj?ocid=badge')
                | Get from Windows Store
            .wrap_link_download(v-if='isWin7')
              a.portable.isHaveIcon(href='https://www.microsoft.com/store/apps/9pnlmkkpcljj?ocid=badge')
                | Windows Store version&nbsp;
                span (Windows 10 only)
              a.portable(href='http://desktop.icons8.com/lunacy/LunacyPortable.zip' style="margin-top: 0")
                | Portable version&nbsp;
                span (LunacyPortable.zip, 30 Mb)
            .wrap_link_download(v-else)
              a.portable(href='http://desktop.icons8.com/lunacy/LunacySetup.exe')
                | Windows installer&nbsp;
                span (LunacySetup.exe, 15 Mb)
              a.portable(href='http://desktop.icons8.com/lunacy/LunacyPortable.zip' style="margin-top: 0")
                | Portable version&nbsp;
                span (LunacyPortable.zip, 30 Mb)
      .warm-black_back
        section#explainer
          .slider
            .slider__body(
            v-bind:style='{left: sliderOffsetLeft + "px"}')
              .slider__slide(
              v-for='slide in sliderList'
              v-bind:style='`background-image: url(${slide})`')
          .controls
            .slider__btn(v-for = "btn in sliderList.length"
            v-bind:class = "{'slider__btn--active': sliderActive === btn}"
            v-on:click='openSlide(btn)')
      .white_back
        section#features
          h2
            | All Features That You’ve Read About
          p
            | …and sometimes used
          #feature_list
            figure
              img(src='vue-static/landings/lunacy/open.png' alt='Open And Save Sketch Files')
              figcaption
                | Open And Save
                br
                | Sketch Files
            figure
              img(src='vue-static/landings/lunacy/artboard.png' alt='Organize Pages and Artboards')
              figcaption
                | Organize Pages and Artboards
            figure
              img(src='vue-static/landings/lunacy/objects.png' alt='Draw, Join, Align Objects')
              figcaption
                | Draw, Join, Align
                br
                | Objects
            figure
              img(src='vue-static/landings/lunacy/typography.png' alt='Use Basic Typography Tools')
              figcaption
                | Use Basic
                br
                | Typography Tool
            figure
              img(src='vue-static/landings/lunacy/export.png' alt='Export Assets in PNG and SVG')
              figcaption
                | Export Assets
                br
                | in PNG and SVG
            figure
              img(src='vue-static/landings/lunacy/code.png' alt='CSS and XAML code')
              figcaption
                | CSS and XAML
                br
                | code
      .gray_back
        section#development
          section#active
            img(src='vue-static/landings/lunacy/beta.png', alt='Beta')
            h2
              | Feature Requests
            p
              | We've got a community that reports the bugs and votes for the features.
            a.big_wired.dark_wired_btn.send_file(href='https://lunatics.icons8.com/')
              | Request Feature
      .yellow_back
        section#afterword
          h2
            | Mac and Windows Designers Can Be
            br
            | Friends Again. Save the Peace.
          .wrap_btn
            .cta(v-if='isWin7')
              a.big_filled.isNoBgPic(href='http://desktop.icons8.com/lunacy/LunacySetup.exe')
                | Download for free
            .cta(v-else)
              a.big_filled(href='https://www.microsoft.com/store/apps/9pnlmkkpcljj?ocid=badge')
                | Get from Windows Store
            .wrap_link_download(v-if='isWin7')
              a.portable.isHaveIcon(href='https://www.microsoft.com/store/apps/9pnlmkkpcljj?ocid=badge')
                | Windows Store version&nbsp;
                span (Windows 10 only)
              a.portable(href='http://desktop.icons8.com/lunacy/LunacyPortable.zip' style="margin-top: 0")
                | Portable version&nbsp;
                span (LunacyPortable.zip, 30 Mb)
            .wrap_link_download(v-else)
              a.portable(href='http://desktop.icons8.com/lunacy/LunacySetup.exe')
                | Windows installer&nbsp;
                span (LunacySetup.exe, 15 Mb)
              a.portable(href='http://desktop.icons8.com/lunacy/LunacyPortable.zip' style="margin-top: 0")
                | Portable version&nbsp;
                span (LunacyPortable.zip, 30  Mb)
      .white_back
        .position_class
          section#comments_header
            div
              h3
                | Leave a Cheerful Feedback
          section#comments_body
            app-comments
    .share-lunacy
      share-link(v-bind:text="shareText" v-bind:show-link="false")
    app-footer
</template>

<script>
  import config from '../../../public/plugins/config'
  import utils from '~/plugins/utils'

  export default {
    layout: 'lunacy',
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          hid: 'favicon-16',
          href: `${config.staticCdn}/vue-static/landings/lunacy/favicon.ico`
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          hid: 'favicon-32',
          href: `${config.staticCdn}/vue-static/landings/lunacy/favicon.ico`
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '96x96',
          hid: 'favicon-96',
          href: `${config.staticCdn}/vue-static/landings/lunacy/favicon.ico`
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '194x194',
          hid: 'favicon-194',
          href: `${config.staticCdn}/vue-static/landings/lunacy/favicon.ico`
        }
      ]
    },
    fetch({store}) {
      store.dispatch('updateSEO', {
        title: 'Lunacy, Sketch for Windows',
        description: 'Lunacy is a native Windows app that opens, edits, and stores .sketch files. And it’s completely free.',
        image: `${config.staticCdn}/vue-static/landings/lunacy/preview_lunacy.png`
      })
    },
    data() {
      return {
        // Всего слайдов
        sliderAllCount: 0,
        // Номер активного слайда
        sliderActive: 1,
        // Отступ тела со слайдами в контейнере
        sliderOffsetLeft: 0,
        // Шаг одного слайда = его длина
        sliderOffsetStep: 0,
        sliderList: [
          'vue-static/landings/lunacy/screen1.png',
          'vue-static/landings/lunacy/screen2.png',
          'vue-static/landings/lunacy/screen3.png',
          'vue-static/landings/lunacy/screen4.png',
          'vue-static/landings/lunacy/screen5.png',
          'vue-static/landings/lunacy/screen6.png',
        ],
        shareText: 'An indie team created Sketch for Windows',
        isWin7: undefined,
        isReady: false
      }
    },
    mounted() {
      this.isReady = true;
      this.custom()
      this.initSlider()
      // Перенастройка слайдера при ресайзе окна
      window.addEventListener('resize', () => {
        this.initSlider()
        this.openSlide(this.sliderActive)
      })
      this.infinitySlider()
    },
    methods: {
      custom: function () {
        this.isWin7 = utils.isWindows7()
        !this.isWin7 ? this.isOtherOs = true : this.isOtherOs = false
      },
      scrollTo(id, options) {
        this.$scrollTo(this.$el.querySelector(id), 500, options)
      },
      initSlider() {
        // Получаем элементы сладера и его слайдов
        let sliderBody = this.$el.querySelector('.slider')
        let sliderSlidies = sliderBody.querySelectorAll('.slider__slide')
        // Записываем длину одного слайда для перелистывания
        this.sliderOffsetStep = sliderBody.offsetWidth
        // Общее количество слайдов для стопов
        this.sliderAllCount = sliderSlidies.length
      },
      // Открыть слайд по номеру
      openSlide(id) {
        if (id > 0 && id <= this.sliderAllCount) {
          this.sliderActive = id
          // Сдвигаем элемент со слайдами
          this.sliderOffsetLeft = -(this.sliderActive * this.sliderOffsetStep - this.sliderOffsetStep)
        }
      },
      infinitySlider() {
        setTimeout(() => {
          if (this.sliderActive !== this.sliderList.length) {
            this.sliderActive += 1
          } else {
            this.sliderActive = 1
          }
          this.infinitySlider()
          this.openSlide(this.sliderActive)
        }, 5000)
      }
    }
  }
</script>

<style lang="scss">
  .lunacy {
    // Color Variables
    $warm-black: #24282A;
    $cool-black: #2E2D45;
    $white: #ffffff;
    $red: #F85555;
    $gray: #F5F5F5;
    $yellow: #FFD36F;

    // Font Weight Variables
    $light: 100;
    $normal: 400;
    $bold: 700;

    // Font Size Variables
    $bigger: 1.125rem;
    $base: 1rem;
    $small: 0.875rem;

    // Break Point Variables
    $mobile-width: "(max-width: 480px)";
    $hide: "(max-width: 560px)";
    $portrait-tablet-width: "(max-width: 768px)";
    $landscape-tablet-width: "(max-width: 980px)";

    // Typography
    font-size: 16px;
    font-weight: $normal;
    color: $warm-black;
    text-align: center;
    overflow-x: hidden;

    h1, h2, h3 {
      font-weight: $bold;
    }

    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }

    a {
      color: $warm-black;
      text-decoration: none;
    }

    h1 {
      font-size: 4rem;
      line-height: 5.5rem;
      margin: 0 0 16px 0;

      @media #{$portrait-tablet-width} {
        font-size: 3.5rem;
        line-height: 5rem;
      }

      @media #{$mobile-width} {
        font-size: 2.5rem;
        line-height: 3.5rem;
        margin: 0 0 8px 0;
        padding: 0 24px 0 24px;
      }

    }

    h2 {
      font-size: 2.5rem;
      line-height: 3rem;
      margin: 0 0 8px 0;

      @media #{$portrait-tablet-width} {
        font-size: 2rem;
        line-height: 2.5rem;
      }

      @media #{$mobile-width} {
        font-size: 1.5rem;
        line-height: 2rem;
        padding: 0 24px 0 24px;
      }

    }

    h3 {
      font-size: 1.25rem;
      line-height: 2rem;
      margin: 0 0 48px 0;

      @media #{$mobile-width} {
        font-size: $base;
        line-height: 2rem;
        margin: 0 0 24px 0;
      }

    }

    p {
      font-size: $bigger;
      line-height: 2rem;
      margin: 0 0 8px 0;

      @media #{$mobile-width} {
        font-size: $small;
        line-height: 1.5rem;
        margin: 0;
      }

      @media #{$mobile-width} {
        padding: 0 24px 0 24px;
      }

    }

    figcaption {
      font-size: $base;
      line-height: 1.5rem;

      @media #{$mobile-width} {
        font-size: 0.75rem;
        line-height: 1rem;
      }

    }

    a {
      font-size: $small;
      line-height: 1.5rem;
    }

    .opacity{
      opacity: 0;
      transition: all .5s;
    }

    .wrap_btn{
      transition: all .5s;
    }

    // Buttons
    a.big_filled {
      display: inline-block;
      font-size: $small;
      text-align: center;
      color: $white;
      width: 300px;
      height: 56px;
      border-radius: 3px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin: 24px 12px 0 12px;
      border-style: none;
      text-decoration: none;
      background: $red url("/vue-static/landings/lunacy/winstore.png") no-repeat 22px center;
      background-size: 22px;
      padding-left: 26px;
      line-height: 56px;

      &.isNoBgPic{
        background-image: none;
        padding-left: 0;
      }

      &:hover {
        background-color: #E74040;
        color: #FFE8E8;
        transition: all 0.5s;
      }

      @media #{$mobile-width} {
        font-size: 0.75rem;
        width: 275px;
        height: 48px;
        margin: 16px 0 0 0;
        line-height: 48px;
      }

    }

    a.big_wired {
      display: inline-block;
      font-size: $small;
      text-align: center;
      width: 258px;
      height: 56px;
      border-radius: 3px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin: 24px 12px 0 12px;
      border: 1px solid;
      cursor: pointer;
      text-decoration: none;
      padding: 15px 0;

      @media #{$mobile-width} {
        font-size: 0.75rem;
        width: 240px;
        height: 48px;
        margin: 16px 0 0 0;
        padding-top: 11px;
        background-position: 40px 10px;
      }

    }

    a.small_wired {
      display: inline-block;
      font-size: $small;
      text-align: center;
      width: 116px;
      height: 32px;
      border-radius: 3px;
      margin: 0;
      padding: 0;
      border: 1px solid;
      cursor: pointer;
      text-decoration: none;
      padding-top: 3px;
    }

    a.white_wired_btn {
      color: $white;
      border-color: $white;

      &:hover {
        opacity: 0.5;
        transition: all 0.5s;
      }

    }

    a.dark_wired_btn {
      color: $warm-black;
      border-color: $warm-black;

      &:hover {
        opacity: 0.5;
        transition: all 0.5s;
      }

    }

    a.send_file {
      padding-left: 0;
      background: none;
    }

    // Header
    #sticky {
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 12;

      @media #{$mobile-width} {
        position: relative;
      }

    }

    .warm-black_back {
      background-color: $warm-black;

      header {
        padding: 0 24px;
        max-width: 1272px;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        @media #{$mobile-width} {
          padding: 16px 20px 0 20px;
        }

        #logo {
          overflow: hidden;
          margin: 8px 0;

          @media #{$mobile-width} {
            width: 48px;
            margin-top: 64px;
          }

          @media #{$hide} {
            width: 48px;
            margin-top: 40px;
          }

          a {
            display: block;

            img {
              display: block;
              height: 48px;
              float: left;
            }

            .word {
              @media #{$portrait-tablet-width} {
                display: none;
              }

              @media #{$mobile-width} {
                display: none;
              }

            }

          }

        }

        nav {
          margin: 0 auto;
          display: block;

          @media #{$mobile-width} {
            display: none;
          }

          @media #{$hide} {
            display: none;
          }

          a {
            display: inline-block;
            color: $white;
            line-height: 2rem;
            padding: 16px;
            height: 64px;

            &:hover {
              opacity: 0.7;
              transition: all 0.5s;
            }

            &:active {
              opacity: 0.3;
              transition: all 0.5s;
            }

          }

        }

        a {
          display: block;

          @media #{$mobile-width} {
            display: none;
          }

          @media #{$hide} {
            display: none;
          }

        }

      }

    }

    // Foreword
    .warm-black_back {
      background-color: $warm-black;

      section#foreword {
        padding: 184px 24px 112px 24px;
        max-width: 1272px;
        margin: 0 auto;

        @media #{$portrait-tablet-width} {
          padding: 96px 24px 80px 24px;
        }

        @media #{$mobile-width} {
          padding: 16px 20px 48px 20px;
        }

        h1.white_txt, p.white_txt {
          color: $white;
        }

        p.light {
          font-weight: $light;
        }

        a.portable {
          color: $white;
          margin-top: 24px;
          display: block;

          &.isHaveIcon{
            background: url(/vue-static/landings/lunacy/winstore-small.png) no-repeat 0px center;
            background-size: 16px;
            width: 310px;
            margin: 24px auto 0;
          }

          span {
            color: #b6b6b6;
          }

          &:hover {
            opacity: 0.7;
            transition: all 0.5s;
          }

          &:active {
            opacity: 0.3;
            transition: all 0.5s;
          }

          &:visited {
            opacity: 1;
            transition: all 0.5s;
          }

          @media #{$mobile-width} {
            display: none;
          }

        }

      }

    }

    // Video explainer
    .warm-black_back {
      background-color: $warm-black;

      section#explainer {
        padding: 0 24px;
        max-width: 1272px;
        margin: 0 auto -248px;

        @media #{$portrait-tablet-width} {
          margin-bottom: -144px;
        }

        @media #{$mobile-width} {
          margin-bottom: -72px;
          padding: 0 20px;
        }

        $slider-height: 706px;
        $slide-width: 1224px;

        .controls {
          margin: 0 auto;
          overflow: hidden;
          width: 152px;
          padding-top: 32px;

          .slider__btn {
            width: 8px;
            height: 8px;
            background-color: #BCBDBE;
            border-radius: 4px;
            cursor: pointer;
            float: left;
            margin: 4px 8px;
            transition: all 0.8s;
          }

          .slider__btn--active {
            background-color: #24282A;
            width: 16px;
            height: 16px;
            border-radius: 8px;
            margin: 0 8px;
            transition: all 0.8s;
          }
        }

        .slider {
          width: $slide-width;
          height: $slider-height;
          position: relative;
          overflow: hidden;
          margin: 0 auto;
          box-shadow: 0 12px 30px 0 rgba(0, 0, 0, 0.10);

          @media (min-width: 990px) and (max-width: 1280px) {
            width: 930px;
            height: 536px;
          }
          @media (min-width: 768px) and (max-width: 989px) {
            width: 700px;
            height: 403px;
          }
          @media (min-width: 576px) and (max-width: 767px) {
            width: 520px;
            height: 300px;
          }
          @media (min-width: 320px) and (max-width: 575px) {
            width: 280px;
            height: 161px;
          }
        }

        .slider__body {
          min-width: auto;
          height: $slider-height;
          display: flex;
          position: relative;
          align-items: stretch;
          transition: all 1s ease;

          @media (min-width: 990px) and (max-width: 1280px) {
            width: 930px;
            height: 536px;
          }
          @media (min-width: 768px) and (max-width: 989px) {
            width: 700px;
            height: 403px;
          }
          @media (min-width: 576px) and (max-width: 767px) {
            width: 520px;
            height: 300px;
          }
          @media (min-width: 320px) and (max-width: 575px) {
            width: 280px;
            height: 161px;
          }
        }

        .slider__slide {
          min-width: $slide-width;
          height: $slider-height;
          background-size: 1224px 706px;
          background-position: left top;

          @media (min-width: 990px) and (max-width: 1280px) {
            min-width: 930px;
            height: 536px;
            background-size: 930px 536px;
          }
          @media (min-width: 768px) and (max-width: 989px) {
            min-width: 700px;
            height: 403px;
            background-size: 700px 403px;
          }
          @media (min-width: 576px) and (max-width: 767px) {
            min-width: 520px;
            height: 300px;
            background-size: 520px 300px;
          }
          @media (min-width: 320px) and (max-width: 575px) {
            min-width: 280px;
            height: 161px;
            background-size: 280px 161px;
          }
        }
      }
    }

    // Features
    .white_back {
      background-color: $white;

      section#features {
        padding: 372px 24px 160px 24px;
        max-width: 1272px;
        margin: 0 auto;

        @media #{$portrait-tablet-width} {
          padding: 224px 24px 128px 24px;
        }

        @media #{$mobile-width} {
          padding: 120px 20px 72px 20px;
        }

        #feature_list {
          padding-top: 80px;
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          grid-gap: 24px;

          @media #{$landscape-tablet-width} {
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(2, 1fr);
            grid-gap: 56px 24px;
          }

          @media #{$portrait-tablet-width} {
            padding-top: 56px;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(2, 1fr);
            grid-gap: 40px 24px;
          }

          @media #{$mobile-width} {
            padding-top: 40px;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(3, 1fr);
            grid-gap: 40px 24px;
          }

          figure {
            margin: 0;

            img {
              display: block;
              width: 72px;
              height: 72px;
              margin: 0 auto 16px;

              @media #{$mobile-width} {
                margin-bottom: 8px;
              }
            }
          }
        }
      }
    }

    // Development
    .gray_back {
      background-color: $gray;

      section#development {
        padding: 48px 24px 136px 24px;
        max-width: 1272px;
        margin: 0 auto;

        @media #{$portrait-tablet-width} {
          padding: 32px 24px 128px 24px;
        }

        @media #{$mobile-width} {
          padding: 16px 20px 72px 20px;
        }

        section#active {
          @media #{$portrait-tablet-width} {
            padding-bottom: 32px;
          }

          @media #{$mobile-width} {
            padding-bottom: 40px;
          }

          img {
            display: block;
            width: 48px;
            height: 48px;
            margin: 0 auto 32px;

            @media #{$portrait-tablet-width} {
              width: 32px;
              height: 32px;
              margin-bottom: 16px;
            }

            @media #{$mobile-width} {
              width: 24px;
              height: 24px;
              margin-bottom: 8px;
            }
          }

          p {
            @media #{$portrait-tablet-width} {
              margin-bottom: 0;
            }
          }
        }

        section#next {
          padding-top: 64px;

          @media #{$portrait-tablet-width} {
            padding-top: 56px;
          }

          @media #{$mobile-width} {
            padding-top: 32px;
          }

          div#grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-gap: 24px;

            @media #{$landscape-tablet-width} {
              grid-template-columns: repeat(3, 1fr);
              grid-template-rows: repeat(4, 1fr);
              grid-gap: 24px;
            }

            @media #{$portrait-tablet-width} {
              grid-template-columns: repeat(2, 1fr);
              grid-template-rows: repeat(6, 1fr);
              grid-gap: 24px;
            }

            @media #{$mobile-width} {
              grid-template-columns: repeat(2, 1fr);
              grid-template-rows: repeat(6, 1fr);
              grid-gap: 24px;

              figcaption {
                line-height: 1.5rem;
              }
            }

            figure {
              overflow: hidden;
              margin: 0;

              img {
                display: block;
                width: 24px;
                height: 24px;
                margin-right: 8px;
                float: left;
                opacity: 0.8;
              }

              figcaption {
                display: block;
                text-align: left;
              }
            }
          }
        }
      }
    }

    // Afterword
    .yellow_back {
      background-color: $yellow;

      section#afterword {
        padding: 128px 24px 112px 24px;
        max-width: 1272px;
        margin: 0 auto;

        @media #{$portrait-tablet-width} {
          padding: 80px 24px 80px 24px;
        }

        @media #{$mobile-width} {
          padding: 48px 20px 72px 20px;
        }

        h2 {
          @media #{$portrait-tablet-width} {
            margin-bottom: 0;
          }
        }

        a.portable {
          margin-top: 24px;
          display: block;

          &:hover {
            opacity: 0.7;
            transition: all 0.5s;
          }

          &:active {
            opacity: 0.3;
            transition: all 0.5s;
          }

          &:visited {
            opacity: 1;
            transition: all 0.5s;
          }

          span {
            color: #727272;
          }

          @media #{$mobile-width} {
            display: none;
          }
        }
      }
    }

    .share-lunacy {
      background-color: #e0e0e0;
      padding: 2rem 0;
    }

    // Comments
    .white_back {
      background-color: $white;

      .position_class {
        position: relative;
        padding: 0 24px 0 24px;
        max-width: 1272px;
        margin: 0 auto;

        @media #{$mobile-width} {
          padding: 0 20px 0 20px;
        }
      }

      section#comments_header {
        margin: 0 auto;
        overflow: hidden;
        cursor: pointer;
        padding: 24px 0 24px 0;

        @media #{$mobile-width} {
          padding: 16px 0 16px 0;
        }

        h3 {
          line-height: 2.5rem;
          display: block;
          float: left;
          margin: 0;
        }

        figure {
          display: block;
          overflow: hidden;
          float: right;
          margin: 8px 0 0 8px;

          img {
            display: block;
            float: left;
            width: 24px;
            height: 24px;
          }

          figcaption {
            display: block;
            float: left;
            font-weight: $bold;
            color: $red;
            font-size: $small;

            @media #{$mobile-width} {
              margin-top: 4px;
            }
          }
        }
      }

      section#comments_body {
        margin: 0 auto;
        text-align: left;
        padding: 24px 0 128px 0;

        @media #{$mobile-width} {
          padding: 24px 0 72px 0;
        }

        .app-comments {

          .Comment__container--1XV1c {

            .CommentDateLink__link--2jEjE {
              opacity: 0.5;
            }
          }

          .jcCommentsHeader {
            position: absolute;
            top: 24px;
            right: 24px;

            @media #{$mobile-width} {
              top: 17px;
            }

            h3 {
              font-weight: 700;
              color: #F85555;
              font-size: $base;
            }

          }

          .UserPic__link--2jzzp {
            padding: 4px 0 0 0;
          }

          p {
            font-size: $base;
            line-height: 1.5rem;
            margin-top: 0;

            @media #{$mobile-width} {
              font-size: $small;
              line-height: 1.5rem;
              padding: 0;
            }

          }

          .jcSendCommentButton {
            font-size: $small;
            text-align: center;
            color: $white;
            width: 116px;
            height: 32px;
            background-color: $red;
            border-radius: 3px;
            border-style: none;
            text-decoration: none;
            text-shadow: none;

            &:hover {
              background-color: #E74040;
              color: #FFE8E8;
              transition: all 0.5s;
            }
          }
        }
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }
</style>
