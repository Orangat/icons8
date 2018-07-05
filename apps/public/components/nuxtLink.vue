<template lang="pug">
  router-link(v-bind="$attrs" v-on="$listeners")
    slot
</template>

<script>
  export default {
    name: 'nuxtLink',
    inheritAttrs: true
  }
</script>