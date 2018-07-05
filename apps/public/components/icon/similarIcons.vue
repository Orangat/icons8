<template lang="pug">
  .similar-icons
    template(v-if="icon && icon.variants && !isIconLoading")
      template(v-if="navigate")
        nuxt-link.similar-icons-icon(
          v-for="variant in objectVariants"
          v-bind:key="variant.id"
          v-bind:to="getUrl(variant)"
          v-on:click.native="loading(variant)"
          v-bind:class="{'is-loading': isLoading === variant.id}"
          v-if="needToShow(variant)"
        )
          app-icon(
            v-bind:icon="variant"
            v-bind:custom-size="36"
            v-bind:lazy="false"
          )
          | {{ getPlatformTitle(variant) }}
          div.ios-turn-on-off(v-if="variant.platform === 'ios7'")
            input.switch.is-mini(
              type="checkbox"
              id="ios.fill"
              v-model="iosFilled"
            )
            label(for="ios.fill" v-on:click.stop.prevent="selectIos(variant)")
            br
            label(for="ios.fill" v-on:click.stop.prevent="selectIos(variant)") {{ $t('WEB_APP.EFFECT.FILL') }}

      template(v-if="!navigate")
        .similar-icons-icon(
          v-for="variant in objectVariants"
          v-bind:key="variant.id"
          v-on:click="select(variant)"
          v-bind:class="{'is-active': current === variant}"
          v-if="needToShow(variant)"
        )
          app-icon(
            v-bind:icon="variant"
            v-bind:custom-size="36"
          )
          | {{ getPlatformTitle(variant) }}
          div.ios-turn-on-off(v-if="variant.platform === 'ios7'")
            input.switch.is-mini(
              type="checkbox"
              id="ios.fill"
              v-model="iosFilled"
            )
            label(for="ios.fill" v-on:click.stop)
            br
            label(for="ios.fill" v-on:click.stop) {{ $t('WEB_APP.EFFECT.FILL') }}
</template>

<script>
  import utils from '~/plugins/utils'

  import { mapState } from 'vuex'

  export default {
    name: 'similarIcons',
    serverCacheKey: props => props.icon.id,
    props: {
      icon: {
        type: Object
      },
      isIconLoading: {
        'default': false
      },
      navigate: {
        type: Boolean,
        'default': true
      }
    },
    data () {
      return {
        iosFilled: false,
        isLoading: false,
        current: false
      }
    },
    computed: {
      ...mapState({
        platforms: state => state.appInfo.platforms
      }),
      variants () {
        if (this.icon && this.icon.variants) {
          let variants = this.icon.variants
          return variants.sort((a, b) => {
            let platformA = this.platforms[a.platform]
            let platformB = this.platforms[b.platform]
            if (platformA && platformB) {
              return platformA.order - platformB.order
            } else {
              return true
            }
          })
        } else {
          return []
        }
      },
      objectVariants () {
        const obj = {}
        this.variants.forEach(variant => {
          if (variant.filled) {
            obj[variant.platform + 'Filled'] = variant
          } else {
            obj[variant.platform] = variant
          }
        })
        return obj
      }
    },
    created () {
      this.initCurrent()
    },
    watch: {
      $route () {
        this.isLoading = false
      },
      icon (newValue, oldValue) {
        if (newValue.commonId !== oldValue.commonId) {
          this.initCurrent()
        }
      },
      iosFilled () {
        let variant = this.objectVariants[`ios7${this.iosFilled ? 'Filled' : ''}`]
        this.select(variant)
      }
    },
    methods: {
      getUrl (icon) {
        return utils.getIconUrl(icon)
      },
      getPlatformTitle (icon) {
        const platform = this.platforms[icon.platform] || {}
        return this.$t(`PLATFORMS.${platform.apiCode}`, platform.title)
      },
      initCurrent () {
        this.variants.some(variant => {
          if (variant.id === this.icon.id) {
            this.current = variant
            if (variant.filled) this.iosFilled = true
            return true
          }
        })
      },
      needToShow (variant) {
        return variant.platform !== 'ios7' ||
          (variant.platform === 'ios7' && !!variant.filled === this.iosFilled)
      },
      loading (icon) {
        if (this.icon.id !== icon.id) {
          this.isLoading = icon.id
        }
      },
      select (variant) {
        this.current = variant
        this.$emit('select', variant)
      },
      selectIos (variant) {
        this.iosFilled = !this.iosFilled
        this.$router.push({
          path: this.getUrl(this.objectVariants[`ios7${this.iosFilled ? 'Filled' : ''}`])
        })
      }
    }
  }
</script>

<style lang="scss">
  @import '../../assets/css/variables';
  @import '../../assets/css/breakpoints';
  @import '../../assets/css/mixins';

  .similar-icons {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: $similar-icons-width;
    background-color: #fafafa;
    box-shadow: inset 1px 0 0 0 #ececec;
    overflow-y: auto;
    overflow-x: hidden;

    &.is-responsive {
      @media (max-width: $responsive-app) {
        position: static;
        width: 100%;
        margin-top: 16px;
        padding-bottom: 4px;
        box-shadow: none;
        text-align: center;

        &>.similar-icons-icon {
          display: inline-block;
          padding: 8px 0 0;
          width: $similar-icons-width - 20px;
          height: $similar-icons-width - 20px;
          &.is-active {
            background-color: white;
            border-radius: 6px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.15);
          }
        }
      }
    }

    &>.similar-icons-icon {
      position: relative;
      display: block;
      padding: 12px 0 8px;
      width: $similar-icons-width;
      cursor: pointer;
      text-decoration: none;
      transition: 0.3s all ease;
      text-align: center;
      font-size: 12px;
      color: inherit;
      border: none;

      &:hover {
        background-color: #f4f4f4;
      }
      &.is-active {
        background-color: white;
        box-shadow: inset 2px 0 0 0 #1a7cf9, inset 0 -1px 0 0 #ececec, inset 0 1px 0 0 #ececec;
      }
      &.is-loading {
        @include loading($size: 32px);
        &>.app-icon {
          opacity: 0.1;
        }
      }

      .switch.is-mini+label {
        padding-left: 28px;
        font-size: 16px;
      }
      label {
        cursor: pointer;
      }

      .app-icon {
        margin: 0 auto 8px;
        width: 36px;
        height: 36px;
      }
    }
  }
</style>
