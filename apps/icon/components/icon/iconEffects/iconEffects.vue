<template lang="pug">
  .icon-effects
    .icon-effects-item(
      v-if="effect.id !== 'Recolor' || isColor || isImported"
      v-for="effect in singleEffects"
      v-html="effect.icon"
      v-on:click="openEffects(effect)"
      v-bind:data-tooltip="$t(effect.tooltip, effect.id)"
      v-bind:class="effectClasses(effect)"
    )
    .icon-effects-item.is-divider
    .icon-effects-item(
      v-for="effect in replaceableEffects"
      v-html="effect.icon"
      v-on:click="openEffects(effect)"
      v-bind:data-tooltip="$t(effect.tooltip)"
      v-bind:class="effectClasses(effect)"
    )
    effects-modal(
      ref="effectsModal"
      v-bind:icon="icon"
      v-on:iconEffected="iconEffected"
    )
</template>

<script>
  import Vue from 'vue'
  import effectsService from './effects/effectsService'

  import { mapState } from 'vuex'

  export default {
    name: 'iconEffects',
    props: {
      icon: Object
    },
    data () {
      return {
        effects: effectsService.effects
      }
    },
    computed: {
      ...mapState({
        platforms: state => state.appInfo.platforms
      }),
      isColor () {
        if (this.icon && this.platforms[this.icon.platform]) {
          return this.platforms[this.icon.platform].isColor
        }
        return false
      },
      isImported () {
        return this.icon.imported
      },
      singleEffects () {
        return Object.keys(this.effects)
          .filter(key => this.effects[key].type === 'single')
          .map(key => this.effects[key])
      },
      replaceableEffects () {
        return Object.keys(this.effects)
          .filter(key => this.effects[key].type === 'replaceable')
          .map(key => this.effects[key])
      }
    },
    methods: {
      colorChanged (color) {
        console.log('color', color)
      },
      openEffects (effect) {
        this.$modal.show('effects-modal')
        Vue.nextTick(() => {
          this.$refs.effectsModal.initEditor(effect)
        })
      },
      effectClasses (effect) {
        return {
          'is-active': effect.enabled,
          [effect.id]: effect.id
        }
      },
      iconEffected (svg) {
        this.$emit('iconEffected', svg)
      }
    }
  }
</script>

<style lang="scss">
  @import '../../../assets/css/variables';

  .icon-effects {
    padding-top: 15px;
    padding-left: 6px;

    .icon-effects-item {
      display: inline-block;
      width: 34px;
      height: 20px;
      text-align: center;
      vertical-align: top;
      cursor: pointer;

      &.is-divider {
        margin: 0 4px;
        width: 1px;
        border-right: 1px solid #c2c2c2;
      }

      &:hover, &.is-active {
        &>svg {
          fill: $color-blue;
        }
      }

      &>svg {
        margin: 0 auto;
        width: 20px;
        height: 20px;
        fill: #c2c2c2;
        transition: 0.3s all ease;
      }

      &.Recolor {
        margin-top: -4px;
        margin-right: 2px;
      }
    }
    .icon-effects-svg {
      fill: white;
    }
  }
</style>
