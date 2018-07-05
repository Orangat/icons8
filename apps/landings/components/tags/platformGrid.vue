<template lang="pug">
  .platform-grid
    template(v-if="icons.length")
      .icon-grid
        a.icon-wrapper(
          v-for="icon in icons"
          v-bind:href="`${backendUrl}/icon/${icon.id}/${icon.commonName}`"
        )
          app-icon(
            v-bind:icon="icon"
            v-bind:color="iconColor"
            v-bind:custom-size="iconCustomSize"
          )
          .icon-name {{icon.name}}
          .download-icon {{ $t('WEB_APP.SINGLE_ICON.DOWNLOAD_BUTTON') }}

        a.icon-wrapper.is-request(
          v-bind:href="requestUrl"
        )
          .icon-plus-wrapper(v-bind:style="{height: iconCustomSize + 'px'}")
            app-icon(
              v-bind:id="11153"
              v-bind:color="iconPlusColor"
              v-bind:custom-size="56"
            )
          .icon-name {{ $t('WEB_APP.NOTHING_FOUND.REQUEST') }}
          .download-icon.is-request {{ $t('WEB_APP.SINGLE_ICON.DOWNLOAD_BUTTON') }}

    template(v-if="category")
      template(v-for="subcategory in category.subcategory")
        h6.title {{ subcategory.name }}
        .icon-grid
          a.icon-wrapper(
            v-for="icon in subcategory.icons"
            v-bind:href="`${backendUrl}/icon/${icon.id}/${icon.commonName}`"
          )
            app-icon(
              v-bind:icon="icon"
              v-bind:color="iconColor"
              v-bind:custom-size="iconCustomSize"
            )
            .icon-name {{icon.name}}
            .download-icon {{ $t('WEB_APP.SINGLE_ICON.DOWNLOAD_BUTTON') }}

          a.icon-wrapper.is-request(
            v-bind:href="requestUrl"
          )
            .icon-plus-wrapper(v-bind:style="{height: iconCustomSize + 'px'}")
              app-icon(
                v-bind:id="11153"
                v-bind:color="iconPlusColor"
                v-bind:custom-size="56"
              )
            .icon-name {{ $t('WEB_APP.NOTHING_FOUND.REQUEST') }}
            .download-icon.is-request {{ $t('WEB_APP.SINGLE_ICON.DOWNLOAD_BUTTON') }}
    a.all-platform-list.is-blue(
      v-bind:href="iconPlatform.url"
      v-if="iconPlatform"
    ) {{ $t('WEB_APP.LANDING_TAGS.ALL_ICON_LIST', {platform: iconPlatform.fullTitle}) }}


</template>

<script>
  import { mapState } from 'vuex'
  import utils from '~/plugins/utils'
  import config from '../../../public/plugins/config'

  export default {
    name: "platformGrid",
    props: {
      icons: {
        type: Array,
        'default' () {
          return []
        }
      },
      category: {
        type: Object,
        'default': undefined
      },
      platform: String,
      iconColor: String,
      iconPlusColor: String,
      iconCustomSize: Number,
      term: String
    },
    data () {
      return {
        backendUrl: config.backendUrl
      }
    },
    computed: {
      ...mapState({
        platforms: state => state.appInfo ? state.appInfo.platforms : {}
      }),
      iconPlatform () {
        if (this.platform) {
          return this.platforms[this.platform]
        }
        if (!this.icons || this.icons.length === 0) {
          return
        }
        const platformKey = this.icons[0].platform
        if (!platformKey) {
          return
        }
        return this.platforms[platformKey]
      },
      requestUrl () {
        return `${config.backendUrl}/request-icon/free/hot`
      }
    },
    methods: {
      getPlatformIcons (icons) {
        return icons.filter(icon => icon.platform === this.platform)
      }
    }
  };
</script>


<style lang="scss" scoped>
@import "../../../public/assets/css/variables.scss";

.platform-grid {
  margin-bottom: 96px;

  .icon-grid {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 48px;

    @media (max-width: 990px) {
      // justify-content: center;
      align-items: center;
    }

    @media (max-width: 311px) {
      justify-content: center;
    }
  }

  .icon-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 170px;
    height: 170px;
    padding: 8px;

    @media (max-width: 370px) {
      width: 140px;
      height: 140px;
    }

    &:hover {
      .app-icon {
        transform: scale(1.15);
      }

      .download-icon {
        color: $color-blue;
        transform: translateY(4px);
      }
      .download-icon.is-request {
        color: transparent;
      }
    }
    &:after {
      position: absolute;
      content: " ";
      top: -1px;
      right: 0;
      left: -1px;
      bottom: 0;
      border: 1px solid;
    }

    .app-icon {
      margin-bottom: 12px;
    }

    .download-icon {
      font-size: 14px;
      font-weight: 500;
      color: transparent;
      transform: translateY(-8px);
      z-index: 1;
      transition: all 0.25s ease-in;
    }
  }

  .icon-name {
    font-size: 12px;
    text-align: center;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media (max-width: 370px) {
      max-width: 136px;
    }
  }

  .icon-link {
    z-index: 1;
  }

  .all-platform-list {
    position: relative;
    display: inline-block;
    padding-right: 2rem;

    &::before {
      content: "";
      position: absolute;
      top: 12px;
      right: 0;
      width: 24px;
      height: 1px;
      background-color: $color-blue;
    }
    &::after {
      content: "";
      position: absolute;
      top: 9px;
      right: 0;
      width: 7px;
      height: 7px;
      border: 1px solid $color-blue;
      border-top-color: transparent;
      border-left-color: transparent;
      transform: rotate(-45deg);
    }
  }

  .icon-plus-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 12px;

    & .app-icon {
      margin-bottom: 0;
    }
  }

  h6 {
    margin: 2.5rem 0 1rem;
    text-align: left;
    font-weight: 500;
    letter-spacing: normal;
    color: black;
  }
}
</style>
