<template lang="pug">
  .app-accordion
    icon-sidebar
</template>

<script>
  export default {
    name: 'appAccordion',
    serverCacheKey: props => JSON.stringify(props),
    props: {
      locale: {
        type: String,
        'default': 'en-US'
      }
    }
  }
</script>

<style lang="scss">
  @import '../../../icon/assets/css/variables';
  @import '../../../icon/assets/css/breakpoints';
  @import '../../assets/css/mixins';

  .grid .app-accordion .icon-sidebar{
    .app-left-sidebar-content {
      width: 3%;
    }
  }

  .app-accordion {
    width: 100%;

    .icon-sidebar {
      background: #f1f1f1;
      background: linear-gradient(to bottom, #e8e8e8 0%, #f3f3f3 20%, #f3f3f3 100%);
      margin: 0 -42px;
      padding: 25px;
      overflow: hidden;

      @media (max-width: 940px) {
        padding: 25px 15px;
      }

      .app-left-sidebar-content {
        width: 10%;
        float: left;
        padding: 30px 0;

        @media (max-width: 940px) {
          padding: 25px 0;
        }
      }

      .icon-toolbar {
        padding: 10px 0;
        height: 100%;
        border-right: 1px solid $color-grey-light;
        width: 65px;
        border-bottom: none;

        @media (max-width: 940px) {
          width: 50px;
        }
      }

      .icon-recolor {
        display: block;
        top: 5px;
        margin-left: 3px;
      }

      .icon-effects {
        display: block;
      }

      .app-right-sidebar-content {
        overflow: hidden;
        width: 90%;
        float: left;
      }

      .icon-workspace {
        padding: 40px 0 0 40px;
        overflow-y: initial;
        position: relative;
        top: 0;

        @media (max-width: 940px) {
          padding: 30px 0 0 20px;
        }
      }

      .app-ads {
        display: none;
      }

      .actions {
        width: 338px;
        @media (max-width: 1050px) {
          width: 250px;
        }

        & > .button {
          width: 40.5%;
          font-size: 14px;
        }

        & > .button.is-gray {
          width: 55.5%;
          font-size: 14px;
        }
      }

      .icon-workspace {
        padding: 40px 0 0 40px;
        overflow-y: initial;
        position: relative;
        top: 0;

        @media (max-width: 940px) {
          padding: 30px 0 0 20px;
        }

        .download-icon {
          max-width: none;
        }

        .title {
          @include font-medium;
          font-family: 'Helvetica Neue', sans-serif;
          font-size: 32px;
          color: #000000;
          margin-bottom: 4px;
          border-bottom: 1px solid #4a4a4a;

          &:hover {
            border: none;
          }

          @media (max-width: 940px) {
            font-size: 28px;
          }
        }

        .content {
          text-align: center;
          padding: 0;
        }

        .left-side-workspace {
          float: left;
          width: 40%;
          max-width: 280px;
          height: 280px;
          margin-bottom: 32px;

          @media (max-width: 940px) {
            height: 240px;
          }

          .icon {
            width: 100%;
            height: 100%;
            box-shadow: 0 16px 48px rgba(0, 0, 0, 0.1);
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 0;
            margin-bottom: 0;
          }
        }
      }


      .right-side-workspace {
        float: left;
        text-align: left;
        margin: 40px 0 0 40px;
        width: 52%;

        @media (max-width: 1050px) {
          margin: 35px 0 0 20px;
        }
      }

      .download-icon.is-compact > .download-selector {
        margin: 10px 0 15px;
      }

      .category {
        color: rgba(0, 0, 0, 0.7);
        font-weight: 400;
      }

      .icon-effects {
        padding: 0;
      }

      .icon-effects-item {
        display: block;
        margin-top: 28px;

        @media (max-width: 940px) {
          margin-top: 23px;
        }

        &.is-divider {
          margin: 28px 0 0;
          width: 32px;
          border-bottom: 1px solid #c2c2c2;
          height: 1px;
        }

        &.Recolor {
          display: block;
          position: relative;
          margin: 0 0 0 -1px;
          vertical-align: top;
          height: 32px;
          padding-top: 5px;
        }
      }

      .similar-icons {
        position: relative;
        width: 100%;
        background: none;
        margin: 0 0 0 40px;
        padding-right: 42px;

        @media (max-width: 940px) {
          margin-left: 20px;
          padding-right: 20px;
        }

        & > .similar-icons-icon {
          display: inline-block;
          width: 88px;
          height: 96px;
          border-radius: 6px;
          transition: all 0.5s;

          .ios-turn-on-off {
            display: none;
          }

          &.is-active {
            background: rgba(0, 0, 0, 0.05);
            box-shadow: none;
          }

          &:hover {
            background: rgba(0, 0, 0, 0.03);
          }
        }

      }

      .transparent-background {
        background: #fff;
      }

      div.format {
        min-width: 85px;
      }

      div.size {
        min-width: 154px;
      }
    }

    .panel.app-popup-content {
      top: 0;
      left: 0;
      transform: translate(0%, 0%) scale(1);
      border-radius: 6px;
      border: none;
      box-shadow: 0 4px 24px -4px rgba(0,0,0,0.3);
      font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', 'Segoe UI', 'Fira Sans', Roboto, Oxygen, Ubuntu, 'Droid Sans', 'Arial', sans-serif;
    }

    .list > .list-item {
      line-height: 32px;

      &.is-active {
        background-color: #5CA3FD;
      }
    }
  }



</style>
