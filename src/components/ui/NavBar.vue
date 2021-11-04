<template>
  <nav>
    <va-app-bar class="navbar">
      <router-link to="/">
        <va-button
          icon="home"
          color="#fff"
          flat
          :rounded="false"
        />
      </router-link>
      <va-spacer />
      <router-link to="/coins">
        <va-button
          color="#fff"
          flat
          :rounded="false"
        >
          Coins
        </va-button>
      </router-link>
      <va-button-dropdown
        size="small"
        flat
        color="#fff"
        icon="menu"
      >
        <router-link
          to="/coins/categories"
          class="link"
        >
          Categories
        </router-link>
      </va-button-dropdown>
    </va-app-bar>
  </nav>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
nav
   height: $space-l
   .navbar
        height: $space-l
        box-shadow: 0 2px 4px rgb(215 215 215)
</style>
