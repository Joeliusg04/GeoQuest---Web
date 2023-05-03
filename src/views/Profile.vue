<template>
    <nav-bar/>
    <FormulariUser/>
    <Footer/>
  </template>
  
  <script>
  import FormulariUser from "@/components/FormulariUser.vue";
  import Footer from "@/components/Footer.vue";
  import NavBar from "@/components/Navbar.vue";
  
  export default {
    name: "ProfileView",
    components: { NavBar, FormulariUser, Footer },
  }
  
  </script>
  
  <style scoped>

  </style>