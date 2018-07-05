<template lang="pug">
  .effect-options-overlay
    .effect-options-field(v-if="!platform.isColor && icons")
      label {{ $t('WEB_APP.EFFECT.COLOR') }}
      color-picker(
        v-model="params.color"
        tooltip="Stroke color"
        v-bind:show-color="true"
      )
    .grid(v-bind:class="{'is-alone': platform.isColor}")
      .icon(
        v-for="(icon, index) in platformIcons"
        v-bind:key="index"
        v-on:click="selectIcon(index)"
      )
        app-icon.is-small(
          v-bind:svg="icon"
          v-bind:class="{'is-active': selectedIcon === index}"
        )
</template>

<script>
  import effect from './index'

  export default {
    name: 'effectOptionsOverlay',
    props: {
      icon: {
        'default': {}
      },
      platform: {
        'default': {
          isColor: true
        }
      }
    },
    data () {
      return {
        selectedIcon: undefined,
        icons: undefined,
        params: Object.assign({showHelpers: true}, effect.params)
      }
    },
    computed: {
      platformIcons () {
        if (!this.icons) {
          return {}
        }
        const platform = this.icon.platform || 'color'
        let overlays = this.icons[platform]
        if (platform === 'office') {
          overlays = overlays[40]
        }
        return overlays
      }
    },
    mounted () {
      import(/* webpackChunkName: "effects" */ './icons').then(icons => {
        this.icons = icons.default
      }).catch(error => {
        console.error('Failed to load overlay icons', error)
      })
    },
    watch: {
      'params.id' () {
        console.log('this.params.id', this.params.id)
        effect.activate(this.params)
      },
      'params.color' () {
        effect.activate(this.params)
      }
    },
    methods: {
      selectIcon (index) {
        this.selectedIcon = index
        this.params.id = index
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../../../assets/css/variables';

  .effect-options-overlay {
    position: relative;
    height: 100%;

    .grid {
      position: absolute;
      top: 3rem;
      left: 0;
      bottom: 0;
      padding: 0.5rem 0;
      overflow-y: auto;
      display: flex;
      flex-flow: row wrap;
      justify-content: center;

      &.is-alone {
        top: 0;
      }
    }

    & /deep/ .app-icon {
      cursor: pointer;
      border: 2px solid transparent;

      &:hover {
        border: 2px solid $color-grey-light;
        border-radius: 5px;
      }
      &.is-active {
        border: 2px solid $color-blue;
        border-radius: 5px;
      }
    }
  }
</style>
