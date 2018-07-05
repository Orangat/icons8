<template lang="pug">
  .layout.row.layout--align-center.mobile__list(:class="{'mobile__list--main': isMain}")
    a(
      v-if="font && font.loaded"
      ref="fontServiceLink"
      :href="getSourceLink(font)"
      target="_blank"
    )
      img.list__tile__icon(v-if="isSourceService(font)" :src="getIconLink(font)")
    .layout.row.layout--align-center(@click="showList()")
      .mobile__list-title {{ font ? font.title : '' }}
      svg(width='8px' height='18px' viewbox='0 0 8 18' version='1.1' xmlns='http://www.w3.org/2000/svg')
        g(stroke='none' stroke-width='1' fill='none' fill-rule='evenodd')
          g(transform='translate(-326.000000, -544.000000)' fill='#FFFFFF' fill-rule='nonzero')
            path(d='M326.853553,548.853553 L326.146447,548.146447 L330,544.292893 L333.853553,548.146447 L333.146447,548.853553 L330,545.707107 L326.853553,548.853553 Z M326.853553,556.792893 L330,559.93934 L333.146447,556.792893 L333.853553,557.5 L330,561.353553 L326.146447,557.5 L326.853553,556.792893 Z')
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    props: ['font', 'isMain'],
    computed: {
      ...mapGetters(['getSourceLink', 'getIconLink', 'isSourceService']),
    },
    methods: {
      showList() {
        this.$emit('showList')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/css/variables';
  @import '../assets/css/mixins';

  .mobile__list {
    cursor: pointer;
    height: 47px;

    img {
      width: 20px;
      margin-right: 10px;
    }

    &--main {
      border-bottom: 1px solid #4a55e1;
    }

    &-title {
      text-transform: capitalize;
      width: 100%;
    }
  }
</style>
