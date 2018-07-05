<template lang="pug">
  .favicon-page.wrapper#dropzone.dropzone(
    v-on:drop="onDrop"
    v-on:dragover="dragOver"
    v-on:dragleave="dragLeave"
    v-bind:class="{dragover: isDragOver}"
  )
    .preloader(v-if="loading")
      beat-loader(:color="color" :loading="loading")
    section.container
      h1.main-header
        strong.strong-text Favicon Generator&nbsp;
        | generates favicon.ico
      label
        span.search-span Enter the topic of your website&nbsp;
        div(class="form-inline")
          input(class="form-control search-input" v-model="searchTag" v-on:keypress="searchApi" v-on:keyup.enter="searchApi" type="type" )
          button(class="btn search-btn" @click="searchApi") Search
      div.upload-text or
        span.file-upload
          form
            label
              input(v-on:change="readUrl" type="file" accept="image/*" class="input-file" id="inputGroupFile02")
              span upload
        | your image.
      transition(name="fade")
        .wrap-notif(v-if="uploadFileMess" class="notif-text")
          span(class="notif-span-text") {{ fileName }}
      transition(name="fade")
        .wrap-notif(v-if="errorNotif" class="notif-text error-notif")
          span(class="notif-span-text") {{ fileName }}
      .upload
        #out
          .pic-item_wrap(v-for="icon in icons" v-on:click="getLinkIcon('https://png.icons8.com/'+ icon.platform +'/2x/'+ icon.commonName +'.png')")
            a( href="#" onclick="event.preventDefault()" class="icon-wrap")
              .app-icon
                img(v-bind:src="'https://png.icons8.com/'+ icon.platform +'/2x/'+ icon.commonName +'.png'" )
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import debounce from 'debounce'
  import BeatLoader from 'vue-spinner/src/BeatLoader.vue'
  export const eventHub = new Vue()

  export default {
    layout: 'tools',
    components: {
      BeatLoader
    },
    head: {
      title: 'Favicon Generator, 70,000 Free Icons Included',
      meta: [
        { hid: 'description', name: 'description', content: 'Generate a favicon with a couple of clicks. Use your image it one of the 1000s of icons we have created. Free forever.' }
      ]
    },
    data: function () {
      return {
        picBase: undefined,
        apiKey: undefined,
        jsonObject: undefined,
        picBaseReplace: undefined,
        isDragOver: false,
        dragFiles: undefined,
        fileName: undefined,
        showInfo: true,
        //icons8 api
        searchTag: undefined,
        searchIconUrl: '',
        searchHeader: '',
        icons: [],
        // preloader
        color: '#ccc',
        loading: false,
        // Notification
        uploadFileMess: false,
        errorNotif: false
      }
    },
    methods: {
      readUrl: function (e) {
        this.uploadNotification('File uploaded successfully and will be downloaded automatically')
        const input = e.target
        if (input.files && input.files[0]) {
          const reader = new FileReader()
          reader.onload = (e) => {
            this.picBase = e.target.result
            this.sendRequest()
          }
          reader.readAsDataURL(input.files[0])
        }
      },
      sendRequest: function () {
        this.generateJson()
        axios.post('https://demo.icons8.com/favicon/api/', JSON.stringify(this.jsonObject))
          .then((response) => {
            let urlIco = response.data.favicon_generation_result.favicon.files_urls[3]
            location.href = urlIco
          })
          .catch(function (error) {
            let errorMes = error
            console.log(errorMes)
          })
      },
      sendRequestSearch: function () {
        this.generateJsonSearch()
        console.log(JSON.stringify(this.jsonObject))
        axios.post('https://demo.icons8.com/favicon/api/', JSON.stringify(this.jsonObject))
          .then(function (response) {
            let urlIco = response.data.favicon_generation_result.favicon.files_urls[3]
            location.href = urlIco
          })
          .catch(function (error) {
            let errorMes = error
            console.log(errorMes)
          })
      },
      generateJson: function () {
        this.apiKey = 'e2f7ce777d285ec9858293825a64b905c89abf74'
        this.picBaseReplace = this.picBase.replace(/^data:([A-Za-z-+\/]+);base64,/, '')
        this.jsonObject =
          {
            favicon_generation: {
              api_key: this.apiKey,
              master_picture: {
                type: 'inline',
                content: this.picBaseReplace
              },
              files_location: {
                'type': 'path',
                'path': '/path/to/icons'
              },
              favicon_design: {
                desktop_browser: {}
              },
              settings: {
                compression: 3,
                scaling_algorithm: 'Mitchell',
                error_on_image_too_small: true,
                readme_file: true,
                html_code_file: true,
                use_path_as_is: false
              },
              versioning: {
                param_name: 'ver',
                param_value: '15Zd8'
              }
            }
          }
      },
      generateJsonSearch: function () {
        this.apiKey = 'e2f7ce777d285ec9858293825a64b905c89abf74'
        this.jsonObject =
          {
            favicon_generation: {
              api_key: this.apiKey,
              master_picture: {
                type: 'url',
                url: this.searchIconUrl
              },
              files_location: {
                'type': 'path',
                'path': '/path/to/icons'
              },
              favicon_design: {
                desktop_browser: {}
              },
              settings: {
                compression: 3,
                scaling_algorithm: 'Mitchell',
                error_on_image_too_small: true,
                readme_file: true,
                html_code_file: true,
                use_path_as_is: false
              },
              versioning: {
                param_name: 'ver',
                param_value: '15Zd8'
              }
            }
          }
      },
      uploadNotification: function (mess) {
        this.fileName = mess
        this.uploadFileMess = true
        setTimeout(() => {
          this.uploadFileMess = false
        }, 4000)
      },
      errorNotification: function (mess) {
        this.fileName = mess
        this.errorNotif = true
        setTimeout(() => {
          this.errorNotif = false
        }, 3000)
      },
      dragOver: function (e) {
        e.stopPropagation()
        e.preventDefault()
        this.isDragOver = true
        return false
      },
      dragLeave: function (e) {
        e.stopPropagation()
        e.preventDefault()
        this.isDragOver = false
        return false
      },
      onDrop: function (e) {
        e.stopPropagation()
        e.preventDefault()
        this.isDragOver = false
        this.readImages(e)
        return false
      },
      readImages: function (e) {
        this.uploadNotification('File uploaded successfully and will be downloaded automatically')
        this.dragFiles = e.dataTransfer.files
        if (this.dragFiles.length === 1) {
          let fileReader = new FileReader()
          fileReader.onload = (e) => {
            this.picBase = e.target.result
            this.sendRequest()
          }
          fileReader.readAsDataURL(this.dragFiles[0])
        } else {
          this.errorNotification('Please select one file')
        }
      },
      getLinkIcon: function (link) {
        this.searchIconUrl = link
        this.uploadNotification('File will be downloaded automatically')
        this.sendRequestSearch()
      },
      falseLoading: function () {
        this.loading = false
      },
      trueLoading: function () {
        this.loading = true
      },
      sendApiSearch: function () {
        axios.get('https://search.icons8.com/api/iconsets/v4/search?term=' + this.searchTag + '&amount=200&offset=0&platform=all&language=en-US')
          .then((response) => {
            this.icons = response.data.icons
            console.log(this.icons)
            if (this.icons.length === 0) {
              this.errorNotification('Tag "' + this.searchTag + '" not found')
            }
            this.falseLoading()
          })
          .catch(function (error) {
            console.log(error)
            this.falseLoading()
          })
      },
      // icons8 search api
      searchApi: debounce(function (e) {
        console.log(+this.searchTag)
        if (this.searchTag && this.searchTag.length >= 3 && +this.searchTag !== 0) {
          this.trueLoading()
        }
        e.preventDefault()
        if (this.searchTag !== undefined && this.searchTag.trim() !== '' && this.searchTag.length >= 3) {
          this.sendApiSearch()
        } else if (e.key === 'Enter') {
          if (this.searchTag !== undefined && this.searchTag.trim() !== '') {
            this.sendApiSearch()
          } else if (!this.searchTag || +this.searchTag === 0) {
            this.errorNotification('Enter a tag or icon name please')
          }
        }
      }, 350)
    }
  }
