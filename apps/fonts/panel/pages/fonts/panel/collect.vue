<template lang="pug">
  v-container(fluid).main
    v-layout(v-if='loading' justify-center)
      v-flex.progress
        v-card
          v-card-title
            .text-xs-center.title(style="width: 100%") Происходит сбор данных о шрифтах
          v-card-text.text-xs-center
            v-progress-circular(
              indeterminate
              color='primary'
            )
    v-layout(v-else column align-center)
      v-flex
        v-layout(row)
          v-flex
            v-layout(column)
              v-flex.date.text-xs-center {{ dateFromFormatted ? `от ${dateFromFormatted}` : 'Месяц от' }}
              v-flex.mr-3
                v-date-picker(
                  v-model='dateFrom'
                  type='month'
                  :max="getMaxFrom()"
                  locale="ru-ru"
                )
          v-flex
            v-layout(column)
              v-flex.date.text-xs-center {{ dateToFormatted ? `до ${dateToFormatted}` : 'Месяц до' }}
              v-flex
                v-date-picker(
                v-model='dateTo'
                type='month'
                :max="getMaxTo()"
                :min="getMinTo()"
                locale="ru-ru"
              )
      v-flex.mt-3(style="width: 170px")
        v-tooltip(top)
          v-switch(label="Перезаписать" v-model="override" hide-details color="primary" slot="activator")
          span Если выключено - не будет собирать информацию о существующих сайтах
      v-flex
        v-btn.mt-3(
          @click="startCollector"
          color="primary"
          :disabled="buttonDisabled"
        ) Запустить сборщика
</template>

<script>
  import api from '../../../api'
  export default {
    data() {
      return {
        override: false,
        dateFrom: null,
        dateTo: `${(new Date).getFullYear()}-${(new Date).getMonth() + 1}`
      }
    },
    asyncData ({ app, store }) {
      return new Promise(function (resolve) {
        const callback = (result) => {
          store.commit('setIsInProgress', result.data.isInProgress)
          resolve()
        }
        api.isInProgress(callback)
      })
    },
    computed: {
      dateFromFormatted: function() {
        return this.formatDate(this.dateFrom)
      },
      dateToFormatted: function() {
        return this.formatDate(this.dateTo)
      },
      loading: function() {
        return this.$store.getters['getIsInProgress']
      },
      buttonDisabled: function() {
        return !this.dateFrom || !this.dateTo
      }
    },
    methods: {
      formatDate(date) {
        if (date) {
          const dateArray = date.split('-')

          return `${dateArray[1]}.${dateArray[0]}`
        }

        return null
      },
      startCollector() {
        const yearFrom = this.dateFrom.split('-')[0]
        const monthFrom = this.dateFrom.split('-')[1]
        const yearTo = this.dateTo.split('-')[0]
        const monthTo = this.dateTo.split('-')[1]
        this.$store.commit('setIsInProgress', true);

        const callback = () => {
          this.$store.commit('setIsInProgress', false)
          store.dispatch('getStats', () => resolve())
        }

        api.collect(yearFrom, monthFrom, yearTo, monthTo, this.override, callback)
      },
      getMaxFrom() {
        const date = new Date()
        const dateTo = this.dateTo ? this.dateTo : `${date.getFullYear()}-${date.getMonth() + 1}`
        const yearTo = dateTo.split('-')[0]
        const monthTo = dateTo.split('-')[1]
        let maxYearFrom = yearTo
        let maxMonthFrom = parseInt(monthTo)

        return `${maxYearFrom}-${maxMonthFrom}`
      },
      getMinTo() {
        const date = new Date()
        const dateFrom = this.dateFrom ? this.dateFrom : `${date.getFullYear()}-${date.getMonth()}`
        const yearFrom = dateFrom.split('-')[0]
        const monthFrom = dateFrom.split('-')[1]
        let minYearTo = yearFrom
        let minMonthTo = parseInt(monthFrom)

        return `${minYearTo}-${minMonthTo}`
      },
      getMaxTo() {
        const date = new Date()
        return `${date.getFullYear()}-${date.getMonth() + 1}`
      }
    }
  }
</script>

<style lang="scss">
  .progress {
    max-width: 500px;
  }

  .date {
    margin-bottom: 10px;
    font-size: 34px;
    font-weight: bold;
  }
</style>
