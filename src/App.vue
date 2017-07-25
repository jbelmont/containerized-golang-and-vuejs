<template>
  <div id="app">
    <h2>{{CONTAINERIZED_GOLANG_AND_VUEJS}}</h2>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      CONTAINERIZED_GOLANG_AND_VUEJS: 'Containerized Golang and Vuejs'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}
</style>
