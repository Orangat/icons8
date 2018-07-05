<template lang="pug">
  .pack-filter
    menu-list(
      v-bind:items="packList"
    )
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'packFilter',
    computed: {
      ...mapState({
        platform: state => state.platform,
        packs: state => state.appInfo.packs,
        color: state => state.color,
        shape: state => state.shape,
        format: state => state.format,
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
          const name = pack.name[this.lang] || pack.name['en-US']
          return {
            code: pack.code,
            title: pack.free ?
              `${name} <span class="badge is-right">Free SVG</span>` :
              name,
            url: `/icon/pack/${pack.code}/${options}`
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

        // move freeIcons on top of list
        let freeIconsIndex = -1
        formattedList.some((pack, i) => {
          if (pack.code === 'free-icons') {
            freeIconsIndex = i
            return true
          }
        })
        if (freeIconsIndex > -1) {
          let freePack = Object.assign({}, formattedList.splice(freeIconsIndex, 1)[0])
          formattedList = [freePack].concat(formattedList)
        }
        return formattedList
      }
    }
  }
</script>
