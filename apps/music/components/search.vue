<template lang="pug">
  .search
      .search__icon(v-on:click="openSearch")
        svg(xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 32 32" class="icon")
          g(id="surface1")
            path(d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z ")
      .search-from(v-if="isShowSearch")
        form
          svg(xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 32 32" class="icon search-from__icon-search")
            g(id="surface1")
              path(d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z ")
          input(class="search-form__line" type="text" placeholder="Search..."
                v-model="searchText"
                v-on:keypress.enter.prevent="checkText")
          .search-from__icon-close(v-on:click="closeSearch")
            svg(xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24" class="icon search-from__icon-close")
              g(id="surface1")
                path(d="M 5.625 4.21875 L 4.21875 5.625 L 10.59375 12 L 4.21875 18.375 L 5.625 19.78125 L 12 13.40625 L 18.375 19.78125 L 19.78125 18.375 L 13.40625 12 L 19.78125 5.625 L 18.375 4.21875 L 12 10.59375 Z ")
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: 'search',
  data() {
    return {
      searchText: ''
    }
  },
  computed: {
    ...mapState({
      isShowCategories: state => state.isShowCategories,
      isShowSearch: state => state.isShowSearch,
      isShowModalOverlay: state => state.isShowModalOverlay
    })
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
    checkText() {
      console.log('searchText', this.searchText)
      this.$router.push({ path: `/search/${this.searchText}` })
    },
    openSearch() {
      this.showSearch()
      this.showModalOverlay()
    },
    closeSearch() {
      if (this.isShowCategories === true) {
        this.hideSearch()
        this.showModalOverlay()
      } else {
        this.hideSearch()
        this.hideModalOverlay()
      }
      this.hideSearch()
    },
  }
}
</script>


<style lang="scss">
@import "../assets/css/helpers/variables.scss";

.search {
  display: flex;
  align-items: center;
  z-index: 5;

  .search-from {
    position: absolute;
    display: flex;
    align-items: center;
    top: 0;
    bottom: 0;
    right: 0;
    width: 32%;
    border-bottom: 2px solid #000000;

    form {
      position: relative;
      width: 100%;
      height: 100%;
    }

    @media (max-width: $responsive-mobile) {
      width: 100%;
    }
  }

  .search__icon {
    text-align: right;
  }

  .search-from__icon-search {
    position: absolute;
    top: 50%;
    left: 4px;
    transform: translateY(-50%);
  }

  .search-from__icon-close {
    position: absolute;
    top: 50%;
    right: 4px;
    transform: translateY(-50%);
  }

  .search-form__line {
    font-size: 16px;
    line-height: 1.1;
    width: 100%;
    height: 100%;
    padding-left: 48px;
    border: none;

    &:focus {
      outline: none;
    }

    &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
      color: $color-placeholder;
    }
    &::-moz-placeholder { /* Firefox 19+ */
      color: $color-placeholder;
    }
    &:-ms-input-placeholder { /* IE 10+ */
      color: $color-placeholder;
    }
    &:-moz-placeholder { /* Firefox 18- */
      color: $color-placeholder;
    }
  }
}
</style>

