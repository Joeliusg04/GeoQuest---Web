<template>
  <div>
    <nav-bar/>
    <FormulariUser/>
    <button class="popup-button" @click="showUserStats">Mostrar UserStats</button>
    <Footer/>
    <div v-if="showPopup" class="popup">
      <button class="close-button" @click="closeUserStats">&times;</button>
      <UserStats/>
    </div>
  </div>
</template>

<script>
import FormulariUser from "@/components/FormulariUser.vue";
import Footer from "@/components/Footer.vue";
import NavBar from "@/components/Navbar.vue";
import UserStats from "@/components/UserStats.vue";

export default {
  name: "ProfileView",
  components: { UserStats, NavBar, FormulariUser, Footer },
  data() {
    return {
      showPopup: false
    };
  },
  methods: {
    showUserStats() {
      this.showPopup = true;
    },
    closeUserStats() {
      this.showPopup = false;
    }
  }
}
</script>

<style scoped>
.popup-button {
  background-color: #a0deb1;
  color: black;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #84b893;
}

.popup-button:hover{
  background-color: #84b893;
}
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 40px;
  width: 80%;
  max-width: 600px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 18px;
  color: #aaa;
  background: none;
  border: none;
  cursor: pointer;
}
</style>
