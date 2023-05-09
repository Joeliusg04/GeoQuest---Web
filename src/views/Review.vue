<template>
  <nav-bar/>
  <FormulariReview/>
  <Footer/>
</template>

<script>
import FormulariReview from "@/components/FormulariReview.vue";
import NavBar from "@/components/Navbar.vue";

export default {
  name: "ReviewPage",
  components: {NavBar, FormulariReview},
}
</script>

<style scoped>

</style>