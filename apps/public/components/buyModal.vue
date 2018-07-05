<template lang="pug">
  .buy-modal
    app-modal(
      ref="modal"
      name="buy-modal"
      v-bind:content-class="['buy-form', {'is-loading': isLoading}]"
    )
      .method(v-on:click="select('stripe')")
        .icon(v-html="icons.creditCard")
        | Credit Card
      .method(v-on:click="select('paypal')")
        .icon(v-html="icons.payPal")
        | PayPal
</template>

<script>
  import creditCard from '../assets/svg/credit-card.svg'
  import payPal from '../assets/svg/paypal.svg'
  import axios from 'axios'
  import config from '../plugins/config'

  export default {
    name: 'BuyModal',
    props: {
      license: {
        'default' () {
          return {
            id: 'photos',
            returnUrl: '/profile/downloads'
          }
        }
      }
    },
    data () {
      return {
        isLoading: false,
        icons: {
          creditCard,
          payPal
        }
      }
    },
    methods: {
      select (provider) {
        if (this.isLoading) {
          return
        }
        this.isLoading = true
        const orderItem = {
          product: this.license.id
        }
        if (this.license.quantity) {
          orderItem.quantity = this.license.quantity
        }
        const order = {
          items: [orderItem]
        }
        axios.request({
          url: `/api/order/create`,
          baseURL: config.apiUrl,
          method: 'post',
          data: {
            order,
            provider,
            back_url: config.backendUrl + this.license.returnUrl
          },
          withCredentials: true
          /**
           * @param response.data.order
           * @param response.data.order.processing
           * @param response.data.order.processing.processing_url
           * @param response.data.order.processing.stripe_public_key
           */
        }).then(response => {
          console.log('response.data', response.data)
          this.isLoading = false
          this.$modal.hide('buy-modal')
          if (response.data.order && response.data.order.processing) {
            const url = response.data.order.processing.processing_url

            if (provider === 'stripe') {
              const publicKey = response.data.order.processing.stripe_public_key
              this.openStripe(url, publicKey)
            } else {
              location.href = url
            }
          } else {
            this.$notify({
              type: 'error',
              title: 'something went wrong, we already working on it!'
            })
          }
        })
          .catch(error => {
            console.log('error', error)
            this.isLoading = false
          })
      },
      openStripe (url, publicKey) {
//        const price = this.license.priceDollar ? this.license.priceDollar : this.license.price.replace('$', '')
//        scope.description = this.license.descStripe || license.name
//        if (license.quantity && license.quantity > 1) {
//          price = parseFloat(price) * license.quantity
//          scope.description = license.quantity + ' icons'
//        }
//        scope.amount = Math.round(parseFloat(price) * 100).toString()
//
//        scope.event = 'stripe:' + license.id
//        scope.deffered = deffered
//        scope.autoStart = false
//        scope.label = `Pay $${(scope.amount / 100).toFixed(2)}`
//        if (license.id === 'vector_access_month_19_9') {
//          scope.label += '/monthly'
//        }
//        if (license.id === 'vector_access_year_199') {
//          scope.label += '/yearly'
//        }
//        /*   scope.actionStripe = actionStripe; */
//        angular.element(document.body).append($compile('<stripe-button deffered="deffered" ' +
//          'auto-start="' + scope.autoStart + '" ' +
//          'key="' + scope.key + '" ' +
//          'amount="' + scope.amount + '" ' +
//          'description="' + scope.description + '" ' +
//          'label="' + scope.label + '" ' +
//          /*      ' action-stripe="' + scope.actionStripe + '" ' + */
//          'event="' + scope.event + '"></stripe-button>')(scope))
//        btnStripes[license.id] = true
//
        const container = document.createElement('stripe-button')
        container.setAttribute('deffered', 'deffered')
        container.innerText = 'test'
        document.body.appendChild(container)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/css/variables';
  @import '../assets/css/mixins';

  .buy-modal {
    & /deep/ .buy-form {
      padding: 0;
      width: 400px;
      text-align: center;
      transition: 0.3s background-color ease;

      @media (max-width: 440px) {
        width: 320px;
        min-width: 320px;
      }

      &.is-loading {
        @include loading;
        filter: grayscale(80%);
        .method:hover {
          background-color: transparent;
        }
      }

      .method {
        display: inline-block;
        width: 200px;
        height: 200px;
        cursor: pointer;
        transition: 0.3s background-color ease;
        &:hover {
          background-color: #eee;
        }
        @media (max-width: 440px) {
          width: 160px;
          height: 160px;
        }
      }
      .icon {
        width: 100px;
        height: 100px;
        margin: 30px 50px 10px;
        @media (max-width: 440px) {
          width: 80px;
          height: 80px;
          margin: 20px 40px 10px;
        }
      }
    }
  }
</style>
