<template lang="pug">
.loader

</template>

<script>
  import axios from 'axios'
  
  export default {
    name: 'loader',
    
  }
</script>

<style lang="scss">
  @import "../assets/css/helpers/variables.scss";
  @import "../assets/css/helpers/mixins.scss";

  .loader {
    border: 4px solid #F1F1F1; 
    border-top: 4px solid #828282;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    animation: spin 2s linear infinite;
    text-align: right;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
  }
</style>


