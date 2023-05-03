<template>
  <nav-bar/>
  <FormulariTreasure/>
  <Footer/>
</template>

<script>
import FormulariTreasure from "@/components/FormulariTreasure.vue";
import Footer from "@/components/Footer.vue";
import NavBar from "@/components/Navbar.vue";

export default {
  name: "ProfileView",
  components: { NavBar, Footer, FormulariTreasure },
}

</script>

<style scoped>

</style>
    