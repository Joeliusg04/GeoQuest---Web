<template>
  <nav-bar/>
  <FormulariTreasure v-bind:id="this.$route.params.idTreasure"/>
  <Footer/>
</template>

<script>
import FormulariTreasure from "@/components/FormulariTreasure.vue";
import Footer from "@/components/Footer.vue";
import NavBar from "@/components/Navbar.vue";

export default {
  name: "ManagementView",
  components: {NavBar, Footer, FormulariTreasure},
  props: {
    id: String
  }
}

</script>

<style scoped>

</style>
    