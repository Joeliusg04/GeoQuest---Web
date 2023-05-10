<template>
  <nav>
    <div class="empresa">
      <img class="logo" src="../assets/icons/logo.png" alt="geoquest-logo">
      <h1>GeoQuest</h1>
    </div>
    <div class="navegacio">
      <router-link to="/">Home</router-link>
      <router-link to="/map">Map</router-link>
      <router-link to="/profile">Profile</router-link>
      <router-link v-if="Admin" to="/management">Management</router-link>
      <button @click="logout">Log Out</button>
      <!--      -->
    </div>
  </nav>
</template>

<script>
import AuthService from "@/services/auth.service";

export default {
  name: "NavBar",
  methods: {
    logout() {

      this.$store.dispatch("auth/logout")
      AuthService.logout()
      this.$router.push("/home");
    }
  },
  computed: {
    admin(){
      return this.$store.state.auth.status.user.role==="Admin";
    }
  }
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