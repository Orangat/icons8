<template lang="pug">
  .categories-list
      ul(v-for="group in categories")
        li.categories-list__item(v-for="category in group" v-on:click="closeModalOverlay")
          nuxt-link.categories-list__link(v-bind:to="link + category.pretty_id") {{category.title}}
            span.categories-list__index {{category.tracks_count}}
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: 'categoriesList',
  props: {
      categories: Array,
      link: String
  },
  computed: {
    ...mapState({
      isShowModalOverlay: state => state.isShowModalOverlay
    })
  },
  methods: {
    ...mapMutations({
      hideModalOverlay: "HIDE_MODAL",
    }),
    closeModalOverlay() {
      this.hideModalOverlay()
      document.body.style.overflowY = ''
      document.documentElement.style.overflowY = ''
    }
  }
}
</script>

<style lang="scss">
@import "../assets/css/helpers/variables.scss";
@import "../assets/css/helpers/mixins.scss";

.categories-list {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding-bottom: 40px;
    padding-top: 56px;

    @media (max-width: $responsive-mobile) {
      padding-top: 24px;
      padding-bottom: 16px;
    }
  
  


  .categories-list__item {
    text-align: left;
    margin-bottom: 16px;
  }

  .categories-list__link {
    color: $color-body;
    @include transition(all);

    &:hover {
      color: $color-link-hover;
    }
  }

  .categories-list__link:hover .categories-list__index {
    color: $color-link-hover;
  }

  .categories-list__index {
    font-size: 8px;
    padding-left: 4px;
    vertical-align: top;
    color: #918e8a;
    @include transition(all);
  }
}
</style>


