<template lang="pug">
  .icon-name-selector
    app-popup(
      ref="popup"
      v-on:open="onShow"
      position="bottom-left"
      v-bind:show-toggle="false"
    )
      input.icon-name(v-model="icon.canonicalName" v-on:change="syncName" v-on:keyup="loadIcons")
      div(slot="content")
        .list(v-if="icons" v-bind:class="{'is-loading': isLoading}")
          .list-item(
            v-for="icon in icons.slice(0, 8)"
            v-on:click="select(icon)"
          )
            app-icon(v-bind:icon="icon" v-bind:custom-size="26")
            span.icon-title {{ icon.name }}
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'iconNameSelector',
    props: {
      icon: Object
    },
    data () {
      return {
        icons: false,
        isLoading: false,
        updating: false
      }
    },
    computed: {
      ...mapState({
        platforms: state => state.platforms,
        platformCode: state => state.platformCode
      })
    },
    methods: {
      ...mapActions(['search', 'updateBroIcon']),
      loadIcons () {
        if (!this.$refs.popup.show) {
          this.$refs.popup.openPopup()
        }
        this.isLoading = true
        const platform = Object.keys(this.platforms).join(',')
        this.search({
          term: this.icon.canonicalName,
          platform,
          amount: 120,
          options: {popularity: 'off'}
        })
          .then(response => {
            let ids = response.icons.map(icon => {
              return icon.commonId;
            })
            ids = Array.from(new Set(ids))

            const icons = {}
            response.icons.forEach(icon => {
              const newIcon = icons[icon.commonId]
              if (newIcon && newIcon.platform === this.platformCode) {
                return
              }
              icons[icon.commonId] = icon
            })

            this.icons = ids.map(id => icons[id])
            this.isLoading = false
          })
          .catch(error => {
            console.log('error', error)
            this.$error({
              title: 'Search icons failed',
              text: error.message
            })
            this.isLoading = false
          })
      },
      onShow () {
        if (!this.icons) {
          this.loadIcons()
        }
      },
      updateIcon (id, data) {
        this.updating = true
        this.updateBroIcon({
          id,
          data
        })
          .then(icon => {
            this.icon.svg = icon.svg
            this.icon.categories = icon.categories
            this.icon.tags = icon.tags
            this.updating = false
            this.$notify({
              title: 'Icon saved!',
              type: 'warning',
              duration: 2000
            })
          })
          .catch(error => {
            console.log('error', error)
            this.updating = false
            this.$error({
              title: 'Icon update failed',
              text: error.message
            })
          })
      },
      syncName () {
        setTimeout(() => {
          if (!this.updating) {
            this.updateIcon(this.icon.iconId, {canonicalName: this.icon.canonicalName})
          }
        }, 250)
      },
      select (icon) {
        this.icon.canonicalName = icon.name
        this.icon.commonIconId = icon.commonId
        this.updateIcon(this.icon.iconId, {commonIconId: icon.commonId})
        this.$refs.popup.closePopup()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/css/mixins';

  .icon-name-selector {
    & /deep/ .app-icon {
      display: inline-block;
      vertical-align: middle;
      margin-right: 0.75rem;
      transition: 0.3s ease all;
    }
    .icon-name {
      width: 180px;
    }
    .icon-title {
      vertical-align: middle;
      transition: 0.3s ease all;
    }
    .list {
      &.is-loading {
        @include loading();
        & /deep/ .app-icon, .icon-title {
          opacity: 0.4;
        }
      }
    }
  }
</style>
