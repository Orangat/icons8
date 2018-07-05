<template lang="pug">
  .category-list-selector
    category-selector(
      v-for="category in icon.categories"
      v-bind:key="category.id"
      v-bind:icon="icon"
      v-bind:category="category"
    )
    .add(v-on:click="add") Add...
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'categoryListSelector',
    props: {
      icon: Object
    },
    data () {
      return {
        categories: false,
        isLoading: false
      }
    },
    methods: {
      add () {
        this.icon.categories.push({})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .category-list-selector {
    position: relative;
    min-height: 24px;

    &:hover {
      .add {
        opacity: 1;
      }
    }
    .category-selector {
      padding-right: 1.75rem;
    }
    .add {
      position: absolute;
      bottom: 2px;
      right: 0;
      font-weight: 400;
      opacity: 0;
      cursor: pointer;
      transition: 0.3s opacity ease;
    }
  }
</style>
