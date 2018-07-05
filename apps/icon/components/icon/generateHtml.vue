<template lang="pug">
  .generate-html
    app-modal(
      name="generate-html"
      v-bind:width="'auto'"
    )
      .menu
        .item(
          v-for="type in types"
          v-if="isTypeAvailable(type)"
          v-on:click="selectType(type)"
          v-bind:class="{'is-active': currentType === type.id, 'is-divider': type.id === 'divider'}"
        ) {{type.name}}
      .options
        .preview-icon
          .preview-wrapper
            .icon(
              v-if="currentType !== 'svgCss'"
              v-html="content.preview || content.result"
              v-bind:style="iconStyles"
            )
            .icon(
              v-if="currentType === 'svgCss'"
              v-html="content.preview"
              v-bind:style="iconStyles"
            )

      .preview(v-if="currentType !== 'svgCss'")
        p {{ $t('WEB_APP.SINGLE_ICON.INSERT_SVG_IN_HTML') }}
        textarea(rows="10" v-model="content.result")

        p(v-if="isPng" v-html="$t('WEB_APP.SINGLE_ICON.GENERATE_HTML_LINK')")
        textarea(v-if="isPng") {{ backLink }}

      .preview(v-if="currentType === 'svgCss'")
        p {{ $t('WEB_APP.SINGLE_ICON.INSERT_SVG_IN_HTML') }}
        textarea(rows="2" v-model="content.html")

        p {{ $t('WEB_APP.SINGLE_ICON.INSERT_SVG_IN_CSS_CSS') }}
        textarea(rows="11" v-model="content.css")
</template>

