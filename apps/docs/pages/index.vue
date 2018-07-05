<template lang="pug">
  .docs
    h2 Getting Started

    p Install it!
    pre(v-highlightjs="installIt")
      code.bash

    p Import it!
    pre(v-highlightjs="importIt")
      code.javascript

    p Don't forget to include styles
    <pre>icons8-components/dist/icons8-public.css</pre> add
    <pre>icons8-components/dist/icons8-components.css</pre>

</template>

<script>
  export default {
    name: 'InstallDocs',
    data () {
      return {
        installIt: `npm install --save git+https://github.com/KonstantinVlasov/icons8-components#v0.1.1`,
        importIt:
`import icons8Components from 'icons8-components'

// some config for api call (used in app-menu for example)
const config = {
  apiUrl: 'https://project.api.server',
  backendUrl: 'https://project.backend.server'
}

// hope you are using vuex, if not just create empty
const store = new Vuex.Store({})

// here we go
Vue.use(icons8Components, {store, config});

// init your app as always
new Vue({...})`
      }
    }
  }
</script>