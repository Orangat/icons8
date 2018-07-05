<template lang="pug">
  .seo-pack-filter
    menu-list(
      v-bind:items="packList"
    )
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'seoPackFilter',
    computed: {
      ...mapState({
        platform: state => state.platform,
        color: state => state.color,
        shape: state => state.shape,
        format: state => state.format,
        packs: state => state.appInfo.seoPacks,
        lang: state => state.lang.locale
      }),
      packList () {
        let options = this.platform.seoCode || 'all'
        if (this.color && this.color.code !== 'black') {
          options += '--' + this.color.code
        }
        if (this.shape) {
          options += '--' + this.shape.code
        }
        if (this.format) {
          options += '--' + this.format.code
        }

        // format for menu
        let formattedList = this.packs.map(pack => {
          return {
            code: pack.code,
            title: pack.name[this.lang] || pack.name['en-US'],
            url: `/icon/set/${pack.code}/${options}`
          }
        })

        formattedList.sort((a, b) => {
          if (a.title > b.title) {
            return 1
          }
          if (a.title < b.title) {
            return -1
          }
          return 0
        })

        // add new icons
        formattedList.unshift({
          title: this.$t('WEB_APP.NEW_ICONS'),
          url: `/icon/new-icons/${options}`
        })
        return formattedList
      }
    }
  }
</script>
