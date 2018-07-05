<template lang="pug">
.app-track
  // For desktops
  .app-track-desktop(v-on:mouseover="isShowPlayerButtons = true"
                     v-on:mouseout="isShowPlayerButtons = false")
    .track__cover(v-bind:class="{'track__cover--show': isCurrentTrack && isPlaying || isShowPlayerButtons}"
                  v-on:click="onTrackClick")
      img(v-if="coverImg"
          v-bind:src="coverImg")
      .track-btn-player(v-bind:class="{'track-btn-player--show': isCurrentTrack && isPlaying || isShowPlayerButtons}")
        .track-btn-player__play(v-if="!isPlaying || !isCurrentTrack")
        .track-btn-player__pause(v-if="isPlaying && isCurrentTrack")
    .track__name
      .track__name-wrapper
        a(v-on:click="playFromTrack") {{track.name}}
      .track__name-info
        .track-banner.track-content-id(v-if="track.content_id"
                                              v-on:mouseover="isContentID = true"
                                              v-on:mouseout="isContentID = false") Content ID
            .track-banner__desc.track-banner__desc-content-id(v-if="isContentID")
              | Content ID is a popular digital fingerprinting system that content creators can use to easily identify and manage their copyrighted content on YouTube. Videos uploaded to YouTube are compared against audio and video files registered with Content ID by content owners, looking for any matches. When a video is matched to Content ID registered content, a copyright notice will appear on the video, and the content owner may choose to take certain actions, such as:
              .track-banner__item
                svg.track-banner__icon(xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 26 26")
                  g(id="surface1")
                    path(style=" " d="M 17.492188 4.695313 C 15.441406 3.835938 14.085938 3.171875 13.984375 1.992188 C 13.984375 1.359375 13.984375 0.9375 13.984375 0.808594 C 13.984375 -0.191406 12.015625 -0.160156 12.015625 0.808594 C 12.015625 1.777344 12.015625 18.101563 12.015625 18.101563 C 12.015625 18.101563 12.015625 18.261719 12.015625 18.265625 C 12.015625 18.265625 10.574219 17.40625 8.789063 17.714844 C 5.355469 18.316406 4.207031 20.367188 4.207031 22.488281 C 4.207031 24.609375 6.867188 26.175781 9.5 25.800781 C 12.136719 25.429688 13.984375 23.203125 13.984375 21.082031 C 13.984375 21.082031 13.984375 15.089844 13.984375 10.210938 C 14.839844 10.769531 15.839844 11.179688 16.753906 11.539063 C 18.636719 12.285156 19.777344 12.800781 19.777344 13.71875 C 19.777344 14.273438 20.222656 14.71875 20.777344 14.71875 C 21.328125 14.71875 21.777344 14.273438 21.777344 13.71875 L 21.777344 8.753906 C 21.777344 6.492188 19.5 5.539063 17.492188 4.695313 Z ")
                | Clearing the claim and taking no further action
              .track-banner__item
                svg.track-banner__icon(xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 26 26")
                  g(id="surface1")
                    path(style=" " d="M 17.492188 4.695313 C 15.441406 3.835938 14.085938 3.171875 13.984375 1.992188 C 13.984375 1.359375 13.984375 0.9375 13.984375 0.808594 C 13.984375 -0.191406 12.015625 -0.160156 12.015625 0.808594 C 12.015625 1.777344 12.015625 18.101563 12.015625 18.101563 C 12.015625 18.101563 12.015625 18.261719 12.015625 18.265625 C 12.015625 18.265625 10.574219 17.40625 8.789063 17.714844 C 5.355469 18.316406 4.207031 20.367188 4.207031 22.488281 C 4.207031 24.609375 6.867188 26.175781 9.5 25.800781 C 12.136719 25.429688 13.984375 23.203125 13.984375 21.082031 C 13.984375 21.082031 13.984375 15.089844 13.984375 10.210938 C 14.839844 10.769531 15.839844 11.179688 16.753906 11.539063 C 18.636719 12.285156 19.777344 12.800781 19.777344 13.71875 C 19.777344 14.273438 20.222656 14.71875 20.777344 14.71875 C 21.328125 14.71875 21.777344 14.273438 21.777344 13.71875 L 21.777344 8.753906 C 21.777344 6.492188 19.5 5.539063 17.492188 4.695313 Z ")
                | Tracking the video’s viewership statistics
              .track-banner__item
                svg.track-banner__icon(xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 26 26")
                  g(id="surface1")
                    path(style=" " d="M 17.492188 4.695313 C 15.441406 3.835938 14.085938 3.171875 13.984375 1.992188 C 13.984375 1.359375 13.984375 0.9375 13.984375 0.808594 C 13.984375 -0.191406 12.015625 -0.160156 12.015625 0.808594 C 12.015625 1.777344 12.015625 18.101563 12.015625 18.101563 C 12.015625 18.101563 12.015625 18.261719 12.015625 18.265625 C 12.015625 18.265625 10.574219 17.40625 8.789063 17.714844 C 5.355469 18.316406 4.207031 20.367188 4.207031 22.488281 C 4.207031 24.609375 6.867188 26.175781 9.5 25.800781 C 12.136719 25.429688 13.984375 23.203125 13.984375 21.082031 C 13.984375 21.082031 13.984375 15.089844 13.984375 10.210938 C 14.839844 10.769531 15.839844 11.179688 16.753906 11.539063 C 18.636719 12.285156 19.777344 12.800781 19.777344 13.71875 C 19.777344 14.273438 20.222656 14.71875 20.777344 14.71875 C 21.328125 14.71875 21.777344 14.273438 21.777344 13.71875 L 21.777344 8.753906 C 21.777344 6.492188 19.5 5.539063 17.492188 4.695313 Z ")
                | Monetizing the video by running ads against it
              .track-banner__item
                svg.track-banner__icon(xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 26 26")
                  g(id="surface1")
                    path(style=" " d="M 17.492188 4.695313 C 15.441406 3.835938 14.085938 3.171875 13.984375 1.992188 C 13.984375 1.359375 13.984375 0.9375 13.984375 0.808594 C 13.984375 -0.191406 12.015625 -0.160156 12.015625 0.808594 C 12.015625 1.777344 12.015625 18.101563 12.015625 18.101563 C 12.015625 18.101563 12.015625 18.261719 12.015625 18.265625 C 12.015625 18.265625 10.574219 17.40625 8.789063 17.714844 C 5.355469 18.316406 4.207031 20.367188 4.207031 22.488281 C 4.207031 24.609375 6.867188 26.175781 9.5 25.800781 C 12.136719 25.429688 13.984375 23.203125 13.984375 21.082031 C 13.984375 21.082031 13.984375 15.089844 13.984375 10.210938 C 14.839844 10.769531 15.839844 11.179688 16.753906 11.539063 C 18.636719 12.285156 19.777344 12.800781 19.777344 13.71875 C 19.777344 14.273438 20.222656 14.71875 20.777344 14.71875 C 21.328125 14.71875 21.777344 14.273438 21.777344 13.71875 L 21.777344 8.753906 C 21.777344 6.492188 19.5 5.539063 17.492188 4.695313 Z ")
                | Muting the audio that matches their music
              .track-banner__item
                svg.track-banner__icon(xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 26 26")
                  g(id="surface1")
                    path(style=" " d="M 17.492188 4.695313 C 15.441406 3.835938 14.085938 3.171875 13.984375 1.992188 C 13.984375 1.359375 13.984375 0.9375 13.984375 0.808594 C 13.984375 -0.191406 12.015625 -0.160156 12.015625 0.808594 C 12.015625 1.777344 12.015625 18.101563 12.015625 18.101563 C 12.015625 18.101563 12.015625 18.261719 12.015625 18.265625 C 12.015625 18.265625 10.574219 17.40625 8.789063 17.714844 C 5.355469 18.316406 4.207031 20.367188 4.207031 22.488281 C 4.207031 24.609375 6.867188 26.175781 9.5 25.800781 C 12.136719 25.429688 13.984375 23.203125 13.984375 21.082031 C 13.984375 21.082031 13.984375 15.089844 13.984375 10.210938 C 14.839844 10.769531 15.839844 11.179688 16.753906 11.539063 C 18.636719 12.285156 19.777344 12.800781 19.777344 13.71875 C 19.777344 14.273438 20.222656 14.71875 20.777344 14.71875 C 21.328125 14.71875 21.777344 14.273438 21.777344 13.71875 L 21.777344 8.753906 C 21.777344 6.492188 19.5 5.539063 17.492188 4.695313 Z ")
                | Or even blocking a whole video from being viewed
              | If you want to use this track for monetized YouTube video please purchase icons8 license and contact our support.

        .track-banner.track-pro(v-if="track.pro"
                                        v-on:mouseover="isPRO = true"
                                        v-on:mouseout="isPRO = false"
                                        ) PRO
            .track-banner__desc.track-banner__desc-pro(v-if="isPRO") Performing Rights Organization (P.R.O.) registered music. For these composers and their registered tracks, the P.R.O. administers a special part of their music copyright known as Performing Rights.  Performing Rights include the right to publicly broadcast the music on a TV or radio station, play it in a public place (e.g. a supermarket, restaurant, theater, or other venue). If you purchase P.R.O. music, the performing rights are not included with your icons8 license.
              br
              | If you plan to use the track in the public place please contact support, otherwise generally you as the customer / producer won’t have to worry about any additional P.R.O. licenses or fees.

    .track__author
      .track__author-wrapper
        span by&nbsp;
        nuxt-link(v-bind:to="'/author/' + track.user.pretty_id") {{track.user.name}}
    .track-tags
      nuxt-link(v-for="tag in track.tags.slice(0, 3)"
                v-bind:key="tag.pretty_id"
                v-bind:to="'/tag/' + tag.pretty_id").track-tags__tag {{tag.title}}
    .track__duration {{ track.duration | getMin(track.duration)}}
      span &nbsp;min
    .track__bpm {{track.bpm}}
      span &nbsp;bpm
    .track__btn
      a.btn(v-on:click="downloadTrack"
            v-if= "!isLoading") Download
      a.btn-icon--hidden(v-on:click="downloadTrack")
        svg(class="icon-download" xmlns="http://www.w3.org/2000/svg")
                path(d="M18 2H9L7 0H2C.898 0 0 .898 0 2v12c0 1.102.898 2 2 2h16c1.102 0 2-.898 2-2V4c0-1.102-.898-2-2-2zm-8 11L6.5 9h2V5h3v4h2L10 13z")
      loader(v-if="isLoading")
  info-popup(v-bind:author="track.user.name"
            v-bind:trackId="track.id"
            v-bind:authorPrettyId="track.user.pretty_id"
            v-if="showedInfoPopupsById[track.id]")

  // For mobiles
  .app-track-mobile
    .col-left
      .track__cover-mobile( v-on:click="play")
        img(v-if="coverImg"
            v-bind:src="coverImg")
    .col-center
      .col-center-top
        .track__name
          a(v-on:click="playFromTrack") {{track.name}}
        .track__author
          span by&nbsp;
          nuxt-link(v-bind:to="'/author/' + track.user.pretty_id") {{track.user.name}}
      .col-center-bottom
        .track-tags
          nuxt-link(v-for="tag in track.tags.slice(0, 2)"
                    v-bind:key="tag.pretty_id"
                    v-bind:to="'/tag/' + tag.pretty_id").track-tags__tag {{tag.title}}
    .col-right
      .col-right-top
        .track__duration {{ track.duration | getMin(track.duration)}}
      .col-right-bottom
        .track__btn
          a(v-on:click="downloadTrack")
            svg(class="icon-download" xmlns="http://www.w3.org/2000/svg")
              path(d="M18 2H9L7 0H2C.898 0 0 .898 0 2v12c0 1.102.898 2 2 2h16c1.102 0 2-.898 2-2V4c0-1.102-.898-2-2-2zm-8 11L6.5 9h2V5h3v4h2L10 13z")

</template>

<script>
  import axios from 'axios'
  import {
    mapState,
    mapMutations,
    mapGetters
  } from 'vuex'

  export default {
    name: 'appTrack',
    props: {
      track: Object,
      authorsLink: String,
    },
    data() {
      return {
        isMusicPlay: false,
        isShowPlayerButtons: false,
        isContentID: false,
        isPRO: false,
        isLoading: false
      }
    },
    computed: {
      ...mapState({
        currentTrack: state => state.currentTrack,
        showedInfoPopupsById: state => state.showedInfoPopupsById,
        modalOverlay: state => state.isShowModalOverlay
      }),
      ...mapGetters({
        isPlaying: 'isPlaying',
        isPausing: 'isPausing'
      }),
      isCurrentTrack() {
        return this.currentTrack.id === this.track.id
      },
      coverImg() {
        if (this.track.cover != null) {
          return this.track.cover.thumb_url
        } else {
          return false
        }
      }
    },
    filters: {
      getMin: function(seconds) {
        if (!seconds) return ''
        const a = Math.floor(seconds / 60)
        let b = Math.round(seconds % 60)
        if (b < 10) {
          b = '0' + b
        }
        return a + ':' + b
      }
    },
    methods: {
      ...mapMutations({
        showInfoPopup: 'SHOW_INFO_POPUP',
        hideInfoPopup: 'HIDE_INFO_POPUP',
        showModal: 'SHOW_MODAL',
        hideModal: 'HIDE_MODAL'
      }),
      play() {
        this.$emit('play')
      },
      pause() {
        this.$emit('pause')
      },
      playFromTrack() {
        if (!this.isPlaying || !this.isCurrentTrack) {
          this.play()
        } else if (this.isPlaying && this.isCurrentTrack) {
          this.pause()
        }
      },
      onTrackClick() {
        if (!this.isPlaying || !this.isCurrentTrack) {
          this.play()
        } else {
          this.pause()
        }
      },
      downloadTrack() {
        this.showModal()
        this.showInfoPopup(this.track.id)
      }
    }
  }
</script>

<style lang="scss">
  @import "../assets/css/helpers/variables.scss";
  @import "../assets/css/helpers/mixins.scss";
  .app-track {
    .app-track-desktop {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      min-height: 85px;
      &::before {
        position: absolute;
        content: " ";
        top: -1px;
        right: 0;
        left: 0;
        bottom: 0;
        border-top: 1px solid $color-lightergrey;
        border-bottom: 1px solid $color-lightergrey;
      }
      @media (max-width: $responsive-mobile) {
        display: none;
      }
    }
    span {
      color: $color-lightergrey;
    }
    .pause {
      z-index: 300;
    }
    .btn {
      margin-bottom: 0;
    }
    .track__cover {
      position: relative;
      display: flex;
      align-items: center;
      align-self: flex-start;
      flex-basis: 85px;
      margin-right: 2%;
      flex-shrink: 0;
      flex-grow: 0;
      width: 85px;
      height: 85px;
      text-align: center;
      background-color: $color-lightergrey;
      overflow: hidden;
      cursor: pointer;
      &::before {
        position: absolute;
        content: " ";
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        border-bottom: 1px solid white;
        z-index: 1;
      }
      img {
        display: block;
        width: 100%;
        height: auto;
        margin: 0 auto;
        @include transition(opacity);
      }
      &:hover {
        img {
          opacity: 0.3;
        }
        .track-btn-player {
          opacity: 1;
        }
      }
    }
    .track__cover--show {
      img {
        opacity: 0.3;
      }
    }
    .track-btn-player {
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      left: 50%;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background-color: #000;
      opacity: 0;
      @include transition(opacity);
      cursor: pointer;
      z-index: 4;
    }
    .track-btn-player--show {
      opacity: 1;
    }
    .track-btn-player__element {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      cursor: pointer;
    }
    .track-btn-player__play {
      position: absolute;
      top: 50%;
      left: 56%;
      transform: translate(-50%, -50%);
      border-top: 16px solid transparent;
      border-left: 24px solid #fff;
      border-bottom: 16px solid transparent;
    }
    .track-btn-player__pause {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 24px;
      height: 36px;
      &::before,
      &::after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        width: 8px;
        background-color: #fff;
        border-radius: 10px;
      }
      &::before {
        left: 0;
      }
      &::after {
        right: 0;
      }
    }
    .track__name {
      position: relative;
      flex-basis: 16%;
      height: 100%;
      margin-right: 5.4%;
      display: flex;
      flex-direction: column;
      @media (max-width: 700px) {
        flex-basis: 20%;
      }
    }
    .track__name-info {
      display: flex;
      @media (max-width: $responsive-tablet) {
        display: none;
      }
    }
    .track__name-wrapper {
      $font-size: 16px;
      $line-height: 1.3;
      $lines-to-show: 2;
      display: block;
      display: -webkit-box;
      max-height: $font-size*$line-height*$lines-to-show;
      margin: 0 auto 4px 0;
      font-size: $font-size;
      line-height: $line-height;
      font-weight: 700;
      -webkit-line-clamp: $lines-to-show;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      z-index: 1;
      a {
        cursor: pointer;
        &:hover {
          color: $color-link-hover;
        }
      }
    }
    .track-banner {
      position: relative;
      font-size: 10px;
      padding: 2px 4px;
      margin-right: 8px;
      color: white;
      background-color: #B2C9D5;
      z-index: 3;
      cursor: pointer;
    }
    .track-banner__desc {
      position: absolute;
      bottom: 20px;
      left: 48px;
      font-size: 14px;
      line-height: 1.4;
      // text-indent: 1em;
      width: 464px;
      padding: 8px 16px;
      background-color: white;
      color: $color-body;
      border: 1px solid #B2C9D5;
      z-index: 2;
    }

    .track-banner__item {
      display: flex;
      align-items: center;
      padding-left: 8px;
      margin-bottom: 4px;
      text-indent: inherit;
    }

    .track-banner__item:first-child {
      margin-top: 4px;
    }

    .track-banner__icon {
      width: 16px;
      height: auto;
      margin-right: 8px;
      fill: #B2C9D5;
    }


    .track-pro {
      .track-banner__desc {
        left: 24px;
      }
    }
    .track__name:hover+.track__cover .track-btn-player {
      opacity: 1;
    }
    .track__author {
      position: relative;
      flex-basis: 14%;
      margin-right: 3%;

      @media (max-width: 700px) {
        flex-basis: 20%;
      }
    }
    .track__author-wrapper {
      @include text-overflow;
      z-index: 1;
      a {
        &:hover {
          color: $color-link-hover;
        }
      }
    }
    .track__info {
      flex-basis: 10%;
    }
    .track-tags {
      flex-basis: 30%;
      margin-right: 1.5%;
      @include text-overflow;
      z-index: 1;

      @media(max-width: $responsive-tablet) {
        display: none;
      }

      @media(max-width: $responsive-mobile) {
        display: block;
      }
    }
    .track-tags__tag {
      font-size: 14px;
      font-weight: 300;
      line-height: 1.5;
      padding: 4px 8px;
      margin-right: 8px;
      margin-bottom: 8px;
      color: #828282;
      background-color: #F1F1F1;
      border-radius: 4px;
      @include transition(all);
      &:hover {
        color: white;
        background-color: $color-btn-hover;
        border-color: $color-btn-hover;
      }
    }
    .track__duration {
      flex-basis: 6%;
      margin-right: 1.5%;
      text-align: right;
    }
    .track__bpm {
      flex-basis: 6%;
      margin-right: 1.5%;
      text-align: right;

      @media (max-width: 700px) {
        display: none;
      }
    }
    .track__btn {
      flex-basis: 13%;
      text-align: right;
      z-index: 1;
      display: flex;
      justify-content: flex-end;

      @media (max-width: $responsive-tablet) {
        flex-basis: 26%;
      }

      .btn {
        @media (max-width: 610px) {
        display: none;
      }
      }
    }
    .app-track-mobile {
      position: relative;
      display: none;
      align-items: center;
      min-height: 84px;
      width: 100%;
      @media (max-width: $responsive-mobile) {
        display: flex;
        .col-left {
          flex-basis: 10%;
          .track__cover-mobile {
            display: flex;
            align-items: center;
            align-self: flex-start;
            flex-basis: 40px;
            flex-shrink: 0;
            flex-grow: 0;
            width: 40px;
            height: auto;
            margin-right: 8px;
            text-align: center;
            background-color: $color-lightergrey;
            overflow: hidden;
            img {
              display: block;
              width: 100%;
              height: auto;
              margin: 0 auto;
            }
          }
        }
        .col-center {
          flex-basis: 70%;
        }
        .col-center-top {
          display: flex;
          width: 100%;
          margin-bottom: 4px;
          .track__name {
            $font-size: 14px;
            $line-height: 1.3;
            $lines-to-show: 1;
            flex-basis: 40%;
            display: -webkit-box;
            max-height: $font-size*$line-height*$lines-to-show;
            font-size: $font-size;
            line-height: $line-height;
            -webkit-line-clamp: $lines-to-show;
            -webkit-box-orient: vertical;
            margin: 0 4px 0 0;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .track__author {
            flex-basis: 60%;
            font-size: 12px;
            margin: 0 4px 0 0;
            display: flex;
            align-items: flex-end;
            a {
              $font-size: 12px;
              $line-height: 1.3;
              $lines-to-show: 1;
              display: -webkit-box;
              max-height: $font-size*$line-height*$lines-to-show;
              font-size: $font-size;
              line-height: $line-height;
              -webkit-line-clamp: $lines-to-show;
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
        .col-center-bottom {
          display: flex;
          width: 100%;
          .track-tags {
            flex-basis: inherit;
          }
          .track-tags__tag {
            font-size: 12px;
            padding: 0 4px;
          }
        }
        .col-right {
          flex-basis: 16%;
        }
        .col-right-top {
          margin-bottom: 4px;
          .track__duration {
            font-size: 10px;
            font-weight: 500;
            line-height: 1.3;
          }
        }
      }
    }

    .btn-icon--hidden{
      display: none;
      @media(max-width: 610px) {
        display: block;
      }
    }
  }
</style>


