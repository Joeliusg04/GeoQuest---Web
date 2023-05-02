<template>
  <img alt="GeoQuest logo" src="assets/icons/logo.png">
  <h1>GeoQuest</h1>
  <MainNavbar/>
 <router-view/>
</template>

<script>


import MainNavbar from "@/components/HomeNavbar.vue";

export default {
  name: 'App',
  components: {
    MainNavbar

  }
}
</script>

<style>


img {
  width: 150px;
}


h1 {
  color: #000000;
}

body {
  background-color: #84b893;
  /*background: linear-gradient(to bottom,#3d5443,#97d1a7);*/
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
