<template lang="pug">
  .platform-icons(v-if="icons.length || category")
    .app-page-section.is-white.is-pb
      .container
        h1.app-page-title.is-icons {{ $t('WEB_APP.LANDING_TAGS.PLATFORM_TITLE_ICONS', {term: term}) }}
          .icon-title(v-if="previewIcons[0]")
            a(v-bind:href="`${backendUrl}/icon/${previewIcons[0].id}/${previewIcons[0].commonName}`")
              app-icon(
                v-bind:icon="previewIcons[0]"
                v-bind:custom-size="70"
              )
        p.app-page-subtitle.is-icons
          span(v-html="$t('WEB_APP.LANDING_TAGS.DESCRIPTION', {term: term})")
          span.is-lowercase
            template(v-for="n in 4" v-if="previewIcons[n-1]")
              a(v-bind:href="`${backendUrl}/icon/${previewIcons[n-1].id}/${previewIcons[n-1].commonName}`")
                b {{previewIcons[n-1].originName || previewIcons[n-1].name}}
              | ,&nbsp;
            | {{ $t('WEB_APP.ETC')}}.
        p.app-page-subtitle.is-icons
          span(v-html="$t('WEB_APP.LANDING_TAGS.DESCRIPTION_2')")
          a.is-blue.is-dashed.is-show-block(v-on:click="isShowList = !isShowList") {{ $t('WEB_APP.HOW') }}?
        transition(name="animation-features")
          ul.fetures-list(v-if="isShowList")
              li
                app-icon(
                  v-bind:id="62438"
                  v-bind:customSize="56"
                )
                | {{ $t('WEB_APP.LANDING_TAGS.ICONS_FEATURES_1') }}
              li
                app-icon(
                  v-bind:id="11491"
                  v-bind:customSize="56"
                )
                | {{ $t('WEB_APP.LANDING_TAGS.ICONS_FEATURES_2') }}
              li
                app-icon(
                  v-bind:id="62484"
                  v-bind:customSize="56"
                )
                | {{ $t('WEB_APP.LANDING_TAGS.ICONS_FEATURES_3') }}
        .button-wrapper
          a.btn.btn-buy(v-bind:href="licenseUrl") {{ $t('WEB_APP.LANDING_TAGS.SUBSCRIBE', {price: '$19.90'}) }}
          a.btn.btn-app(v-bind:href="appUrl") {{ $t('WEB_APP.LANDING_TAGS.DOWNLOAD') }}
    .icons-block
      .icon(
        v-for="(size, i) in sizes"
        v-if="previewIcons[i]"
        v-bind:class="`icon-${i}`"
      )
        a(v-bind:href="`${backendUrl}/icon/${previewIcons[i].id}/${previewIcons[i].commonName}`")
          app-icon(
            v-bind:icon="previewIcons[i]"
            v-bind:custom-size="size"
          )
</template>

<script>
  import config from '../../../public/plugins/config'

  export default {
    name: 'platformIcons',
    props: {
      term: String,
      icons: {
        type: Array,
        'default' () {
          return []
        }
      },
      category: Object
    },
    data () {
      return {
        isShowList: false,
        backendUrl: config.backendUrl,
        sizes: [
          50, 90, 130, 80, 80,
          50, 50, 80, 35, 40,
          90, 30, 60, 30, 30,
          80, 50, 40, 80, 80,
          80, 50
        ]
      }
    },
    computed: {
      previewIcons () {
        if (this.icons.length) {
          return this.icons
        }
        let icons = [].concat(this.category.subcategory[0].icons)
        if (this.category.subcategory[1]) {
          icons = icons.concat(this.category.subcategory[1].icons)
        }
        return icons
      },
      licenseUrl () {
        return `${config.backendUrl}/paid-license-99/#/`
      },
      appUrl () {
        return `${config.backendUrl}/app`
      }
    }
}
</script>

