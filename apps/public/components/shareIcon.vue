<template lang="pug">
  .share-icon
    click-to-copy(v-bind:text="link")
    a.share-icon-item.is-facebook(v-bind:href="pedroLink")
      .share-icon-icon(v-html="icons.facebook")
    a.share-icon-item.is-twitter(v-bind:href="pedroLink")
      .share-icon-icon(v-html="icons.twitter")

</template>

<script>
  import twitter from '../assets/svg/twitter.svg'
  import facebook from '../assets/svg/facebook.svg'

  export default {
    name: 'shareIcon',
    props: {
      icon: {
        type: Object
      },
      text: {
        type: String,
        'default': 'Icons8'
      }
    },
    data () {
      return {
        icons: {
          twitter,
          facebook
        }
      }
    },
    computed: {
      link () {
        return `ic8.link/${this.icon.id}`
      },
      pedroLink () {
        return `https://icons8.com/pedro#/${this.icon.id}`
      }
    }
  }
</script>

<style lang="scss">
  .share-icon {
    text-align: center;
    font-size: 1rem;

    .share-icon-item {
      display: inline-block;
      position: relative;
      white-space: nowrap;
      border-radius: 3px;
      height: 2rem;
      line-height: 2rem;
      padding: 0;
      margin: 0 0.5rem;
      color: rgba(0, 0, 0, 0.25);
      fill: rgba(0, 0, 0, 0.25);
      border: none;
      vertical-align: top;
      transition: 0.3s all ease-out;
      cursor: pointer;
      text-decoration: none;

      &:last-child {
        margin-right: 0;
      }

      &.is-twitter {
        &:hover {
          fill: rgba(0, 183, 236, 0.7);
        }
      }
      &.is-facebook {
        &:hover {
          fill: rgba(66, 84, 151, 0.7);
        }
      }
      &.is-google {
        &:hover {
          fill: rgba(221, 66, 65, 0.7);
        }
      }
    }

    .share-icon-icon {
      display: inline-block;
      width: 1.25rem;
      height: 2rem;
      vertical-align: top;
      &>svg {
        width: 100%;
        height: 100%;
      }
    }

    .click-to-copy {
      font-size: 1rem;
    }
  }
</style>
