<template>
  <navbar-guest/>
  <div class="login">
    <h1 class="title">Login</h1>
    <form action class="form" @submit.prevent="login">
      <div class="input">
        <img src="../assets/icons/user.png">
        <input
            v-model="nickname"
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
      <p>Do not have an account yet?
        <router-link to="/register">Sign in</router-link>
      </p>
    </form>
  </div>
  <Footer/>
</template>

<script>
import NavbarGuest from "@/components/NavbarGuest.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "LoginView",
  components: {NavbarGuest, Footer},
  data: () => ({
    nickname: "",
    password: "",
    error: false,
    errorMsg: ""
  }),
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/map");
    }
  },
  methods: {
    login() {
      this.$store.dispatch("auth/login", {nickname: this.nickname, password: this.password}).then(
          () => {
            this.$router.push("/map");
          },
          (error) => {
            console.log(error)
            this.error = true
            this.errorMsg = error.response.data
          }
      )
    },
  }
}
</script>

<style scoped>
.login {
  width: 25%;
  margin: auto;
  padding: 5rem;
  border: black solid 2px;
  margin-bottom: 7rem;
  margin-top: 7rem;
  background-color: #f2f2f2;
}

.title {
  text-align: center;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input {
  margin: 1rem 0;
  display: flex;
  align-items: center;
  border: 1px solid gray;
  border-radius: 5px;
  padding: 0.5rem;
  background-color: white;
}

.form-input {
  flex: 1;
  margin-left: 0.5rem;
  border: none;
}

.form-submit {
  margin-top: 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.form-submit:hover {
  background-color: #3e8e41;
}

.error {
  margin-top: 1rem;
  color: #ff0000;
  text-align: center;
}

img {
  height: 20px;
  width: 20px;
}

</style>