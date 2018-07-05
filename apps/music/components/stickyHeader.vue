<template lang="pug">
.sticky-header(id="sticky-header")
  .container
    categories(v-bind:categories="categories"
               v-bind:link="link"
               v-bind:title="'Fugue'"
               v-bind:fugue="true"
               v-bind:mainPage="false"
               v-bind:subtitle="categorySubtitle"
               v-bind:showSwitchBtn="true")
</template>

<script>
  export default {
    name: 'stickyHeader',
    props: {
      categories: Array,
      link: String,
      categorySubtitle: String
    },
  
    data() {
      return {}
    },
    methods: {
      handleBodyScroll(event) {
        var header = document.getElementById('sticky-header');
        if (header) {
          // Get the offset position of the navbar
          var sticky = 1;
          if (window.pageYOffset >= sticky) {
            header.classList.add("sticky");
          } else {
            header.classList.remove("sticky");
          }
        }
      },
  
    },
    created: function() {
      if (process.browser) {
        window.addEventListener('scroll', this.handleBodyScroll);
      }
    },
    destroyed: function() {
      if (process.browser) {
        window.removeEventListener('scroll', this.handleBodyScroll);
      }
  
    }
  }
</script>

<style lang="scss">
  .sticky-header {
    position: relative;
    background-color: white;
    z-index: 5;
    &.sticky {
      position: fixed;
      top: 0;
      width: 100%;
      box-shadow: 0 5px 10px rgba(204, 218, 230, .25);

      &+.main-content {
        padding-top: 56px;
      }
    }
    .header,
    .header__title {
      position: relative;
      display: flex;
      align-items: center;
    }
    .header {
      justify-content: space-between;
      height: 56px;
    }
    .categories_header__title {
      font-size: 20px;
      font-weight: 400;
      line-height: 1.35;
      letter-spacing: 6px;
      text-transform: uppercase;
      margin: 0;
      color: #000;
      height: 100%;
      border-bottom: 2px solid transparent;
    }
  }
</style>

