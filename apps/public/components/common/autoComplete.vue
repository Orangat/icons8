<template lang="pug">
  .auto-complete
    input.auto-complete-input(
      aria-label="Search"
      v-bind:placeholder="placeholder"
      v-bind:value="value"
      v-on:input="updateValue($event.target.value)"
      v-on:keyup.13="submit"
      v-on:keyup.up="prevOption"
      v-on:keyup.down="nextOption"
    )
    transition(name="slide-down")
      .panel.auto-complete-list(v-if="isOptionsShown && options && options.length")
        .list
          .list-item(
            v-for="(option, index) in options"
            v-on:click="selectOption(index)"
            v-bind:class="{'is-active': index === activeIndex}"
        ) {{ option }}
</template>

<script>
  export default {
    name: 'autoComplete',
    props: {
      value: {
        'default': ''
      },
      options: Array,
      placeholder: String
    },
    data () {
      return {
        input: undefined,
        isOptionsShown: false,
        activeIndex: -1
      }
    },
    watch: {
      options () {
        this.activeIndex = -1
      }
    },
    mounted () {
      this.input = this.$el.childNodes[0]
      document.documentElement.addEventListener('click', this.outsideClick, false)
    },
    beforeDestroy () {
      document.documentElement.removeEventListener('click', this.outsideClick, false)
    },
    methods: {
      updateValue (value) {
        this.$emit('input', value)
        this.$emit('suggest', value)
        this.isOptionsShown = true
      },
      submit () {
        if (this.isOptionsShown) {
          this.selectOption(this.activeIndex)
        }
        this.$emit('submit')
      },
      selectOption (index) {
        let option = this.options[index]
        if (option) {
          this.$emit('input', option)
        }
        this.input.focus()
        this.isOptionsShown = false
      },
      nextOption () {
        this.activeIndex++
        if (this.activeIndex >= this.options.length) {
          this.activeIndex = 0
        }
      },
      prevOption () {
        this.activeIndex--
        if (this.activeIndex < 0) {
          this.activeIndex = this.options.length - 1
        }
      },
      outsideClick (e) {
        if (!this.$el.contains(e.target)) {
          this.isOptionsShown = false
        }
      }
    }
  }
</script>

<style lang="scss">
  .auto-complete {
    position: relative;
    border-radius: 6px;
    background: rgba(243, 243, 243, 0.98);

    .auto-complete-input {
      position: relative;
      z-index: 1;
    }
    .auto-complete-list {
      position: absolute;
      z-index: 1;
      width: 100%;
      transition: 0.3s all ease;

      opacity: 1;
      transform: translateY(0);
    }
  }

  // transition
  .slide-down-enter-active,
  .slide-down-leave-active {
    transition: all 0.3s ease-in-out;
  }
  .slide-down-enter,
  .slide-down-leave-to {
    opacity: 0;
    transform: translateY(-16px) scale(0.97);
  }
</style>