<script>
  import arrowDown from '../../../public/assets/svg/arrow-down.svg'

  import axios from '../../plugins/axios'
  import utils from '../../plugins/utils'
  import config from '../../plugins/config'
  import debounce from 'debounce'

  import { mapState, mapGetters, mapActions } from 'vuex'

  const generateHtml = {
    pngCdn (icon, platforms, options) {
      return generateHtml.pngBase64(icon, platforms, options, true)
    },
    pngBase64 (icon, platforms, options, cdn = false) {
      return new Promise(function (resolve, reject) {
        if (!icon.commonName) {
          resolve({})
          return
        }
        const platform = platforms[icon.platform]
        const seoCode = platform ? platform.seoCode : 'ios'
        const url = `${config.iconsUrl}/${seoCode}/${options.size}/${options.color}/${icon.commonName}.png`
        axios
          .request({
            url: url + '?press=off',
            baseURL: config.apiUrl,
            method: 'get',
            responseType: 'blob'
          })
          .then(response => {
            const reader = new FileReader()
            reader.onloadend = function () {
              const preview = `<img src="${reader.result}">`
              const result = cdn ? `<img src="${url}">` : preview
              resolve({
                preview,
                result
              })
            }
            reader.readAsDataURL(response.data)
          })
          .catch(reject)
      })
    },
    svgInline (icon, platforms, options) {
      return new Promise(function (resolve, reject) {
        let svg = icon.svgEffect || icon.svg
        if (!svg) {
          reject('no svg found')
          return
        }
        const $svg = utils.getSVGNode(svg)
        let innerHTML = $svg.innerHTML

        const viewBoxSvg = $svg.getAttribute('viewBox')
        const styleSvg = $svg.getAttribute('style')
        const svgBody = innerHTML.split('\n').join('')
        const svgStart = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
     width="${options.size}" height="${options.size}"
     viewBox="${viewBoxSvg}"
     style="${styleSvg ? styleSvg+';' : ''}fill:#${options.color};">`
        const svgEnd = '</svg>'
        resolve({ result: svgStart + svgBody + svgEnd })
      })
    },
    svgImg (icon, platforms, options) {
      return new Promise(function (resolve) {
        generateHtml.svgInline(icon, platforms, options)
          .then(response => {
            resolve({ result: `<img src="data:image/svg+xml;base64,${window.btoa(response.result)}">` })
          })
      })
    },
    svgCss (icon, platforms, options) {
      return new Promise(function (resolve) {
        const name = utils.normalizeValue(icon.name)
        generateHtml.svgInline(icon, platforms, options)
          .then(response => {
            const style = `display: inline-block;
  width: ${options.size}px;
  height: ${options.size}px;
  background: url('data:image/svg+xml;base64,${window.btoa(response.result)}') 50% 50% no-repeat;
  background-size: 100%;`

            resolve({
              preview: `<div style="${style}"></div>`,
              html: `<div class="icons8-${name}"></div>`,
              css: `.icons8-${name} {
  ${style}
}`
            })
          })
      })
    }
  }

  export default {
    name: 'generateHtml',
    props: {
      icon: {
        type: Object
      }
    },
    data () {
      return {
        show: false,
        arrowDown,
        min: 1,
        currentType: 'pngBase64',
        types: [{
          id: 'pngBase64',
          format: 'png',
          name: 'PNG Base64'
        }, {
          id: 'pngCdn',
          format: 'png',
          name: 'PNG CDN'
        }, {
          id: 'divider',
          format: 'png',
        }, {
          id: 'svgInline',
          format: 'svg',
          name: 'Inline SVG'
        }, {
          id: 'svgImg',
          format: 'svg',
          name: 'SVG img tag'
        }, {
          id: 'svgCss',
          format: 'svg',
          name: 'SVG background-image'
        }],
        content: '',
        backLink: '<a href="https://icons8.com">Icon pack by Icons8</a>'
      }
    },
    computed: {
      ...mapGetters(['getSizeLimit', 'isIconsAvailable']),
      ...mapState({
        user: state => state.auth.user,
        options: state => state.icon,
        platforms: state => state.appInfo.platforms
      }),
      size: {
        get () {
          return this.options.size
        },
        set (value) {
          this.changeSize(value)
        }
      },
      color: {
        get () {
          return this.options.color
        },
        set (value) {
          this.changeColor(value)
        }
      },
      isPng () {
        return this.currentType === 'pngBase64' || this.currentType === 'pngCdn'
      },
      iconStyles () {
        return {
          width: this.options.size+'px',
          height: this.options.size+'px'
        }
      },
      max () {
        return this.getSizeLimit(this.icon)
      }
    },
    watch: {
      'icon.svgEffect' () {
        if (this.icon.svgEffect) {
          this.currentType = 'svgInline'
        }
      },
      currentType (value) {
        if (value) {
          this.generateHtml()
        }
      },
      'options.size' (value) {
        if (value) {
          this.generateHtml()
        }
      },
      'options.color' (value) {
        if (value) {
          this.generateHtml()
        }
      }
    },
    methods: {
      ...mapActions(['changeSize', 'changeColor']),
      selectType (type) {
        this.currentType = type.id
      },
      isTypeAvailable (type) {
        if (this.icon.svgEffect && type.format === 'png') {
          return false
        }
        return this.isIconsAvailable({
          options: {
            size: this.options.size,
            format: type.format
          }
        })
      },
      togglePopup () {
        this.show = !this.show
      },
      closePopup () {
        this.show = false
      },
      outsideClick (e) {
        if (!this.$el.contains(e.target)) {
          this.closePopup()
        }
      },
      generateHtml: debounce(function () {
        generateHtml[this.currentType](this.icon, this.platforms, this.options)
          .then(content => {
            this.content = content
          })
          .catch(console.log)
      }, 200)
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/css/variables';

  .generate-html {

    /deep/ .app-modal {
      display: flex;
      justify-content: space-around;
      align-items: stretch;
      padding: 0;
      height: 334px;
    }

    .menu {
      order: 0;
      flex: 0 0 190px;
      width: 190px;
      height: 100%;
      background-color: #f4f4f4;
      padding: 1rem 0;
      fill: #9B9B9B;
      border-radius: 4px 0 0 4px;
    }

    .item {
      height: 40px;
      line-height: 40px;
      padding-left: 12px;
      cursor: pointer;
      transition: 0.3s all ease;

      &:hover {
        color: $color-font-dark;
        fill: $color-font-dark;
      }

      &.is-divider {
        height: 1px;
        border-bottom: 1px solid $color-grey;
        margin: 6px 0;
      }

      &.is-active {
        color: white;
        fill: white;
        background-color: $color-blue;
        .icon-effects-svg {
          fill: $color-blue;
        }
      }
    }

    .options {
      order: 0;
      flex: 0 0 210px;
      width: 210px;
      border-radius: 4px 0 0 4px;
    }

    .option {
      min-height: 3rem;
      max-height: 6rem;
      padding: 0 12px;
      color: $color-font-dark;
      border-bottom: 1px solid $color-grey-light;

      &:last-child {
        border-bottom: none;
      }

      &.is-no-padding {
        padding: 0;
      }

      &>input, &>select {
        border: none;
        height: 48px;
        line-height: 48px;
        padding: 0;
      }
      &>label {
        margin-top: 12px;
        display: inline-block;
      }
      &>p {
        font-size: 14px;
      }
      &>.color-picker {
        float: right;
        margin-top: 11px;
      }
    }

    .preview {
      order: 1;
      flex: 0 0 300px;
      width: 300px;
      padding: 1rem 1rem 0;
      background-color: #bdc3c7;
      box-shadow: inset 3px 1px 2px -2px rgba(0, 0, 0, 0.25);
      border-radius: 0 4px 4px 0;
      overflow-y: auto;

      &>textarea {
        font-size: 12px;
        line-height: 1.3;
        border: none;
        border-radius: 0;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        margin-bottom: 16px;
        font-family: Monaco, monospace;
        resize: vertical;

        &:last-child {
          margin-bottom: 0;
        }
      }

      &>p {
        margin-top: 0;
        color: $color-font-dark;
        font-size: 14px;
      }
    }

    .preview-icon {
      width: 176px;
      height: 176px;
      margin: 16px;
      background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScyOCcgaGVpZ2h0PScyOCcgc3R5bGU9J2JhY2tncm91bmQ6I2ZmZic+PHBhdGggZD0nbTAgMGgxNHYxNEgwem0xNCAxNGgxNHYxNGgtMTR6JyBmaWxsPScjZjJmMmYyJyAvPjwvc3ZnPg==');
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }
    .preview-wrapper {
      display: flex;

      &>.icon {
        > /deep/ svg {
          width: 100%;
          vertical-align: top;
        }
        > /deep/ img {
          width: 100%;
          vertical-align: top;
        }
      }
    }
  }
</style>
