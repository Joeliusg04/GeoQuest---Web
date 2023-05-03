<template>
  <navbar-guest/>
  <div class="login">
    <h1 class="title">Login</h1>
    <form action class="form" @submit.prevent="login">
      <div class="input">
        <img src="../assets/icons/user.png">
      <input
          v-model="email"
          class="form-input"
          type="text"
          id="username"
          required
          placeholder="Username"
      />
    </div>
    <div class="input">
      <img src="../assets/icons/candado.png">
      <input
          v-model="password"
          class="form-input"
          type="password"
          id="password"
          placeholder="Password"
      />
    </div>
      <p v-if="error" class="error">
        {{ errorMsg }}
      </p><br>
      <input class="form-submit" type="submit" value="Login"/>
    </form>
  </div>
  <Footer/>
</template>

<script>
import auth from "@/logic/auth";
import NavbarGuest from "@/components/NavbarGuest.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "LoginView",
  components: {NavbarGuest, Footer},
  data: () => ({
    email: "",
    password: "",
    error: false,
    errorMsg: ""
  }),
  methods: {
    login() {
      auth.login(this.email, this.password)
          .then(response => {
                response
                localStorage.setItem("logged","true")
                this.$router.push("/map");
              }
          ).catch(error => {
        console.log(error)
            this.error = true;
            this.errorMsg = error.response.data.error
          }
      );
    }
  }
}
</script>

<style scoped>

.error {
  margin: 1rem 0 0;
  color: #ff0000;
}
.login{
  width: 15%;
  margin: auto;
  padding: 5rem;
  border: black solid 2px;
}
img{
  height: 20px;
  width: 20px;
}

</style>