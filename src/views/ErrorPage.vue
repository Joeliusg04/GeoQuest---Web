<template>
  <Navbar v-if="loggedIn" />
  <NavbarGuest v-else/>
  <div>
    <h1>ERROR!</h1>
    <p>{{ msg }}</p>
    <img class="errImg" src="../assets/icons/phonemap.png" alt="phonemap-error-icon">
    <img class="errImg" src="../assets/icons/robot.png" alt="robot-error-icon">
  </div>
  <Footer/>
</template>


<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import NavbarGuest from "@/components/NavbarGuest.vue";

export default {
  name: 'ErrorPage',
  components: {
    Navbar,
    Footer,
    NavbarGuest
},
  data() {
    return {
      msg: ""
    }
  },
  created() {
    if (this.error !== null) {
      this.msg = this.error

    } else {
      this.msg = "There has been an undefined error"
    }

  },
  beforeUnmount() {
    localStorage.removeItem('error')
  },
  computed: {
    error(){
      console.log("a")
      return JSON.parse(localStorage.getItem('error'))
    },
    loggedIn(){
      return this.$store.state.auth.status.loggedIn;
    }
  }
}
</script>

<style scoped>
div {
  padding: 10rem 5rem 10rem 5rem;
}

.errImg {
  width: 150px;
  height: 150px;
}
</style>