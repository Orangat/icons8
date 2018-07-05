<template lang="pug">
  .platform-filter
    menu-list(
      v-bind:items="platformList"
    )
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'platformFilter',
    computed: {
      ...mapState({
        platforms: state => state.appInfo.platforms,
        color: state => state.color,
        shape: state => state.shape,
        format: state => state.format,
        pack: state => state.pack,
        seoPack: state => state.seoPack
      }),
      platformList () {
        return Object.keys(this.platforms).map(platform => {
          const pl = this.platforms[platform] || {}
          return {
            title: this.$t(`PLATFORMS.${pl.apiCode}`, pl.title),
            url: this.getPlatformUrl(platform)
          }
        })
      }
    },
    methods: {
      getPlatformUrl (platform) {
        let route = this.$route.name
        let params = this.$route.params
        let options = this.platforms[platform].seoCode
        if (this.color && this.color.code !== 'black') {
          options += '--' + this.color.code
        }
        if (this.shape) {
          options += '--' + this.shape.code
        }
        if (this.format) {
          options += '--' + this.format.code
        }

        if (route === 'icon-new-icons-platform') {
          return `/icon/new-icons/${options}`

        // if it's pack page or landing, then link to this pack
        } else if (params.pack !== undefined) {
          let packCode = this.pack.code
          return `/icon/pack/${packCode}/${options}`

        // if it's pack page or landing, then link to this pack
        } else if (params.seoPack !== undefined) {
          let seoPackCode = this.seoPack ? this.seoPack.code : params.seoPack
          return `/icon/free-pack/${seoPackCode}/${options}`

        // if it's search page or landing, then link to this search
        } else if (params.term !== undefined) {
          return `/icon/set/${params.term}/${options}`

        // else link to new-icons
        } else {
          return `/icon/new-icons/${options}`
        }
      }
    }
  }
</script>
