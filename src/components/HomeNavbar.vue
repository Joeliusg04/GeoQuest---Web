<template>
  <nav>
<!--    <router-link v-if="this.$route.name!=='Home'" :to="{name: 'Home'}">Home</router-link>-->
    <router-link to="/home">Home</router-link>
    <router-link :to="{name: 'Login'}">Login</router-link>
    <router-link :to="{name:'Register'}">Register</router-link>
    <router-link to="/map">Map</router-link>
  </nav>
</template>

<script>


export default {
  name: "HomeNavbar"
}

</script>

<style scoped>


nav {
  display: flex;
  background-color: #3d5443;
}

nav * {
  padding: 1.5rem;
  color: #a0deb1;
}
</style>