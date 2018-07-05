<template lang="pug">
  .app-notify(v-bind:style="styles")
    transition-group(name="app-notify")
      .notify(
        v-for="notify in notifications"
        v-bind:key="notify.id"
        v-bind:class="notify.type"
      )
        .notify-title(v-if="notify.title" v-html="notify.title")
        div(v-html="notify.text")
</template>

<script>
  import notifyPlugin from './index'

  const Id = (i => () => i++)(0)
  const STATE = {
    idle: 0,
    destroyed: 1
  }

  export default {
    name: 'appNotify',
    data () {
      return {
        notifications: [],
        duration: 5000
      }
    },
    computed: {
      styles () {
        return {
          width: '300px',
          right: 0,
          top: '0.75rem'
        }
      }
    },
    created () {
      if (process.server) return
      notifyPlugin.event.$on('add', this.add)
    },
    methods: {
      add (event) {
        let duration = event.duration || this.duration
        let { title, text, type } = event

        const notify = {
          id: Id(),
          title,
          text,
          type,
          state: STATE.idle,
          duration
        }

        if (duration > 0) {
          notify.timer = setTimeout(() => {
            this.destroy(notify)
          }, notify.duration)
        }

        this.notifications.unshift(notify)
      },
      destroy (notify) {
        clearTimeout(notify.timer)
        notify.state = STATE.destroyed
        this.clean()
      },
      clean () {
        this.notifications = this.notifications.filter(n => n.state !== STATE.destroyed)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/css/variables';

  .app-notify {
    position: fixed;
    z-index: 2000;

    .notify {
      padding: 0.5rem 0.75rem;
      margin: 0 0.75rem 0.75rem;
      font-size: 13px;
      text-align: left;
      color: $color-font-dark;
      border-radius: 4px;
      background-color: $color-grey-light;
      border: 1px solid darken($color-grey-light, 7%);
      border-left-width: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.4);
      font-weight: 400;
      overflow: hidden;

      &.warning {
        color: white;
        background-color: darken($color-orange, 6%);
        border-color: darken($color-orange, 13%);
      }
      &.error {
        color: white;
        background-color: darken($color-red, 0%);
        border-color: darken($color-red, 7%);
      }
      &.success {
        color: white;
        background-color: $color-green;
        border-color: darken($color-green, 7%);
      }
    }

    .title {
      font-weight: 500;
    }
  }

  .app-notify-enter-active, .app-notify-leave-active, .app-notify-move  {
    transition: all 0.5s ease;
  }
  .app-notify-enter, .app-notify-leave-to {
    opacity: 0;
    transform: translateY(-1rem);
  }
</style>
