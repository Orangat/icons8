<template lang="pug">
    app-popup.app-select
      .app-select-content
        | {{ getTitle(currentOption) }}
      div(slot="content")
        .list
          .list-item(
            v-for="option in options"
            v-on:click="selectOption(option)"
            v-on:keyup.up="prevOption"
            v-on:keyup.down="nextOption"
            v-bind:class="{'is-active': isCurrentOption (option)}"
          ) {{ getTitle(option)}}

</template>

<script>
  export default {
    name: 'appSelect',
    props: {
      value: {
        'default': 'Select'
      },
      options: {
        type: Array,
        'default': ['Select value...']
      },
      titleKey: {
        type: String,
        'default': false
      },
      valueKey: {
        type: String,
        'default': false
      }
    },
    data () {
      return {
        activeIndex: -1
      }
    },
    computed: {
      currentOption () {
        let current = {}
        this.options.some(option => {
          if (this.value === this.getValue(option)) {
            current = option
            return true
          }
        })
        return current
      }
    },
    methods: {
      getTitle (option) {
        if (option === undefined) {
          return undefined
        }
        if (this.titleKey) {
          return option[this.titleKey]
        } else if (option.title !== undefined) {
          return option.title
        } else {
          return this.getValue(option)
        }
      },
      getValue (option) {
        if (option === undefined) {
          return undefined
        }
        if (this.valueKey) {
          return option[this.valueKey]
        } else if (option.value !== undefined) {
          return option.value
        } else {
          return option
        }
      },
      isCurrentOption (option) {
        if (this.getValue(this.currentOption) === this.getValue(option)) {
          return true
        }
      },
      selectOption (option) {
        console.log('option', option)
        this.$emit('input', this.getValue(option))
      },
      nextOption () {
        console.log('this.activeIndex', this.activeIndex)
        this.activeIndex++
        if (this.activeIndex >= this.options.length) {
          this.activeIndex = 0
        }
      },
      prevOption () {
        console.log('this.activeIndex', this.activeIndex)
        this.activeIndex--
        if (this.activeIndex < 0) {
          this.activeIndex = this.options.length - 1
        }
      }
    }
  }
</script>

<style lang="scss">
  .app-select {
    width: 100%;

    &.app-popup {
      .app-popup-toggle {
        width: 100%;
        padding: 0.75rem;
      }
      .app-popup-arrow {
        margin-right: 0.75rem;
      }
      .app-popup-content {
        width: 100%;
      }
    }
  }
</style>
