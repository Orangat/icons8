<template lang="pug">
  .pager(v-if="totalPages > 1")
    .layout.layout--align-center.column
      .info {{ page * 20 - 19 }}-{{ page * 20 > total ? total : page * 20 }} of {{ total }}
      .layout.layout--justify-center.row
        .page(@click="previous()") &larr;
        .page(@click="next()") &rarr;
</template>

<script>
  export default {
    props: ['total', 'totalPages'],
    data () {
      return {
        page: 1
      }
    },
    methods: {
      previous() {
        if (this.page - 1 > 0) {
          this.page--
          this.$emit('select', this.page)
        }
      },
      next() {
        if (this.page + 1 <= this.totalPages) {
          this.page++;
          this.$emit('select', this.page)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/css/variables';
  @import '../assets/css/mixins';

  .pager {
    padding: $padding $padding 0 $padding;

    .info {
      padding: 0 0 15px 0;
    }

    .page {
      padding: 10px 0 5px 0;
      margin: 5px;
      border: 1px solid #616161;
      width: 40px;
      height: 24px;
      text-align: center;
      cursor: pointer;

      &__divider {
        padding: 8px 0 5px 0;
        margin: 5px;
        width: 35px;
        height: 22px;
        text-align: center;
      }

      &:hover, &.active {
        @include delay();
        background-color: #616161;
      }
    }
  }
</style>
