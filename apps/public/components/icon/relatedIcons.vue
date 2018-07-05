<template lang="pug">
  .related-icons
    app-tabs(
      v-on:activate="showPlatform"
    )
      app-tab(
        v-for="(platform, index) in variants"
        v-bind:key="platform.order"
        v-bind:title="platform.title"
        v-bind:active="platform.current"
      )
        icon-grid(
          v-bind:icons="getPlatformIcon(platform)"
          v-bind:grid-style="'icons'"
        )
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'relatedIcons',
    serverCacheKey: props => props.icon.id,
    props: {
      icon: {
        type: Object
      }
    },
    data () {
      return {
        related: {}
      }
    },
    computed: {
      ...mapState({
        platforms: state => state.appInfo.platforms
      }),
      variants () {
        let variants = []
        if (this.icon && this.icon.variants && this.icon.variants.length) {
          this.icon.variants.forEach(variant => {
            let code = variant.platform

            // if variant have platform code
            if (code) {
              let platform = this.platforms[code]

              // if there platform with this code
              if (platform) {
                // if its ios platform then we take only unfilled version for listing
                if (code !== 'ios7' || !variant.filled) {
                  let iconVariant = {
                    id: variant.id,
                    code,
                    loaded: false,
                    current: code === this.icon.platform
                  }
                  iconVariant.order = platform.order
                  iconVariant.title = platform.title
                  variants.push(iconVariant)
                }
              }
            }
          })
        }
        return variants.sort((a, b) => {
          return a.order - b.order
        })
      }
    },
    methods: {
      ...mapActions(['getSimilarIcons']),
      showPlatform (index) {
        let platform = this.variants[index]
        if (platform && !this.related[platform.code]) {
          this.getSimilarIcons({id: this.variants[index].id})
            .then(response => {
              this.related[platform.code] = response.icons
              this.$forceUpdate()
            })
            .catch(error => {
              console.error('error', error)
            })
        }
      },
      getPlatformIcon (platform) {
        return this.related[platform.code]
      }
    }
  }
</script>

<style lang="scss">
  .related-icons {
    .icon-tags-title {
      display: inline-block;
      margin-right: 0.5rem;
    }
    .icon-grid {
      margin: 0 auto;
      max-width: 760px;
    }
  }
</style>
