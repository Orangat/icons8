<template lang="pug">
  v-app#inspire
    v-navigation-drawer(fixed v-model='drawer' app)
      v-toolbar.transparent(flat)
        v-list.pa-0
          v-list-tile
            v-list-tile-content
              v-list-tile-title {{ $store.getters['getConfig'].user ? $store.getters['getConfig'].user.login : 'ERROR' }}
        v-list.pt-0(dense)
      v-divider
      v-list(dense)
        v-list-tile.list__tile--link(@click="$router.push('/fonts/panel/')")
          v-list-tile-action
            v-icon.teal--text.darken-4 timeline
          v-list-tile-content
            v-list-tile-title Доска
        v-list-tile.list__tile--link(@click="$router.push('/fonts/panel/collect')")
          v-list-tile-action
            v-icon.teal--text.darken-4 play_arrow
          v-list-tile-content
            v-list-tile-title Запуск
        v-list-tile.list__tile--link(@click="$router.push('/fonts/panel/sites')")
          v-list-tile-action
            v-icon.teal--text.darken-4 list
          v-list-tile-content
            v-list-tile-title Сайты
        v-list-tile.list__tile--link(@click="$router.push('/fonts/panel/fonts')")
          v-list-tile-action
            v-icon.teal--text.darken-4 spellcheck
          v-list-tile-content
            v-list-tile-title Уникальные шрифты
        v-list-tile.list__tile--link(@click="$router.push('/fonts/panel/excluded-fonts')")
          v-list-tile-action
            v-icon.teal--text.darken-4 do_not_disturb
          v-list-tile-content
            v-list-tile-title Исключения шрифтов
        v-list-tile.list__tile--link(@click="$router.push('/fonts/panel/excluded-sites')")
          v-list-tile-action
            v-icon.teal--text.darken-4 do_not_disturb
          v-list-tile-content
            v-list-tile-title Исключения сайтов
    v-toolbar(color='indigo' dark fixed app)
      v-toolbar-side-icon(@click.stop='drawer = !drawer')
      v-toolbar-title Панель управления шрифтами
      v-spacer
      v-menu(bottom right)
        v-btn(icon slot='activator' dark)
          v-icon person
        v-list
          v-list-tile(@click="logout")
            v-list-tile-title Выход
    v-content
      nuxt
    v-footer(color='indigo', app)
      span.white--text © 2018
</template>

<script>
  import api from '../api'

  export default {
    middleware: 'authenticated',
    head () {
      return {
        title: 'Fonts Panel',
        link: [
          {
            href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons',
            rel: 'stylesheet'
          }
        ],
        meta: [
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0'
          }
        ]
      }
    },
    data () {
      return {
        drawer: null
      }
    },
    methods: {
      logout () {

        const callback = () => {
          this.$router.push('/fonts/panel/login')
        }

        api.logout(callback)
      }
    }
  }
</script>

<style lang="scss">
  @import '../../../../node_modules/vuetify/dist/vuetify.min.css';

  .content {
    background-color: #eee;
  }

  .card--simple {
    border: 1px solid #E0E0E0;
    border-radius: 5px;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  }

  .table__actions .card__title {
    padding: 0;
  }

  .accent {
    background-color: #005caf !important;
    border-color: #005caf !important;
  }
</style>
