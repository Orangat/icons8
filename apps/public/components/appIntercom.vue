<template lang="pug">
  .app-intercom(
    v-on:click="open"
    v-bind:class="{'is-loading': isLoading, 'is-loaded': isLoaded}"
  )
</template>

<script>
  export default {
    name: 'appIntercom',
    data () {
      return {
        isLoaded: false,
        isLoading: false
      }
    },
    methods: {
      open () {
        if (!this.isLoaded) {
          this.init()
        }
      },
      init () {
        if (window.$crisp) {
          window.$crisp.push(["do", "chat:open"])
        } else {
          this.isLoading = true
          window.$crisp = []
          window.CRISP_WEBSITE_ID = '0387cc22-33e9-44e8-826f-c5c18d31fc81';
          (function () {
            const d = document
            const s = d.createElement('script')
            s.src = 'https://client.crisp.chat/l.js'
            s.async = 1
            d.getElementsByTagName('head')[0].appendChild(s)
          })()
          window.$crisp.push(["on", "session:loaded", () => {
            this.isLoading = false
            this.isLoaded = true
          }])
          window.$crisp.push(["do", "chat:open"])
        }
      }
    }
  }
</script>

<style lang="scss">
  #intercom-container .intercom-launcher-frame,
  #intercom-container .intercom-launcher-discovery-frame {
    right: 80px!important;
  }
</style>

<style lang="scss" scoped>
  @import '../assets/css/mixins';
  .app-intercom {
    position: fixed;
    z-index: 10;
    bottom: 20px;
    right: 80px;
    width: 60px;
    height: 60px;
    background: #28a52d url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzMiIGhlaWdodD0iMjciIHZpZXdCb3g9IjAgMCAzMyAyNyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHBhdGggZD0iTTI2LjYxNiAzNi44OTZsNC4yODkgNC41MTQgMy4zMDUtNS4zODUgOC44MjctMS4wMTRMNDEuNTQ0IDE5LjVsLTI1LjUwNyAyLjkyOCAxLjQ5MyAxNS41MTEgOS4wODYtMS4wNDN6IiBpZD0iYiIvPjxmaWx0ZXIgeD0iLTUwJSIgeT0iLTUwJSIgd2lkdGg9IjIwMCUiIGhlaWdodD0iMjAwJSIgZmlsdGVyVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94IiBpZD0iYSI+PGZlTW9ycGhvbG9neSByYWRpdXM9IjEiIG9wZXJhdG9yPSJkaWxhdGUiIGluPSJTb3VyY2VBbHBoYSIgcmVzdWx0PSJzaGFkb3dTcHJlYWRPdXRlcjEiLz48ZmVPZmZzZXQgZHk9IjEiIGluPSJzaGFkb3dTcHJlYWRPdXRlcjEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0T3V0ZXIxIi8+PGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMSIgaW49InNoYWRvd09mZnNldE91dGVyMSIgcmVzdWx0PSJzaGFkb3dCbHVyT3V0ZXIxIi8+PGZlQ29tcG9zaXRlIGluPSJzaGFkb3dCbHVyT3V0ZXIxIiBpbjI9IlNvdXJjZUFscGhhIiBvcGVyYXRvcj0ib3V0IiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjEiLz48ZmVDb2xvck1hdHJpeCB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMTUzNzAyNDQ2IDAiIGluPSJzaGFkb3dCbHVyT3V0ZXIxIi8+PC9maWx0ZXI+PC9kZWZzPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMyAtMTgpIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjx1c2UgZmlsbD0iIzAwMCIgZmlsdGVyPSJ1cmwoI2EpIiB4bGluazpocmVmPSIjYiIvPjx1c2Ugc3Ryb2tlPSIjRkZGIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9IiNGRkYiIHhsaW5rOmhyZWY9IiNiIi8+PC9nPjwvc3ZnPg==) no-repeat center 14px;
    background-size: 33px 36px;
    border-radius: 50%;
    box-shadow: 0 1px 6px rgba(0,0,0,0.06), 0 2px 32px rgba(0,0,0,0.16);
    cursor: pointer;
    transition: opacity 0.3s ease;

    &.is-loading {
      @include loading(white, 3px, 2.25rem);
      background-image: none;
    }
    &.is-loaded {
      opacity: 0;
      background-image: none;
    }
  }
</style>
