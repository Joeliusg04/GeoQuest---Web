<template>
  <nav-bar/>
  <FormulariReview class="form"/>
  <Footer/>
</template>

<script>
import FormulariReview from "@/components/FormulariReview.vue";
import NavBar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "ReviewPage",
  components: {NavBar, FormulariReview, Footer},
}
</script>

<style scoped>
.form{
  height: 100%;
}
</style>