</script>

<style lang="scss">
  .favicon-page {
    .v-spinner {
      position: fixed;
      top: 50%;
      margin-top: -12.5px;
      left: 50%;
      margin-left: -28px;
    }

    .notif-text {
      display: flex;
      align-items: center;
      position: fixed;
      left: 20px;
      bottom: 30px;
      height: 60px;
      font-size: 14px;
      line-height: 19px;
      padding: 0 20px;
      background: #68cd86;
      color: #fff;
      width: 280px;
      word-wrap: break-word;
      border-left: 4px solid #54a76c;
      z-index: 1;
    }

    .error-notif {
      background: #e54d42;
      border-left: 4px solid #ad3c34;
    }

    .wrapper {
      min-width: 320px;
      padding: 0 20px;
    }

    .container {
      max-width: 1170px;
      margin: 0 auto;
      padding: 0 15px;
    }

    .strong-text {
      font-weight: 700;
    }

    .main-header {
      font-weight: 300;
      font-size: 24px;
      margin-top: 20px;
      margin-bottom: 0px;
      text-align: left;
    }

    .form-inline {
      display: inline-block;
      margin-left: 10px;
    }

    .search-input {
      padding: 0 10px;
      line-height: 40;
      height: 40px;
      display: inline-block;
      margin-right: 10px;
      width: 240px;
      background: #FEBE01;
      border: none;
      color: #000;
      border-radius: 0;
      font-weight: 700;
    }

    .search-btn {
      padding: 10px;
      display: none;
      background: #fff;
      border: 1px solid #28a745;
      border-radius: 4px;
      transition: all .2s;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        background: #28a745;
        color: #ffffff;
      }
    }

    .input-file {
      margin: 10px 0;
    }

    .upload-text {
      margin-top: 0;
      position: relative;
      top: -15px;
    }

    .upload {
      margin-top: 10px;
    }

    .dropzone {
      border: 2px dashed #fff;
      min-height: 100vh;
      &.dragover {
        border: 2px dashed #ccc
      }
    }

    // Custom input
    .file-upload {
      margin-top: 0;
      position: relative;
      width: 90px;
      height: 41px;
      background: #8251E1;
      border-radius: 10px;
      padding: 8px 4px;
      color: #fff;
      text-align: center;
      border: 1px solid #8251E1;
      transition: all .2s;
      display: inline-block;
      top: 14px;
      margin-left: 5px;
      margin-right: 5px;
      &:hover {
        background: #ffffff;
        color: #8251E1;
      }
      input[type="file"] {
        display: none;
      }
      label {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
      span {
        line-height: 36px;
      }
    }

    // Style for search api icon
    .pic-item {
      margin: 10px auto;
    }

    .pic-item_wrap {
      display: inline-block;
      margin: 0;
    }

    .icon-wrap {
      position: relative;
      display: inline-block;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      overflow: hidden;
      transition: all .2s ease;
      text-decoration: none;
      margin: 0 .125rem;
      &:hover {
        background: #f4f4f4;
        color: #000;
      }
    }

    .icon-title {
      position: relative;
      text-align: center;
      color: #666;
      line-height: 1.3;
      max-width: 90%;
      margin: 0 auto;
      font-size: 14px;
    }

    .app-icon {
      margin: 4px auto 4px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 40px;
      height: 30px;
      transition: all .2s ease;
      img {
        width: 22px;
        height: 22px;
      }
    }

    .dropzone {
      font-size: 24px;
    }

    // Transition
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
      opacity: 0;
    }

    /* Media */
    @media screen and (max-width: 767px) {
      h1.main-header {
        font-size: 18px;
        line-height: 21px;
        margin-bottom: 0px;
      }
      .search-span {
        font-size: 16px;
      }
      .form-inline {
        margin-left: 0;
      }
      .app-icon img {
        width: 16px;
        height: 16px;
      }
      .app-icon {
        width: 37px;
      }
      .upload-text {
        font-size: 16px;
      }
    }
    @media screen and (max-width: 556px) {
      .upload-text {
        margin-top: 10px;
      }
    }
  }
</style>
