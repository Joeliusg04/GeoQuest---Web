<template>
  <nav>
    <img class="logo" src="../assets/icons/logo.png">
    <h1>GeoQuest</h1>
    <div class="navegacio">
      <router-link to="/map">Map</router-link>
      <router-link to="/profile">Profile</router-link>
      <router-link to="/logout">Log Out</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>

</style>