<template lang="pug">
  .music
    app-page.is-music
      nuxt
    player
    app-footer.is-music
    .modal-overlay(v-bind:class="{'modal-overlay--show': isShowModalOverlay}"
                   v-on:click="hideModalOverlay")
    login-modal
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  head () {
    return {
      ...this.seo
    }
  },
  mounted() {
      var vm = this;
      const enter = 13;
      document.addEventListener('keyup', function (event) {
        if (event.keyCode == enter) {
          vm.hideModalOverlay()
        }
      })
    },
  computed: {
    ...mapState({
      seo: state => state.seo.data,
      isShowModalOverlay: state => state.isShowModalOverlay
    })
  },
  methods: {
    ...mapMutations({
      hideModalOverlay: "HIDE_MODAL"
    }),
  }
}
</script>


<style lang="scss">
@import "../assets/css/helpers/mixins.scss";
@import "../assets/css/helpers/variables.scss";

.music {
  .app-page.is-music {
    position: static;
  }
  .app-footer.is-music {
    padding-bottom: 80px;
    @media (max-width: $responsive-mobile) {
      padding-bottom: 68px;
    }
  }

  .modal-overlay {
    position: fixed;
    display: none;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    background-color: rgba(0,0,0,0.5);
    z-index: 3;

    &.modal-overlay--show {
      display: block;
      animation: fade 0.5s;
      animation-fill-mode: forwards;
    }
  }

  .app-menu {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    background-color: transparent;
    @media (max-width: 800px) {
      display: none;
    }
  }

  @keyframes fade {
    from { opacity: 0; }
    to {opacity: 1;}
  }
}

</style>