<style lang="scss" scoped>
  @import "../../../public/assets/css/variables.scss";

  .platform-icons {
    position: relative;
    overflow: hidden;

    .app-page-section {
      &.is-white {
        background-color: white;
      }
    }
    .app-page-section.is-pb {
      padding-top: 164px;
      padding-bottom: 128px;

      @media (max-width: 992px) {
        padding-top: 0;
        padding-bottom: 48px;
      }
    }
    .app-page-title {
      &.is-icons {
        position: relative;
        font-size: 64px;
        font-weight: 400;
        line-height: 1;
        text-align: left;
        margin-left: 0;
        margin-bottom: 24px;
        padding-left: 0;
        text-transform: capitalize;

        @media (max-width: 992px){
          font-size: 48px;
          margin-top: 48px;
        }
      }
    }
    .app-icon:hover {
        transform: scale(1.2) rotate(5deg);
      }
    .icon-title {
      position: absolute;
      top: 50%;
      left: -94px;
      transform: translateY(-50%);

      & .app-icon:hover {
        transform: scale(1.2) rotate(-5deg);
      }

      @media (max-width: 1024px){
        left: -64px;
      }

      @media (max-width: 992px){
        display: none;
      }
      .app-icon {
        margin-bottom: 0;
      }
    }
    .app-page-subtitle {
      &.is-icons {
        font-size: 18px;
        max-width: 700px;
        text-align: left;
        margin-left: 0;
        margin-bottom: 40px;
        padding-left: 0;
        color: black;
      }
    }
    .is-blue {
      color: $color-blue;
    }
    .is-dashed {
      border-bottom: 1px dashed $color-blue;
    }
    .animation-features-enter-active, .animation-features-leave-active {
      transition: all 0.3s ease-in;
    }
    .animation-features-enter, .animation-features-leave-to {
      transform: scale(0.5);
      opacity: 0;
    }

    .is-lowercase {
      text-transform: lowercase;
    }
    .fetures-list {
      display: flex;
      max-width: 640px;
      padding: 0;
      margin: 0;
      margin-bottom: 64px;
      list-style-type: none;

      @media (max-width: 648px) {
        flex-direction: column;
      }

      .app-icon {
        margin-left: -8px;
        margin-bottom: 8px;
      }
      li {
        font-weight: 500;
        margin-right: 40px;
        color: black;
        &:last-child {
          margin-right: 0;
        }

        @media (max-width: 648px) {
          margin-bottom: 8px;
        }
      }
    }

    .icons-block {
      position: absolute;
      top: 0;
      right: 0;

      @media (max-width: 992px) {
        display: none;
      }
    }
    .icon {
      position: absolute;
      top: 0;
      right: 0;
        img {
          height: auto;
        }
    }
    .icon-0 {
      top: 20px;
      right: 105px;
    }
    .icon-1 {
      top: -3px;
      right: 280px;

    }
    .icon-2 {
      top: 220px;
      right: 210px;
    }
    .icon-3 {
      top: 32px;
      right: 444px;
    }
    .icon-4 {
      top: 510px;
      right: 205px;
    }
    .icon-5 {
      top: 160px;
      right: 120px;
    }
    .icon-6 {
      top: 354px;
    }
    .icon-7 {
      top: 68px;
      right: 200px;
    }
    .icon-8 {
      top: 632px;
      right: 316px;
    }
    .icon-9 {
      top: 200px;
      right: 430px;
    }
    .icon-10 {
      top: 390px;
      right: 86px;
    }
    .icon-11 {
      top: 30px;
      right: 635px;
    }
    .icon-12 {
      top: 648px;
    }
    .icon-13 {
      top: 495px;
      right: 30px;
    }
    .icon-14 {
      top: 570px;
      right: 100px;
    }
    .icon-15 {
      top: 240px;
      right: 45px;
    }

    .icon-16 {
      top: 333px;
      right: 145px;
    }
    .icon-17 {
      top: 130px;
      right: 560px;
    }
    .icon-18 {
      top: 390px;
      right: 230px;
    }
    .icon-19 {
      top: 80px;
      right: 20px;
    }
    .icon-20 {
      top: 110px;
      right: 332px;
    }
    .icon-21 {
      top: 200px;
      right: -15px;
    }
  }
</style>

