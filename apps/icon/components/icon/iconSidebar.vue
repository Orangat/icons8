<template lang="pug">
  .icon-sidebar
    .app-left-sidebar-content.clearfix
      icon-toolbar(v-bind:icon="fullIcon" v-on:iconEffected="iconEffected")

    .app-right-sidebar-content.clearfix
      icon-workspace(
        v-bind:icon="fullIcon"
        v-bind:preview-icon="previewIcon"
      )

      similar-icons(
        v-bind:icon="fullIcon"
        v-bind:is-icon-loading="previewIcon"
        v-bind:navigate="false"
        v-on:select="select"
      )

</template>

<script>
  import utils from '~/plugins/utils'
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'iconSidebar',
    data () {
      return {
        fullIcon: {},
        previewIcon: undefined,
        sidebar: undefined
      }
    },
    computed: {
      ...mapState({
        icon: state => state.icon.selectedIcon
      })
    },
    mounted () {
      this.loadFromLocalStorage()

      this.sidebar = this.$el.querySelector('.app-right-sidebar-content')
      if (!this.sidebar) {
        return
      }
      this.sidebar.addEventListener('dragover', (e) => {
        e.stopPropagation()
        e.preventDefault()
        this.sidebar.classList.add('is-drag-over')
        e.dataTransfer.dropEffect = 'copy'
      }, false);
      this.sidebar.addEventListener('dragenter', (e) => {
        e.stopPropagation()
        e.preventDefault()
        this.sidebar.classList.add('is-drag-over')
      }, false);
      this.sidebar.addEventListener('dragleave', (e) => {
        e.stopPropagation()
        e.preventDefault()
        if (!this.sidebar.contains(e.fromElement)) {
          this.sidebar.classList.remove('is-drag-over')
        }
      }, false);

      this.sidebar.addEventListener('drop', this.handleDrop, false);
    },
    beforeDestroy () {
      if (this.sidebar) {
        this.sidebar.removeEventListener('drop', this.handleDrop, false)
      }
    },
    watch: {
      'icon.id' (newValue, oldValue) {
        if (newValue && newValue !== oldValue && !this.icon.variants) {
          this.getFullIcon(this.icon)
        }
      }
    },
    methods: {
      ...mapActions([
        'selectIcon',
        'getIcon',
        'uploadIcons',
        'loadFromLocalStorage'
      ]),
      iconEffected (svgEffect) {
        this.fullIcon = Object.assign({},  this.fullIcon, {svgEffect})
      },
      getFullIcon (icon) {
        this.previewIcon = this.icon
        if (!icon.id) {
          this.fullIcon = this.icon
        } else {
          this.getIcon(icon)
            .then(response => {
              this.fullIcon = response.icon
              this.fullIcon.synonim = icon.name
              this.previewIcon = undefined
            })
            .catch(error => {
              this.fullIcon = this.icon
              this.previewIcon = undefined
              this.$error({
                title: this.$t('WEB_APP.MESSAGES.NOT_LOAD_INFO'),
                text: error.message
              })
            })
        }
      },
      select (variant) {
        this.fullIcon = Object.assign(
          {svgEffect: false, svgCurrentResolution: false},
          variant,
          {variants: this.fullIcon.variants}
        )
      },
      handleDrop (e) {
        e.stopPropagation()
        e.preventDefault()
        this.sidebar.classList.remove('is-drag-over')

        let data = e.dataTransfer.getData('text')
        if (data) {
          try {
            data = JSON.parse(data)
            const icon = data.icon
            if (icon) {
              this.selectIcon(icon)
              this.$analytics.trackIconClick({
                id: icon.id,
                term: this.$route.params.term
              })
              this.$analytics.page({
                name: 'Product Page',
                url: utils.getIconUrl(icon)
              })
            }
          } catch (e) {
            console.log('DnD data error', e)
          }
        }

        if (e.dataTransfer.files.length) {
          this.uploadIcons([e.dataTransfer.files[0]])
            .then(icons => {
              const icon = icons[0]
              this.selectIcon(icon)
              this.fullIcon = icon
            })
            .catch(error => {
              this.$error({
                title: 'Upload failed',
                text: error.message
              })
            })
            this.$analytics.track({
              event: 'Uploaded own SVG',
              category: 'Downloads'
            })
        }
        return false
      }
    }
  }
</script>
