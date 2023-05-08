<template>
  <Navbar/>
  <div>
    <h1>ERROR!</h1>
    <p>{{ test }}</p>
    <img class="errImg" src="../assets/icons/phonemap.png" alt="phonemap-error-icon">
    <img class="errImg" src="../assets/icons/robot.png" alt="robot-error-icon">
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
  data() {
    return {
      test: ""
    }
  },
  props: {
    msg: String
  },
  created() {
    if (localStorage.getItem('error') !== null) {
      this.test = localStorage.getItem('error')
      localStorage.removeItem('error')
    } else {
      this.test = "There has been an undefined error"
    }

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