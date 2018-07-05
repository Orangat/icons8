<template lang="pug">
  .app-tabs
    .app-tabs-header
      .app-tabs-item(
        v-for="(tab, index) in tabs"
        v-on:click="activateTab(index)"
        v-bind:class="{'is-active': tab.isActive}"
      ) {{ tab.title }}
    slot
</template>

<script>
  export default {
    name: 'appTabs',
    data () {
      return {
        tabs: [],
        activeIndex: -1
      }
    },
    methods: {
      activateTab (index) {
        let oldTab = this.tabs[this.activeIndex]
        if (oldTab) {
          oldTab.deactivate()
        }

        this.activeIndex = index

        let newTab = this.tabs[this.activeIndex]
        if (newTab) {
          newTab.activate()
        }

        this.$emit('activate', index)
      }
    },
    mounted () {
      this.tabs = this.$children
      this.tabs.some((tab, index) => {
        if (tab.isActive) {
          this.activeIndex = index
          return true
        }
      })
      this.activateTab(this.activeIndex)
    }
  }
</script>

<style lang="scss">
  @import '../../assets/css/variables';

  .app-tabs {

    .app-tabs-header {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
    }

    .app-tabs-item {
      display: inline-block;
      min-height: 32px;
      height: auto;
      line-height: 30px;
      padding: 0 1rem;
      margin: 3px;
      border: 1px solid $color-grey;
      border-radius: 32px;
      cursor: pointer;
      text-decoration: none;
      color: $color-font-dark;
      white-space: nowrap;
      transition: 0.3s all ease;

      &:hover {
        background-color: #f4f4f4;
      }
      &.is-active {
        background-color: $color-green;
        border-color: $color-green;
        color: white;
      }
    }
  }
</style>
