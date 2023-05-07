<template>
  <nav>
    <div class="empresa">
      <img class="logo" src="../assets/icons/logo.png">
      <h1>GeoQuest</h1>
    </div>
    <div class="navegacio">
      <!--    <router-link v-if="this.$route.name!=='Home'" :to="{name: 'Home'}">Home</router-link>-->
      <router-link to="/">Home</router-link>
      <router-link to="/login">Log In</router-link>
      <router-link to="/register">Register</router-link>
    </div>

  </nav>
</template>

<script>
export default {
  name: 'NavbarGuest'
}
</script>

<style scoped>
nav {
  background-color: #A0DEB1;
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 1;
}

.logo {
  display: flex;
  height: 100px;
  width: 100px;
  padding: 10px;
}

.navegacio, a {
  color: black;
  text-decoration: none;
  padding: 10px;
  display: flex;
  align-items: center;
}

h1 {
  float: left;
  display: flex;
  align-items: center;
  color: black;
  margin: 0;
  font-size: 50px;
}

.empresa {
  display: flex;
}
</style>