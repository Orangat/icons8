<template lang="pug">
.categories
  .categories-header(v-if="showSwitchBtn && isShowingSearch")
    .categories-header__switch(v-if="showSwitchBtn" v-bind:class="{'active-border': isShowCategories}")
      svg(v-on:click="switchCategories" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24" class="icon")
        g(id="surface1")
          path(style=" " d="M 4 4 L 4 8 L 8 8 L 8 4 Z M 10 4 L 10 8 L 14 8 L 14 4 Z M 16 4 L 16 8 L 20 8 L 20 4 Z M 4 10 L 4 14 L 8 14 L 8 10 Z M 10 10 L 10 14 L 14 14 L 14 10 Z M 16 10 L 16 14 L 20 14 L 20 10 Z M 4 16 L 4 20 L 8 20 L 8 16 Z M 10 16 L 10 20 L 14 20 L 14 16 Z M 16 16 L 16 20 L 20 20 L 20 16 Z ")
    h2(v-bind:class="{'product-name': fugue}"
       v-on:click="closeCategoriesAndSearch")
      nuxt-link(v-bind:to="'/'" v-if="fugue")
        svg.logo.logo--black(xmlns="http://www.w3.org/2000/svg")
          path(d="M4.484 27.406H0V5h15.688v4.484H4.483v4.485h6.72v4.484h-6.72v8.953zm31.172-3.953c0 1.24-.234 2.404-.703 3.492a8.96 8.96 0 0 1-1.922 2.844 9.12 9.12 0 0 1-2.851 1.914 8.735 8.735 0 0 1-3.492.703 8.735 8.735 0 0 1-3.493-.703 9.026 9.026 0 0 1-2.843-1.914 9.026 9.026 0 0 1-1.915-2.844 8.735 8.735 0 0 1-.703-3.492V10h4.47v13.453c0 .615.116 1.193.35 1.735a4.54 4.54 0 0 0 .962 1.421c.406.407.882.727 1.43.961a4.376 4.376 0 0 0 1.741.352c.615 0 1.196-.117 1.743-.352a4.515 4.515 0 0 0 1.43-.96 4.54 4.54 0 0 0 .96-1.422 4.32 4.32 0 0 0 .352-1.735V10h4.484v13.453zm21.719 1.688a11.5 11.5 0 0 1-7.484 2.75c-1.063 0-2.086-.138-3.07-.414a11.479 11.479 0 0 1-2.758-1.172 11.952 11.952 0 0 1-2.344-1.813 11.286 11.286 0 0 1-1.813-2.344c-.5-.859-.888-1.783-1.164-2.773a11.402 11.402 0 0 1-.414-3.078c0-1.063.138-2.083.414-3.063.276-.979.664-1.898 1.164-2.757.5-.86 1.104-1.641 1.813-2.344a11.718 11.718 0 0 1 2.343-1.805 11.67 11.67 0 0 1 2.758-1.164 11.317 11.317 0 0 1 3.07-.414 11.5 11.5 0 0 1 7.484 2.75l-2.343 3.906a7.52 7.52 0 0 0-2.343-1.617 6.854 6.854 0 0 0-2.797-.586 6.82 6.82 0 0 0-2.758.563 7.344 7.344 0 0 0-2.258 1.523 7.18 7.18 0 0 0-1.531 2.25 6.82 6.82 0 0 0-.563 2.758c0 .99.188 1.917.563 2.781a7.25 7.25 0 0 0 1.531 2.266 7.276 7.276 0 0 0 2.258 1.531 6.82 6.82 0 0 0 2.758.563c.562 0 1.109-.068 1.64-.204a7.546 7.546 0 0 0 1.516-.562v-6.375h4.328v8.844zM78.5 13.453c0 1.24-.234 2.404-.703 3.492a8.96 8.96 0 0 1-1.922 2.844 9.12 9.12 0 0 1-2.852 1.914 8.735 8.735 0 0 1-3.492.703 8.735 8.735 0 0 1-3.492-.703 9.026 9.026 0 0 1-2.844-1.914 9.026 9.026 0 0 1-1.914-2.844 8.735 8.735 0 0 1-.703-3.492V0h4.469v13.453c0 .615.117 1.193.351 1.735a4.54 4.54 0 0 0 .961 1.421c.407.407.883.727 1.43.961a4.376 4.376 0 0 0 1.742.352c.615 0 1.196-.117 1.742-.352a4.515 4.515 0 0 0 1.43-.96 4.54 4.54 0 0 0 .961-1.422 4.32 4.32 0 0 0 .352-1.735V0H78.5v13.453zm3.89 13.953h15.36V5H82.39v4.484h10.876v4.485h-7.36v4.484h7.36v4.469H82.39v4.484z" fill-rule="evenodd")
      span(v-if="!fugue") {{title}}
    search(v-if="isShowingSearch")
  div(v-if="toggleCategories" v-bind:class="{'categories-list-wrapper': !mainPage}")
    div(v-bind:class="{'container': !mainPage}")
      h3.categories__subtitle(v-if="subtitle") {{subtitle}}
      categories-list.categories-list--desktop(v-bind:categories="getCategories"
                                 v-bind:link="link")
      categories-list.categories-list--3(v-bind:categories="getCategoriesFor3"
                                 v-bind:link="link")
      categories-list.categories-list--mobile(v-bind:categories="getCategoriesForMobile"
                                 v-bind:link="link")
      .categories__close(v-if="!mainPage" v-on:click="closeCategoriesAndSearch")
        svg(xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24" class="icon icons8-delete")
          g(id="surface1")
            path(d="M 5.625 4.21875 L 4.21875 5.625 L 10.59375 12 L 4.21875 18.375 L 5.625 19.78125 L 12 13.40625 L 18.375 19.78125 L 19.78125 18.375 L 13.40625 12 L 19.78125 5.625 L 18.375 4.21875 L 12 10.59375 Z ")
</template>

<script>
import axios from 'axios'
import { mapState, mapMutations } from "vuex";


export default {
  name: 'categories',
  props: {
    categories: Array,
    title: String,
    showListCategories: {
      type: Boolean,
      default: false
    },
    link: {
      type: String,
      required: true
    },
    fugue: {
      type: Boolean,
      default: false
    },
    mainPage: {
      type: Boolean,
      default: false
    },
    subtitle: String,
    showSwitchBtn: {
      type: Boolean,
      default: false
    },
    isShowingSearch: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      toggleCategories: this.showListCategories
    }
  },
  computed: {
    ...mapState({
      isShowCategories: state => state.isShowCategories,
      isShowSearch: state => state.isShowSearch,
      isShowModalOverlay: state => state.isShowModalOverlay
    }),
    categoriesWithTracks() {
      return this.categories.filter(category => category.tracks_count > 0)
    },
    getCategories() {
      if(!this.categories) return []
      return splitBy(this.categoriesWithTracks, 4)
    },
    getCategoriesFor3() {
      if(!this.categories) return []
      return splitBy(this.categoriesWithTracks, 3)
    },
    getCategoriesForMobile() {
      if(!this.categories) return []
      return splitBy(this.categoriesWithTracks, 1)
    }
  },
  methods: {
    ...mapMutations({
      showCategories: "SHOW_CATEGORIES",
      hideCategories: "HIDE_CATEGORIES",
      showSearch: "SHOW_SEARCH",
      hideSearch: "HIDE_SEARCH",
      showModalOverlay: "SHOW_MODAL",
      hideModalOverlay: "HIDE_MODAL"
    }),
    switchCategories() {
      if (this.isShowSearch === true) {
        this.toggleCategories = !this.toggleCategories
      } else {
        this.toggleCategories = !this.toggleCategories
        if (this.toggleCategories === true) {
        this.showCategories()
        this.showModalOverlay()
        document.body.style.overflowY = 'hidden'
        document.documentElement.style.overflowY = 'hidden'
      } else {
        this.hideCategories()
        this.hideModalOverlay()
        document.body.style.overflowY = ''
        document.documentElement.style.overflowY = ''
        }
      }
    },
    closeCategoriesAndSearch() {
      this.toggleCategories = false
      this.hideCategories()
      this.hideSearch()
      this.hideModalOverlay()
      document.body.style.overflowY = ''
      document.documentElement.style.overflowY = ''
    }
  }
}

function splitBy (innerArr, count) {
  var arr = innerArr.slice()
  var result = []
  var arrLength = arr.length
  var groupLength = Math.floor(arrLength/count)
  for( var i=0; i<count; i++) {
    result.push(arr.splice(0, groupLength))
  }
  return result
}
</script>

<style lang="scss">
@import "../assets/css/helpers/variables.scss";
@import "../assets/css/helpers/mixins.scss";

.categories {
  .categories-header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 56px;
  }

  .categories-header__switch {
    border-bottom: 2px solid transparent;
  }

  .categories-list-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    background-color: white;
  }
  .categories-list--desktop {
    @media (max-width: 720px) {
      display: none;
    }
    @media (max-width: $responsive-mobile) {
      display: none;
    }
  }

  .categories-list--3 {
    display: none;
    @media (max-width: 720px) {
      display: flex;
    }
    @media (max-width: $responsive-mobile) {
      display: none;
    }
  }

  .categories-list--mobile {
    display: none;
    @media (max-width: $responsive-mobile) {
      display: flex;
    }
  }

  .categories__title {
    position: relative;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    font-size: 24px;
    font-weight: 700;
    line-height: 1.25;
    margin: 0;

    span {
      margin-right: 48px;
      color: #7E7E7E;
      cursor: pointer;
    }
  }

  .categories__subtitle {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 24px;
    font-weight: 700;
    line-height: 1.25;
    margin: 0;
    margin-top: 40px;
    
  }

  .categories__close {
    text-align: center;
    margin-bottom: 8px;
  }
}
</style>

