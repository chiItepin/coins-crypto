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
@import "~@vuestic/ag-grid-theme"

body
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  height: 100%

html, body
  height: 100%
  width: 100%

.ag-root-wrapper-body
  height: 100% !important
  text-align: left

.va-card__content
    overflow-wrap: anywhere !important
</style>
