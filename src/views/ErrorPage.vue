<template>
  <Navbar/>
  <div>
    <h1>ERROR!</h1>
    <p>{{ msg }}</p>
    <img class="errImg" src="../assets/icons/phonemap.png">
    <img class="errImg" src="../assets/icons/robot.png">
  </div>
  <Footer/>
</template>


<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: 'ErrorPage',
  components: {
    Navbar,
    Footer
  },
  props: {
    msg: String
  }
}
</script>

<style scoped>
div {
  padding: 5rem;
}

.errImg {
  width: 150px;
  height: 150px;
}
</style>