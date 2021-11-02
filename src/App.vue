<template>
  <NavBar />

  <main class="container">
    <router-view />
  </main>
</template>

<script>
import NavBar from './components/ui/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar,
  },
};
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;1,700&display=swap')
@import url('https://fonts.googleapis.com/icon?family=Material+Icons')
@import "./styles/main.sass"

body
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
</style>
