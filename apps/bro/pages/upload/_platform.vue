<template lang="pug">
  .page.upload-page
    .uploader(
      v-on:drop="onDrop"
      v-on:dragover="onDragOver"
      v-on:dragenter="onDragEnter"
      v-on:dragleave="onDragLeave"
    )
      .app-page-section
        h1.app-page-title <nuxt-link to="/upload">Upload Icons</nuxt-link> / {{ getPlatformName(platformCode) }}

        p.app-page-subtitle {{ subtitle }}

      .loader(v-bind:class="{'is-loading': isLoading}")
        .loader-info {{ loadedIcons }}/{{ newIcons }}

      .app-page-section(v-if="icons && icons.length")
        transition(name="fade")
          .button.is-tiny.is-orange.remove-icons(
          v-if="selectedIcons.length"
          v-on:click="removeIcons"
          ) remove selected
        table.icon-table
          thead
            tr
              th(width="1%")
                input.checkbox.is-mini(
                id="checkbox-all-icons"
                type="checkbox"
                v-model="allSelected"
                v-on:change="selectAll($event)"
                )
                label(for="checkbox-all-icons")
              th.is-center(width="2%") Uploaded
              th(width="1%")
              th.is-center(width="2%") Match
              th(width="14%") Name
              th(width="14%") Categories
              th(width="48%") Tags
          tbody
            tr(v-for="icon in icons")
              // select
              td
                input.checkbox.is-mini(
                v-bind:id="'checkbox' + icon.iconId"
                type="checkbox"
                v-model="icon.selected"
                v-on:change="selectIcon($event, icon)"
                )
                label(v-bind:for="'checkbox' + icon.iconId")
              // preview
              td.is-fullsize
                .icon-preview(v-html="icon.tempSvg")
              // unlock icon
              td
                .icon-lock(
                v-bind:class="{'is-unlock': !icon.commonIconId}"
                v-on:click="unlockIcon(icon)"
                )
              // common icon preview
              td.is-fullsize
                .icon-preview(
                v-if="icon.commonIconId"
                v-html="icon.svg"
                )
              // icon name
              td
                icon-name-selector(v-bind:icon="icon")
              // icon categories
              td
                category-list-selector(v-bind:icon="icon")
              // icon tags
              td
                textarea(
                v-bind:value="icon.tags.join(', ')"
                v-on:change="syncTags($event, icon)"
                )

      .app-page-section
        .upload-icons
          label.button.is-gray Choose SVG icons on disk...
            input.upload-input(type="file" multiple v-on:change="onUpload")
          br
          .text Or drag them here
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'UploadPage',
    fetch ({params, store}) {
      console.log('params.platform', params.platform)
      store.commit('PLATFORM_CODE_CHANGED', params.platform)
    },
    data () {
      return {
        subtitle: 'Upload up to 200 icons at once. We\'ll use a number of algorithms to match and tag your icons. You\'re welcome to edit the tags, but if not, never mind. We\'ll do it for you.',
        isLoading: false,
        loadedIcons: 0,
        newIcons: 0,
        icons: [],
        selectedIcons: [],
        allSelected: false
      }
    },
    computed:{
      ...mapState({
        platforms: (state) => state.platforms,
        platformCode: (state) => state.platformCode
      })
    },
    methods: {
      ...mapActions([
        'uploadBroIcon',
        'updateBroIcon',
        'deleteBroIcons',
        'loadBroPlatforms',
        'loadBroCategories',
        'readBroIcons'
      ]),
      getPlatformName (code) {
        return this.platforms[code] ? this.platforms[code].title : code
      },
      selectPlatform (code) {
        this.$store.commit('PLATFORM_CODE_CHANGED', code)
      },
      onDragOver (e) {
        e.stopPropagation()
        e.preventDefault()
        e.target.classList.add('is-drag-over')
        e.dataTransfer.dropEffect = 'copy'
      },
      onDragEnter (e) {
        e.stopPropagation()
        e.preventDefault()
        e.target.classList.add('is-drag-over')
      },
      onDragLeave (e) {
        e.stopPropagation()
        e.preventDefault()
        if (!e.target.contains(e.fromElement)) {
          e.target.classList.remove('is-drag-over')
        }
      },
      onDrop (e) {
        e.stopPropagation()
        e.preventDefault()
        e.target.classList.remove('is-drag-over')
        if (e.dataTransfer.files.length) {
          this.uploadIcons(Array.from(e.dataTransfer.files))
        }
        return false
      },
      onUpload (e) {
        if (!e.target.files.length) {
          return
        }
        this.uploadIcons(Array.from(e.target.files))
      },
      uploadIcons (files) {
        this.isLoading = true
        this.readBroIcons(files)
          .then(icons => {
            this.newIcons = icons.length
            this.loadedIcons = 0
            icons.forEach((icon, i) => {
              setTimeout(() => {
                this.uploadBroIcon({
                  name: icon.name,
                  svg: icon.svg,
                  platformApiCode: this.platformCode
                })
                  .then(response => {
                    if (response.status === 'success') {
                      this.loadedIcons++
                      this.icons.push(response.response.icon)
                    } else {
                      this.$error({
                        title: `Upload ${icon.name} failed`,
                        text: response.message
                      })
                    }
                    if (i === icons.length - 1) {
                      this.isLoading = false
                    }
                  })
                  .catch(error => {
                    this.$error({
                      title: `Upload ${icon.name} failed`,
                      text: error.message
                    })
                    if (i === icons.length - 1) {
                      this.isLoading = false
                    }
                  })
              }, i*100)
            })
          })
      },
      updateIcon (id, data) {
        return new Promise((resolve, reject) => {
          this.updateBroIcon({
            id,
            data
          })
            .then(() => {
              this.$notify({
                title: 'Icon saved!',
                type: 'warning',
                duration: 2000
              })
              resolve()
            })
            .catch(error => {
              console.log('error', error)
              this.$error({
                title: 'Icon update failed',
                text: error.message
              })
              reject(error)
            })
        })
      },
      syncTags (e, icon) {
        const tags = e.target.value.trim().split(',').map(tag => tag.trim().replace(/\s\s+/g, ' '))
        this.updateIcon(icon.iconId, {tags})
          .then(() => {
            icon.tags = tags
          })
      },
      selectIcon (e, icon) {
        this.selectedIcons = this.icons.filter(icon => {
          return icon.selected
        })
        if (!icon.selected) {
          this.allSelected = false
        }
      },
      selectAll (e) {
        this.icons.forEach(icon => {
          icon.selected = e.target.checked
        })
        this.selectedIcons = this.icons.filter(icon => {
          return icon.selected
        })
      },
      removeIcons () {
        this.deleteBroIcons(this.selectedIcons)
          .then(() => {
            this.$notify({
              title: 'Icon removed!',
              type: 'warning',
              duration: 2000
            })
            this.icons = this.icons.filter(icon => !icon.selected)
            this.selectedIcons = this.icons.filter(icon => {
              return icon.selected
            })
          })
          .catch(error => {
            console.log('error', error)
            this.$error({
              title: 'Icon remove failed',
              text: error.message
            })
          })
      },
      unlockIcon (icon) {
        if (icon.commonIconId) {
          this.updateIcon(icon.iconId, {commonIconId: 0})
            .then(() => {
              icon.commonIconIdBack = icon.commonIconId
              icon.commonIconId = 0
            })
        } else {
          this.updateIcon(icon.iconId, {commonIconId: icon.commonIconIdBack})
            .then(() => {
              icon.commonIconId = icon.commonIconIdBack
            })
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '../../assets/css/variables';
  @import '../../assets/css/mixins';

  .upload-page {
    background-color: #fafafa;

    .back {
      position: absolute;
      top: 1rem;
      left: 1rem;
    }
    .uploader {
      padding-left: 2rem;
      padding-right: 2rem;

      @media (max-width: 1010px) {
        padding-left: 0;
        padding-right: 0;
      }

      &.is-drag-over {
        &:after {
          content: '';
          position: fixed;
          top: 3rem;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba($color-orange, 0.2);
          box-shadow: inset 0 0 0 2px rgba($color-orange, 0.5);
        }
      }
    }
    .loader {
      position: relative;
      height: 1px;
      &.is-loading {
        @include loading();
        .loader-info {
          opacity: 1;
        }
      }
    }
    .loader-info {
      opacity: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -1.5rem;
      margin-left: -1.5rem;
      width: 3rem;
      height: 3rem;
      line-height: 3rem;
      text-align: center;
      font-size: 11px;
      transition: 0.3s opacity ease;
    }
    .upload-icons {
      text-align: center;
      padding-bottom: 8rem;

      .text {
        display: inline-block;
        margin-top: 1rem;
      }
    }
    .upload-input {
      display: none;
    }
    .icon-table {
      th:first-child {
        padding-left: 1rem;
      }
      td:first-child {
        padding-left: 1rem;
      }
      input {
        background: none;
        font-weight: 400;
        border: none;
        border-bottom: 1px solid transparent;
        vertical-align: middle;
        border-radius: 0;

        &:focus {
          border-bottom: 1px solid $color-orange;
        }
      }
      textarea {
        border: none;
        background: none;
        color: #888;
        resize: none;
        line-height: 1.5;
      }

      .checkbox.is-mini + label {
        &:before {
          top: 1px;
        }
        &:after {
          top: 4px;
        }
      }
    }
    .remove-icons {
      position: absolute;
      margin-top: -2.5rem;
    }
    .icon-preview {
      &>svg {
        width: 48px;
        height: 48px;
        margin: 0 auto;
        display: block;
      }
    }
    .icon-lock {
      content: url('data:image/svg+xml; utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" enable-background="new 0 0 50 50" height="40" width="40"><path style="text-indent:0;text-align:start;line-height:normal;text-transform:none;block-progression:tb;-inkscape-font-specification:Bitstream Vera Sans" d="M 25 3 C 18.364481 3 13 8.3644809 13 15 L 13 20 L 9 20 C 7.3545455 20 6 21.354545 6 23 L 6 47 C 6 48.645455 7.3545455 50 9 50 L 41 50 C 42.645455 50 44 48.645455 44 47 L 44 23 C 44 21.354545 42.645455 20 41 20 L 37 20 L 37 15 C 37 8.3644809 31.635519 3 25 3 z M 25 5 C 30.564481 5 35 9.4355191 35 15 L 35 20 L 15 20 L 15 15 C 15 9.4355191 19.435519 5 25 5 z M 9 22 L 41 22 C 41.554545 22 42 22.445455 42 23 L 42 47 C 42 47.554545 41.554545 48 41 48 L 9 48 C 8.4454545 48 8 47.554545 8 47 L 8 23 C 8 22.445455 8.4454545 22 9 22 z M 25 30 C 23.3 30 22 31.3 22 33 C 22 33.9 22.4 34.6875 23 35.1875 L 23 38 C 23 39.1 23.9 40 25 40 C 26.1 40 27 39.1 27 38 L 27 35.1875 C 27.6 34.6875 28 33.9 28 33 C 28 31.3 26.7 30 25 30 z" color="#000" overflow="visible" enable-background="accumulate" font-family="Bitstream Vera Sans"></path></svg>');
      width: 16px;
      height: 16px;
      opacity: 0.5;
      cursor: pointer;
      transition: 0.3s all ease;
      &:hover {
        opacity: 1;
      }
      &.is-unlock {
        content: url('data:image/svg+xml; utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" enable-background="new 0 0 50 50" height="40" width="40"><path style="text-indent:0;text-align:start;line-height:normal;text-transform:none;block-progression:tb;-inkscape-font-specification:Bitstream Vera Sans" d="M 22.78125 0 C 21.606026 -0.0057189605 20.404333 0.16331041 19.21875 0.53125 C 12.900474 2.4920943 9.2876555 9.27064 11.25 15.59375 L 11.25 15.625 L 11.25 15.65625 C 11.507852 16.365342 12.197981 18.617998 12.625 20 L 9 20 C 7.3545455 20 6 21.354545 6 23 L 6 47 C 6 48.645455 7.3545455 50 9 50 L 41 50 C 42.645455 50 44 48.645455 44 47 L 44 23 C 44 21.354545 42.645455 20 41 20 L 14.75 20 C 14.439459 19.006427 13.512746 16.072552 13.125 15 L 13.15625 15 C 11.518594 9.72311 14.499526 4.1079057 19.78125 2.46875 C 25.049056 0.83391368 30.693704 3.7977271 32.34375 9.0625 C 32.34515 9.06751 32.34225 9.088495 32.34375 9.09375 C 32.570914 9.8855643 33.65625 13.40625 33.65625 13.40625 A 1.0001 1.0001 0 1 0 35.5625 12.8125 C 35.5625 12.8125 34.432722 9.1707768 34.25 8.53125 L 34.25 8.5 C 32.779367 3.761293 28.600339 0.54407389 23.9375 0.0625 C 23.54893 0.022368842 23.172991 0.0019063202 22.78125 0 z M 9 22 L 41 22 C 41.554545 22 42 22.445455 42 23 L 42 47 C 42 47.554545 41.554545 48 41 48 L 9 48 C 8.4454545 48 8 47.554545 8 47 L 8 23 C 8 22.445455 8.4454545 22 9 22 z M 25 30 C 23.3 30 22 31.3 22 33 C 22 33.9 22.4 34.6875 23 35.1875 L 23 38 C 23 39.1 23.9 40 25 40 C 26.1 40 27 39.1 27 38 L 27 35.1875 C 27.6 34.6875 28 33.9 28 33 C 28 31.3 26.7 30 25 30 z" color="#000" overflow="visible" enable-background="accumulate" font-family="Bitstream Vera Sans"></path></svg>');
      }
    }

    .fade-enter-active, .fade-leave-active {
      transition: 0.3s opacity ease;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0
    }
  }
</style>
