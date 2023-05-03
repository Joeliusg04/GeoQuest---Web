<template>
    <nav-bar/>
    <FormulariUser/>
  </template>
  
  <script>
  import FormulariUser from "@/components/FormulariUser.vue";
  import NavBar from "@/components/Navbar.vue";
  
  export default {
    name: "ProfileView",
    components: { NavBar, FormulariUser },
  }
  
  </script>
  
  <style scoped>

  </style>