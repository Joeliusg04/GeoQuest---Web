<template>
  <nav-bar/>
  <FormulariUser/>
  <UserStats/>
  <Footer/>
</template>

<script>
import FormulariUser from "@/components/FormulariUser.vue";
import Footer from "@/components/Footer.vue";
import NavBar from "@/components/Navbar.vue";
import UserStats from "@/components/UserStats.vue";

export default {
  name: "ProfileView",
  components: {UserStats, NavBar, FormulariUser, Footer},
}

</script>

<style scoped>

</style>