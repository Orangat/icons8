<template lang="pug">
  .color-picker
    app-popup(
      v-bind:position="position"
      v-bind:show-toggle="false"
      v-on:open="onOpen"
      v-on:close="onClose"
    )
      .color-picker-toggle(
        v-bind:data-tooltip="tooltip"
        v-bind:style="toggleStyle"
      )
      .color-picker-content(slot="content")
        chrome-picker(v-if="isPicker" v-model="computedColor")
        .color-picker-predefined(v-if="!isPicker")
          .color-picker-text grayscale
          .color-picker-colors
            .color-picker-color(
              v-for="color in colorsGray"
              v-on:click.stop="chooseColor(color.color)"
              v-bind:class="{'is-white': color.color === '#ffffff'}"
              v-bind:style="{'background-color': color.color}"
            )
          .color-picker-text color
          .color-picker-colors
            .color-picker-color(
              v-for="color in colors"
              v-on:click.stop="chooseColor(color.color)"
              v-bind:style="{'background-color': color.color}"
            )
              .color-picker-color-second(
                v-on:click.stop="chooseColor(color.colorDark)"
                v-bind:style="{'background-color': color.colorDark}"
              )
          .color-picker-text custom
          input.color-picker-input(v-model="computedColor")

        .color-picker-actions
          .color-picker-toggle(
            v-on:click="isPicker = false"
            v-bind:class="{'is-active': !isPicker}"
            v-bind:style="toggleStyle"
          )
          .color-picker-toggle(
            v-on:click="isPicker = true"
            v-bind:class="{'is-active': isPicker}"
          )
</template>

<script>
  export default {
    name: 'colorPicker',
    components: {
      'chrome-picker': () => import('vue-color').then(({Chrome}) => Chrome)
    },
    props: {
      value: {
        type: String,
        'default': '#000000'
      },
      tooltip: {
        type: String,
        'default': ''
      },
      previewColor: {
        'default': false
      },
      showColor: {
        'default': false
      },
      position: {
        'default': 'bottom-right'
      }
    },
    data () {
      return {
        showChooser: true,
        showPicker: false,
        colorsGray: [
          {color: '#ffffff'},
          {color: '#cccccc'},
          {color: '#666666'},
          {color: '#333333'},
          {color: '#000000'}
        ],
        colors: [
          {color: '#e74c3c', colorDark: '#c0392b'},
          {color: '#e67e22', colorDark: '#d35400'},
          {color: '#f1c40f', colorDark: '#f39c12'},
          {color: '#2ecc71', colorDark: '#27ae60'},
          {color: '#1abc9c', colorDark: '#16a085'},
          {color: '#3498db', colorDark: '#2980b9'},
          {color: '#9b59b6', colorDark: '#8e44ad'},

          {color: '#ecf0f1', colorDark: '#bdc3c7'},
          {color: '#95a5a6', colorDark: '#7f8c8d'},
          {color: '#34495e', colorDark: '#2c3e50'}
        ],
        isPicker: false
      }
    },
    computed: {
      computedColor: {
        get () {
          return this.value
        },
        set (value) {
          // check if color from chrome picker
          if (value.hex) {
            this.computedColor = value.hex
          } else {
            this.$emit('input', value)
          }
        }
      },
      cleanColor () {
        let color = this.computedColor
        if (color && color.indexOf('#') >= 0) {
          color = color.substring(color.indexOf('#') + 1)
        }
        return color
      },
      toggleStyle () {
        if (this.showColor || (this.previewColor && this.cleanColor !== '000000')) {
          return {
            'background': '#' + this.cleanColor,
            'box-shadow': 'inset 0 0 10px rgba(0,0,0,0.2)'
          }
        } else {
          return {}
        }
      }
    },
    methods: {
      chooseColor (color) {
        this.computedColor = color
      },
      onOpen () {
        this.$emit('open')
      },
      onClose () {
        this.$emit('close')
      }
    }
  }
</script>

<style lang="scss">
  @import '../assets/css/variables';

  $color-picker-color-width: 2rem;
  $color-picker-color-margin: 0.25rem;
  .color-picker {
    position: relative;
    display: inline-block;
    width: 1.625rem;
    height: 1.625rem;

    .color-picker-toggle {
      position: relative;
      display: inline-block;
      width: 1.625rem;
      height: 1.625rem;
      background: no-repeat url('data:image/png;base64,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') 50% 50%;
      border-radius: 100%;
      cursor: pointer;
      transition: all 0.3s ease;

      &.is-active {
        &:before {
          content: '';
          position: absolute;
          z-index: -1;
          top: -3px;
          left: -3px;
          right: -3px;
          bottom: -3px;
          border-radius: 50%;
          border: 1px solid rgba(0,0,0,0.15);
        }
      }
    }
    .color-picker-actions {
      float: right;
      margin: 4px 8px;

      .color-picker-toggle {
        margin-left: 8px;
      }
    }

    .color-picker-predefined {
      padding: 12px 8px 0;
      margin-bottom: -1rem;
    }
    .color-picker-text {
      margin: 0 $color-picker-color-margin 0.5rem;
      color: $color-font-dark;
    }
    .color-picker-colors {
      width: $color-picker-color-width * 5 + $color-picker-color-margin * 10;
    }

    .color-picker-color {
      position: relative;
      display: inline-block;
      width: $color-picker-color-width;
      height: $color-picker-color-width;
      margin: 0 $color-picker-color-margin $color-picker-color-margin*2;
      vertical-align: top;
      cursor: pointer;

      &.is-white {
        border: 1px solid #ccc;
      }
    }
    .color-picker-color-second {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 50%;
      cursor: pointer;
    }

    .color-picker-input {
      width: 80px;
      margin: 0 $color-picker-color-margin;
    }

    .vc-chrome {
      font-family: inherit;
      box-shadow: none;
    }
  }
</style>
