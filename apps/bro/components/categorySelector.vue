<template lang="pug">
  .category-selector
    app-popup(
      ref="popup"
      position="bottom-left"
      v-bind:show-toggle="false"
    )
      input.category-name(
        v-model="categoryName"
        v-on:blur="refreshName"
        v-on:keyup="onKeyUp"
        v-bind:class="{'is-empty': categoryName === '???' }"
      )
      div(slot="content")
        .list
          .list-item(
            v-for="subcategory in suggests"
            v-on:click="select(subcategory)"
          )
            span.subcategory-title {{ subcategory.name }}
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { PACK_CHANGED } from '../../icon/store/mutation-types'
  export default {
    name: 'categorySelector',
    props: {
      icon: Object,
      category: Object
    },
    data () {
      return {
        categoryName: ''
      }
    },
    computed: {
      ...mapState({
        categories: state => state.categories,
        subcategories: state => state.subcategories
      }),
      suggests () {
        return this.subcategories.filter(subcategory => {
          const preparedString = this.categoryName
            .split(':')[0].replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
          return subcategory.name.search(new RegExp(preparedString, 'i')) > -1
        })
      }
    },
    watch: {
      category () {
        this.categoryName = this.getCategoryName(this.category)
      }
    },
    mounted () {
      this.categoryName = this.getCategoryName(this.category)
    },
    methods: {
      ...mapActions(['updateBroIcon']),
      getCategoryName (category) {
        const founded = this.categories.find(cat => category.categoryId === cat.categoryId)
        if (founded) {
          const sub = founded.subcategories.find(sub => category.subcategoryId === sub.subcategoryId)
          if (sub) {
            return `${founded.name}: ${sub.name}`
          }
          return founded.name
        }
        return '???'
      },
      select (subcategory) {
        this.category.categoryId = subcategory.categoryId
        this.category.subcategoryId = subcategory.subcategoryId
        this.categoryName = this.getCategoryName(this.category)
        this.$refs.popup.closePopup()
        this.updateBroIcon({
          id: this.icon.iconId,
          data: {
            categories: this.icon.categories
          }
        })
          .then(icon => {
            this.icon.categories = icon.categories
            this.$notify({
              title: 'Icon saved!',
              type: 'warning',
              duration: 2000
            })
          })
          .catch(error => {
            console.log('error', error)
            this.$error({
              title: 'Icon update failed',
              text: error.message
            })
          })
      },
      onKeyUp () {
        if (!this.$refs.popup.show) {
          this.$refs.popup.openPopup()
        }
      },
      refreshName () {
        setTimeout(() => {
          this.categoryName = this.getCategoryName(this.category)
        }, 250)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/css/variables';
  .category-selector {
    .list {
      max-height: 304px;
      overflow-y: auto;
    }
    .list-item {
      line-height: 2rem;
    }
    .category-name {
      width: 180px;

      &.is-empty {
        border-bottom: 1px solid #ddd;
        &:focus {
          border-bottom: 1px solid $color-orange;
        }
      }
    }
  }
</style>
