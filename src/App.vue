<template>
  <div id="app">
    <Cookie />
  </div>
</template>

<script>
import Cookie from "./components/Cookie.vue";

export default {
  name: "app",
  components: {
    Cookie
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
