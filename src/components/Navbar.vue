<template>
  <nav>
    <img class="logo" src="../assets/icons/logo.png">
    <h1>GeoQuest</h1>
    <div class="navegacio">
      <router-link to="/">Home</router-link>
      <router-link to="/map">Map</router-link>
      <router-link to="/profile">Profile</router-link>
      <router-link to="/management">Management</router-link>
      <router-link to="/treasure/1">Treasure</router-link>
      <router-link to="/error/404">Error</router-link>
      <button @click="logout">Log Out</button>
      <!--      -->
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    logout() {
      localStorage.setItem("logged", "false");
      this.$forceUpdate()
      this.$router.push({name: 'Home'});
    }
  }
}
</script>

<style scoped>

nav {
  background-color: #A0DEB1;
  display: flex;
  justify-content: space-between;
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

.navegacio {
  padding-right: 20px;
}

h1 {
  display: flex;
  align-items: center;
  color: black;
}


button {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}
</style>