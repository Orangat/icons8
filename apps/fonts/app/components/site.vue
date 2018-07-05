<template lang="pug">
  .site
    a(:href="site.url.replace('?ref=producthunt', '')" target="_blank")
      .selection(ref="selection" :class="{ 'selection--hover': selected }")
        .background(:class="{ 'background--hover': selected }")
          .container
            .layout.column
              .image(:style="`background-image: url(${site.screenshot})`")
              .layout.row.layout--align-center
                .title {{ site.name }}
    a.product-hunt-icon(
      ref="productHuntLink"
      :href="site.discussion_url"
      target="_blank"
      title="Product Hunt discussion"
    ) P
</template>

<script>
  export default {
    props: ['site'],
    mounted() {
      this.$refs.productHuntLink.addEventListener('mouseenter', () => this.selected = true)
      this.$refs.selection.addEventListener('mouseleave', () => this.selected = false)
    },
    data () {
      return {
        selected: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/css/variables';
  @import '../assets/css/mixins';

  .site {
    position: relative;

    a {
      text-decoration: none;
    }

    .selection {

      &--hover, &:hover {
        margin: -10px;

        .container {
          padding: 10px;
        }
      }
    }

    .background {
      cursor: pointer;

      &--hover, &:hover {
        @include delay(0.4s);
        background-color: #262626;
      }
    }

    .image {
      background-size: cover;
      background-repeat: no-repeat;
      width: 100%;
      padding-bottom: 70%;
      border: 1px solid #333;
    }

    .title {
      color: #fff;
      font-family: Roboto, sans-serif;
      font-size: 20px;
      padding: 14px 27px 14px 0;
      border-bottom: none;
    }

    .product-hunt-icon {
      position: absolute;
      bottom: 50px;
      right: $padding;
      text-decoration: none;
      font-family: Roboto, sans-serif;
      color: #262626;
      font-weight: bold;
      padding: 5px;
      text-align: center;
      height: 15px;
      width: 15px;
      background-color: #929292;
      border-radius: 15px;
      line-height: 15px;
    }
  }

  // Mobile
  @media (min-width: 0) {
    .site {
      width: 100%;
      padding: 0 20px 20px 20px;
    }
  }

  @media (min-width: 350px) {
    .site {
      padding: 0 $padding $padding $padding;
    }
  }

  // Desktop
  @media (min-width: 1115px) {
    .site {
      padding: 0 $padding $padding $padding;
    }
  }

  @media (min-width: 1280px) {
    .site {
      width: calc(50% - 74px);
    }
  }

  @media (min-width: 1600px) {
    .site {
      width: calc(33.333% - 74px);
    }
  }
</style>
