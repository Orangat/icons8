<template lang="pug">
  .object-sidebar
    template(v-if="relatedElements && relatedElements.length")
      .title Related Items
      .list
        .item.transparent-background(
          v-for="el in relatedElements"
          v-bind:key="el.id"
          v-on:click="selectElement(el)"
          v-bind:class="{'is-active': element && el.id === element.id, 'is-loading': el.isLoading}"
        )
          img(v-bind:src="el.thumb")
</template>

<script>
  import photosApi from '../api/photos'
  import { mapActions, mapMutations } from 'vuex'

  export default {
    name: 'objectSidebar',
    props: {
      element: Object
    },
    data ()  {
      return {
        relatedElements: []
      }
    },
    computed: {
      isModel () {
        return this.element && this.element.isModel
      },
      isObject () {
        return this.element && this.element.isObject
      }
    },
    watch: {
      element (newVal, oldVal) {
        if (newVal !== oldVal && newVal) {
          this.loadRelatedElements()
            .then(response => {
              if (this.isObject) {
                this.relatedElements = response.objects
              }
              if (this.isModel) {
                this.relatedElements = response.models
              }
              this.relatedElements.forEach(element => {
                element.isObject = this.isObject
                element.isModel = this.isModel
                element.url = element.asset.url
                element.thumb = element.thumb1x.url
                element.isLoading = false
                if (!element.point) {
                  element.point = {}
                  element.point.x = 0.5
                  element.point.y = 1
                }
              })
            })
            .catch(error => {
              console.log('error', error)
            })
        } else {
          this.relatedElements = []
        }
      }
    },
    methods: {
      loadRelatedElements () {
        if (this.isObject) {
          return photosApi.relatedObjects(this.element)
        }
        if (this.isModel) {
          return photosApi.relatedModels(this.element)
        }
      },
      selectElement (item) {
        this.$emit('element-changed', item)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/css/mixins';

  $sidebar-width: 274px;
  $sidebar-color: #3b3b3b;
  .object-sidebar {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: $sidebar-width;
    color: #c4c4c4;
    background-color: $sidebar-color;
    font-size: 12px;
    font-weight: 500;
    overflow-y: auto;

    h1 {
      text-align: left;
      font-weight: 700;
      font-size: 20px;
      margin-left: 8px;
      color: #c4c4c4;
    }
  }

  .title {
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin: 16px 0 0 8px;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    margin: 3px;
  }

  .item {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    vertical-align: top;
    width: 80px;
    height: 80px;
    margin: 4px;
    border: 1px solid $sidebar-color;
    border-radius: 3px;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s ease;

    &:hover, &.is-active {
      box-shadow: inset 0 0 2px white;
    }
    &.is-loading {
      @include loading(#4a90e2, 3px);
      &:after {
        z-index: 1;
      }
      &:before {
        content: '';
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255,255,255,0.6);
      }
    }

    &>img {
      width: 100%;
      min-height: 100%;
      object-fit: cover;
      transition: 0.3s all ease;
    }
  }
</style>
