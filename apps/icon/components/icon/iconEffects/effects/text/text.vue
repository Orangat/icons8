<template lang="pug">
  .effect-options-text
    .effect-options-field
      input(v-model="params.text" ref="text")

    .effect-options-field.is-no-padding
      app-select(
        v-model="params.font"
        v-bind:options="fonts"
        v-bind:title-key="'title'"
        v-bind:value-key="'name'"
      )

    .effect-options-field
      .effect-options-text-bold(
        v-bind:class="{'is-active': params.isBold}"
        v-on:click="params.isBold = !params.isBold"
        v-html="effect.$.icons.bold"
      )
      .effect-options-text-bold(
        v-bind:class="{'is-active': params.isItalic}"
        v-on:click="params.isItalic = !params.isItalic"
        v-html="effect.$.icons.italic"
      )
      color-picker(
        v-model="params.color"
        tooltip="Text color"
        v-bind:show-color="true"
      )

    .effect-options-field
      label {{ $t('WEB_APP.EFFECT.TEXT_SIZE') }}
      range-input(
        v-bind:min="min"
        v-bind:max="max"
        suffix=" px"
        v-model="params.size"
      )
</template>

<script>
  import effect from './index'

  export default {
    name: 'effectOptionsText',
    data () {
      return {
        params: Object.assign({showHelpers: true}, effect.params),
        min: 4,
        max: 200,
        fonts: [{
          name: 'Roboto',
          title: 'Roboto'
        }, {
          name: 'RobotoCondensed',
          title: 'Roboto Condensed'
        }, {
          name: 'RobotoSlab',
          title: 'Roboto Slab',
          noItalic: true
        }, {
          name: 'PTSans',
          title: 'PT Sans'
        }, {
          name: 'PTSerif',
          title: 'PT Serif'
        }],
        effect
      }
    },
    watch: {
      'params.text' () {
        effect.activate(this.params)
      },
      'params.font' () {
        console.log('this.font', this.params.font)
        effect.activate(this.params)
      },
      'params.isBold' () {
        console.log('this.isBold', this.params.isBold)
        effect.activate(this.params)
      },
      'params.isItalic' () {
        console.log('this.isItalic', this.params.isItalic)
        effect.activate(this.params)
      },
      'params.color' () {
        console.log('this.color', this.params.color)
        effect.activate(this.params)
      },
      'params.size' () {
        effect.activate(this.params)
      }
    },
    activated () {
      this.$refs.text.focus()
    }
  }
</script>

<style lang="scss">
  .effect-options-text-bold {
    display: inline-block;
    width: 32px;
    height: 32px;
    margin-top: 0.5rem;
    cursor: pointer;

    &>svg {
      fill: #b2b2b2;
      transition: all 0.3s ease;
    }

    &.is-active {
      &>svg {
        fill: #000;
      }
    }
  }
</style>
