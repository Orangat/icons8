<template lang="pug">
  .list
    .layout.column
      .list__title-main Popular Pairings
      .list__title {{ isMain ? 'Popular Fonts' : 'Pairing' }}
      .scrollable.container(v-if="items.length" ref="scrollable")
        .list__tile(
          v-for="(item, index) in items"
          :key="item.id"
          :class="{'list__tile--active': isFontSelected(item, index)}"
          @click="select(item)"
          :ref="`${isMain ? 'mainFont' : 'pairedFont'}-id-${item.id}`"
        )
          .layout.layout--align-center.layout--space-between.row.full-height
            .list__tile__title {{ item.title }}
            img.list__tile__icon(
              v-if="isSourceService(item) && item.loaded"
              :src="getIconLink(item)"
              :title="`Found in ${getSourceLinkText(item)}`"
            )
      .list__close-button(@click="close()")
        img(
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGySURBVGhD7ZlJTsNAFETNAdiGPZwkh4DjsGSLOBNnyDa3YIdsXkVdKIghHnpE/aRSnLb9u16UeJOh0+l0/gfTNF2N4/hIbsJSMehyT499eLsMSTBg4vVQUoa9H8g7eSN3YXk+Kk8OJWXY8yQROjyF5eWoPCkiw15xJIzKk6wy7BFXwqg8ySLD7DQSRuVJUhlmppUwKk+SyDArj4RReRJVhhl5JYzKkygy3FtGwqg82STDPWUljMqTVTJcW4eEUXmySIZr6pIwKk9myXCuTgmj8uRPGdbqljAqT36U4bgNCaPy5IsMaUvChPKWOTYpYYLMUQKC45dwqi0o/vl1EhzPejRXxbkEr8+SaE6Got9+2CpP2pGh4K9PJ5Un9ctQ7OIjVuVJvTIUuihhVJ7UJ0OR2RJG5Uk9MhRYLGFUnpSXYePVEkblSTkZNtwsYVSe5Jdho2gSRuVJPhk2iC5hVJ6kl2FwMgmj8iSdDAOTSxiVJ/FlGJRNwqg8iSfDgOwSRuXJdhluLCZhVJ6cy+zCqflw057o764iEob9TzLklVyH5WXwQdyGw6IgsFst0el0OhUyDB/Y0H1k3IFXeQAAAABJRU5ErkJggg=="
          title="close"
        )
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapState } from 'vuex'

  export default {
    props: ['isMain'],
    data() {
      return {
        selectedFontIndex: 0,
      }
    },
    mounted() {
      this.scrollTitles()
    },
    computed: {
      ...mapGetters(['getIconLink', 'getSourceLinkText', 'isSourceService', 'pairedFonts']),
      ...mapState({
        mainFont: state => state.mainFont,
        mainFonts: state => state.mainFonts,
        pairedFont: state => state.pairedFont
      }),
      items: function() {
        return this.isMain ? this.$store.getters['mainFonts'] : this.$store.getters['pairedFonts']
      }
    },
    methods: {
      isFontSelected(item, index) {
        const font = this.isMain ? this.mainFont : this.pairedFont
        let isEqual = false
        isEqual = item.title.toLowerCase() === font.title.toLowerCase()

        if (isEqual) {
            this.selectedFontIndex = index
        }

        return isEqual
      },
      select(item) {
        this.items.forEach(item => item.active = false)
        item.active = true
        this.$emit('select', item)
        this.close()
      },
      close() {
        this.$el.classList.add('mobile-hidden')
        this.$emit('close')
      },
      scrollTitles() {
        // Get item element
        const selectedFont = this.isMain ? this.mainFont : this.pairedFont
        if (selectedFont) {
          const $scrollable = this.$refs.scrollable
          let $item = this.$refs[`${this.isMain ? 'mainFont' : 'pairedFont'}-id-${selectedFont.id}`][0]

          // Calculate item height
          const itemStyles = window.getComputedStyle($item)
          const itemMargin = parseFloat(itemStyles['marginTop']) + parseFloat(itemStyles['marginBottom'])
          const itemOuterHeight = Math.ceil($item.offsetHeight + itemMargin)

          // Calculate scrollable height
          const scrollableStyles = window.getComputedStyle($scrollable)
          const scrollableMargin = parseFloat(scrollableStyles['marginTop']) + parseFloat(scrollableStyles['marginBottom'])
          const scrollableOuterHeight = Math.ceil($scrollable.offsetHeight + scrollableMargin)

          // Move scroll a little bit upper to make sense that there are more fonts up there
          if (Math.ceil(scrollableOuterHeight / itemOuterHeight) <= this.selectedFontIndex + 1) {
            $item.scrollIntoView()
            if (this.mainFonts.length - 1 !== this.selectedFontIndex) {
              $scrollable.scrollTop -= (itemOuterHeight / 2)
            }
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/css/variables';
  @import '../assets/css/mixins';

  @mixin loraTitle() {
    color: $redColor;
    font-family: 'Lora', serif;
    font-style: italic;
  }

  .list {
    border-right: 1px solid #7a7a7a;

    &__tile {
      color: #ccc;
      height: 50px;
      padding: 0 15px 0 $padding;

      &:hover {
        @include delay(.4s);
        background-color: #262626;
        color: #fff;
        cursor: pointer;
      }

      &__icon {
        opacity: 0.3;
        height: 21px;
      }

      &__title {
        text-transform: capitalize;
        word-wrap: break-word;
        width: 100%;
      }

      &--active {
        @include delay();
        text-shadow: 0 0 3px #fff;
        color: #fff;
        background-color: rgba(0, 51, 255, 1) !important;

        img {
          display: flex;
        }
      }

      &__rating {
        text-align: center;
        color: #0099FF;

        img {
          width: 20px;
        }
      }
    }

    &__title {
      padding: 15px 15px 13px $padding;
      font-weight: 400;
      @include loraTitle();

      &-main {
        padding: ($padding + 1px) $padding 10px $padding;
        @include loraTitle();
      }
    }

    &__head {
      padding: 15px 15px 15px 10px;

      &__title {
        width: 100%;
        text-overflow: ellipsis;
        height: 21px;
        overflow: hidden;
        white-space: nowrap;
      }

      &__rating {
        width: 34px;

        img {
          width: 16px;
          padding-top: 3px;
        }
      }
    }

    &__close-button {
      width: 35px;
      margin: 0 auto;
      padding: 25px 0;

      img {
        height: 25px;
      }
    }
  }

  .scrollable {
    height: calc(100vh - 330px);
    overflow-y: auto;
    overflow-x: hidden;
  }

  // Mobile
  @media (min-width: 0) {
    .list {
      width: 100%;
      position: fixed;
      background-color: #000;
      top: 0;
      z-index: 10;

      &__title {
        display: none;
      }
    }

    .scrollable {
      height: calc(100vh - 148px);
    }
  }

  // Desktop
  @media (min-width: 771px) {
    .list__title-main, .list__close-button {
      display: none;
    }

    .scrollable {
      height: calc(100vh - 301px);
    }

    .list {
      position: initial;
      top: initial;
      z-index: 1;

      &__tile {
        width: 155px;
      }

      &__title {
        display: flex;
      }
    }
  }

  @media (min-width: 950px) {
    .scrollable {
      height: calc(100vh - 350px);
    }
  }

  @media (min-width: 1050px) {
    .list__tile {
      width: 230px;
    }
  }
</style>
