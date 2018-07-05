<template lang="pug">
  .app-expand(v-bind:class="toggleClasses")
    .title(v-on:click="toggle") {{ title }}
    .toggle(v-html="arrow" v-on:click="toggle")
    transition(name="app-expand" mode="in-out")
      .content(v-if="active")
        slot
</template>

<script>
  import arrow from '../../assets/svg/arrow-down.svg'

  export default {
    name: 'appExpand',
    serverCacheKey: props => JSON.stringify(props),
    props: {
      title: {
        type: String
      },
      open: {
        type: Boolean,
        'default': false
      }
    },
    data () {
      return {
        active: false,
        arrow
      }
    },
    created () {
      this.active = this.open
    },
    computed: {
      toggleClasses () {
        return {
          'is-open': this.active
        }
      }
    },
    methods: {
      toggle () {
        this.active = !this.active
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/css/variables';
  @import '../../assets/css/breakpoints';

  .app-expand {
    position: relative;
    user-select: none;
    transition: all 0.4s ease;
    border-bottom: 1px solid #363250;

    &.is-open {
      background: #363250;
      .toggle {
        & /deep/ svg {
          transform: rotate(0deg);
        }
      }
    }

    .toggle {
      & /deep/ svg {
        transform: rotate(-90deg);
      }
    }

    .title {
      height: 44px;
      line-height: 44px;
      padding: 0 0.5rem 0 1rem;
      font-weight: 400;
      color: #fff;
      opacity: 0.4;
      text-transform: uppercase;
      letter-spacing: 2px;
      cursor: pointer;
      transition: all 0.4s ease;
      font-size: 12px;

      &:hover {
        background: rgba(96,96,156,1);
      }
    }

    .toggle {
      position: absolute;
      top: 9px;
      right: 16px;

      & /deep/ svg {
        transition: all 0.5s ease;
        fill: currentColor;
        width: 11px;
        height: 11px;
      }
    }

    .content {
      user-select: all;
      min-height: 16px;
      background: #363250;

      // transition
      &.app-expand-enter-active,
      &.app-expand-leave-active {
        max-height: 1500px;
        transition: all 0.8s ease, opacity 0.4s 0.2s ease;
      }
      &.app-expand-enter,
      &.app-expand-leave-to {
        min-height: 0;
        max-height: 0;
        overflow: hidden;
        opacity: 0;
        transition: all 0.5s ease, opacity 0.3s ease;
      }

      & /deep/ .list {
        padding-top: 0;
        background: #363250;
        color: white;

        &>.list-item{
          padding: 0 0.5rem 0 .8rem;
          line-height: 2.2rem;
          opacity: .9;
          width: 96%;
          margin: 0 auto;
          border-radius: 3px;

          &:hover {
            background-color: rgba(96,96,156,1);
          }
          &.is-active {
            background-color: #5CA3FD;
          }
        }
      }
    }
  }

</style>
