<template lang="pug">
  v-container(fluid)
    v-layout(column)
      v-flex.mb-3
        v-card
          v-card-title.title Исключения сайтов ({{ excludedSites.length }})
      v-flex
        v-card.table__actions
          v-card-title
            v-btn(flat color="primary" @click="addShow()") Добавить
            v-progress-circular(v-if="syncLoading" indeterminate color="primary")
            v-btn(v-else flat color="primary" @click="synchronize()") Синхронизировать
          v-data-table(:headers='headers' :items='excludedSites' hide-actions)
            template(slot='items' slot-scope='props')
              td
                v-layout(row)
                  v-flex
                    v-tooltip(bottom)
                      v-btn(icon @click="removeShow(props.item)" slot='activator')
                        v-icon(color="error") delete
                      span Удалить
                  v-flex
                    v-tooltip(bottom)
                      v-btn(icon @click="editShow(props.item)" slot='activator')
                        v-icon(color="info") edit
                      span Изменить
              td.text-xs-left.title {{ props.item.url }}
            template(slot='no-data') Нет данных

    v-dialog(
      v-model="editDialog"
      max-width="800"
      v-if="currentSite"
    )
      v-card
        v-card-title.title {{ currentSite.id ? 'Изменение шрифта-исключения' : 'Добавление шрифта в исключения' }}
        v-card-text.pa-3
          v-text-field(
            name='url'
            label='Название'
            v-model="currentSite.url"
            autofocus
            :error-messages="errors"
          )
        v-card-actions
          v-spacer
          v-progress-circular(v-if="formLoading" indeterminate color="primary")
          div(v-else)
            v-btn(color='info' flat='flat' @click='editAdd()') {{ currentSite.id ? 'Изменить' : 'Добавить' }}
            v-btn(flat, @click.native='editDialog = false') Закрыть

    v-dialog(
      v-model="removeDialog"
      max-width="800"
      v-if="currentSite"
    )
      v-card
        v-card-title.headline
          span Вы уверены, что хотите удалить из исключений шрифт
          strong.blue--text &nbsp;{{ currentSite.url }}
          span &nbsp;?
        v-card-actions
          v-spacer
          v-progress-circular(v-if="formLoading" indeterminate color="primary")
          div(v-else)
            v-btn(color='error', flat, @click="remove()") Удалить
            v-btn(flat, @click.native='removeDialog = false') Закрыть
</template>

<script>
  import { mapState } from 'vuex'
  import api from '../../../api'

  export default {
    data() {
      return {
        editDialog: false,
        currentSite: null,
        removeDialog: false,
        formLoading: false,
        syncLoading: false,
        errors: [],
        headers: [
          { text: '', value: 'actions', sortable: false, width: '80px' },
          { text: 'Название', value: 'url', sortable: false }
        ]
      }
    },
    asyncData ({ app, store }) {
      return new Promise(function (resolve) {
        store.dispatch('getExcludedSites', () => resolve())
      })
    },
    computed: {
      ...mapState({
        excludedSites: state => state.excludedSites,
      })
    },
    methods: {
      addShow() {
        this.currentSite = { url: null }
        this.editDialog = true
      },
      editAdd() {
        this.errors = []
        this.formLoading = true

        const callback = (error, excludedSite) => {
          this.formLoading = false

          if (error) {
            this.errors.push(error.message)
          } else {
            this.editDialog = false

            if (!this.currentSite.id) {
              this.currentSite.id = excludedSite.id
              this.$store.commit('addExcludedSite', this.currentSite)
            }
          }
        }

        api.saveExcludedSite(this.currentSite, callback)
      },
      editShow(site) {
        this.currentSite = site
        this.editDialog = true
      },
      removeShow(site) {
        this.currentSite = site
        this.removeDialog = true
      },
      remove() {
        this.formLoading = true

        const callback = () => {
          this.removeDialog = false
          this.formLoading = false
        }
        this.$store.dispatch('removeExcludedSite', { excludedSite: this.currentSite, callback })
      },
      synchronize() {
        this.syncLoading = true

        const callback = () => {
          this.syncLoading = false
          this.$store.dispatch('getStats')
        }
        api.synchronizeExcludedSites(callback)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .btn--floating {
    bottom: 60px;
  }

  .grid {
    background-color: #fff;
  }
</style>
