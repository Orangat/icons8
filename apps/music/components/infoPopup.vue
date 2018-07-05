<template lang="pug">
.info-popup
  .close(v-on:click="closePopup")
  .wrapper
    template(v-if="!downloadStarted")
      h2.title Before You Proceed
      p.description Choose format in which you want to download this track
      .actions
        .action
          .btn.is-dark.is-big.is-normal-text(
            v-on:click="download('mp3')"
          ) Download MP3
            br
            small 320 kbps
        .action
          .btn.is-dark.is-big.is-normal-text(
            v-on:click="download('wav')"
            v-bind:class="{'is-disabled': user.isGuest}"
          ) Download WAV
            br
            small 44,100 Hz
          small(v-if="user.isGuest")
            a.link(href="/paid-license-99") Unlock for $20/month
    template(v-if="downloadStarted")
      h2.title Sex!
      p.description Now when we have your attention, please&nbsp;
        a.link(href="/license") set a link
      .form
        p Music by&nbsp;
          i
            a.link(v-bind:href="'https://icons8.com/music/author/' + authorPrettyId") {{author}}
          | &nbsp;from&nbsp;
          i
            a.link(href="https://icons8.com/music") Fugue
        a.btn.is-dark.is-small.is-normal-text(v-clipboard:copy="textForLink"
              v-clipboard:success="onCopy") {{text}}
      br
</template>

<script>
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'infoPopup',
  props: {
    author: String,
    trackId: String,
    authorPrettyId: String
  },
  data () {
    return {
      text: 'Copy',
      downloadStarted: false
    }
  },
  computed: {
    ...mapState({
      modalOverlay: state => state.isShowModalOverlay,
      user: state => state.auth.user
    }),
    textForLink () {
      return `Music by <a href="https://icons8.com/music/author/${this.authorPrettyId}">${this.author}</a> from <a href="https://icons8.com/music">Fugue</a>`
    }
  },
  methods: {
    ...mapMutations({
      hideInfoPopup: 'HIDE_INFO_POPUP',
      hideModal: 'HIDE_MODAL'
    }),
    closePopup() {
      this.hideInfoPopup(this.trackId)
      this.hideModal()
      this.downloadStarted = false
    },
    onCopy() {
      this.text = 'Copied!'
    },
    download (media_format) {
      if (media_format === 'wav' && this.user.isGuest) {
        return
      }
      this.downloadStarted = true
      axios.get(`https://api-music.icons8.com/api/v1/tracks/${this.trackId}/download-url`, {
        params: {media_format},
        withCredentials: true
      }).then((response) => {
        const element = document.createElement('a');
        element.setAttribute('href', response.data.url);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/helpers/variables.scss";

.info-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 480px;
  padding: 48px 32px 40px;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 12px 32px -8px rgba(0,0,0,0.6);
  z-index: 5;

  @media (max-width: 500px) {
    width: 90%;
  }

  .wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .close {
    position: absolute;
    top: 16px;
    right: 14px;
    min-width: 1px;
    padding: 10px;
    cursor: pointer;

    &::before, &::after {
      content: "";
      position: absolute;
      top: 10px;
      right: 2px;
      width: 16px;
      height: 2px;
      background-color: $color-body;
    }
    &::before {
      transform: rotate(45deg);
    }
    &::after {
      transform: rotate(-45deg);
    }
  }

  .title {
    font-size: 32px;
    line-height: 1.25;
    margin-top: 16px;
    margin-bottom: 8px;
    color: $color-body;
  }

  .description {
    font-size: 16px;
    line-height: 1.4;
    margin-bottom: 24px;
    text-align: center;
    color: $color-body;
  }

  .form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 12px;
    background-color: $color-lightergrey;
    border-radius: 3px;

    .btn {
      margin-left: 8px;
    }
  }

  .actions {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .action {
    width: 47.5%;
    text-align: center;
    .btn {
      width: 100%;
      font-size: 16px;
      margin-bottom: 12px;
    }

    small {
      color: #aaa;
      font-weight: 300;
    }
  }
}
</style>

