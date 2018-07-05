<template lang="pug">
  v-container(fluid)
    v-layout(column)
      v-flex.mb-3
        v-card
          v-card-title.title Исключения шрифтов ({{ excludedFonts.length }})
      v-flex
        v-card.table__actions
          v-card-title
            v-btn(flat color="primary" @click="addShow()") Добавить
            v-progress-circular(v-if="syncLoading" indeterminate color="primary")
            v-btn(v-else flat color="primary" @click="synchronize()") Синхронизировать
          v-data-table(:headers='headers' :items='excludedFonts' hide-actions)
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
              td.text-xs-left.title {{ props.item.title }}
            template(slot='no-data') Нет данных

    v-dialog(
      v-model="editDialog"
      max-width="800"
      v-if="currentFont"
    )
      v-card
        v-card-title.title {{ currentFont.id ? 'Изменение шрифта-исключения' : 'Добавление шрифта в исключения' }}
        v-card-text.pa-3
          v-text-field(
            name='title'
            label='Название'
            v-model="currentFont.title"
            autofocus
            :error-messages="errors"
          )
        v-card-actions
          v-spacer
          v-progress-circular(v-if="formLoading" indeterminate color="primary")
          div(v-else)
            v-btn(color='info' flat='flat' @click='editAdd()') {{ currentFont.id ? 'Изменить' : 'Добавить' }}
            v-btn(flat, @click.native='editDialog = false') Закрыть

    v-dialog(
      v-model="removeDialog"
      max-width="800"
      v-if="currentFont"
    )
      v-card
        v-card-title.headline
          span Вы уверены, что хотите удалить из исключений шрифт
          strong.blue--text &nbsp;{{ currentFont.title }}
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
        currentFont: null,
        removeDialog: false,
        formLoading: false,
        syncLoading: false,
        errors: [],
        headers: [
          { text: '', value: 'actions', sortable: false, width: '80px' },
          { text: 'Название', value: 'title', sortable: false }
        ]
      }
    },
    asyncData ({ app, store }) {
      return new Promise(function (resolve) {
        store.dispatch('getExcludedFonts', () => resolve())
      })
    },
    computed: {
      ...mapState({
        excludedFonts: state => state.excludedFonts,
      })
    },
    methods: {
      addShow() {
        this.currentFont = { title: null }
        this.editDialog = true
      },
      editAdd() {
        this.errors = []
        this.formLoading = true

        const callback = (error, excludedFont) => {
          this.formLoading = false

          if (error) {
            this.errors.push(error.message)
          } else {
            this.editDialog = false

            if (!this.currentFont.id) {
              this.currentFont.id = excludedFont.id
              this.$store.commit('addExcludedFont', this.currentFont)
            }
          }
        }

        api.saveExcludedFont(this.currentFont, callback)
      },
      editShow(font) {
        this.currentFont = font
        this.editDialog = true
      },
      removeShow(font) {
        this.currentFont = font
        this.removeDialog = true
      },
      remove() {
        this.formLoading = true

        const callback = () => {
          this.removeDialog = false
          this.formLoading = false
        }
        this.$store.dispatch('removeExcludedFont', { excludedFont: this.currentFont, callback })
      },
      synchronize() {
        this.syncLoading = true

        const callback = () => {
          this.syncLoading = false
          this.$store.dispatch('getStats')
        }
        api.synchronizeExcludedFonts(callback)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .btn--floating {
    bottom: 60px;
  }
</style>
