<template>
  <div class="register">
    <h1 class="title">Sign Up</h1>
    <form action class="form" @submit.prevent="register">
      <label class="form-label" for="#email">Email:</label>
      <input
          v-model="email"
          class="form-input"
          type="email"
          id="email"
          required
          placeholder="Email"
      />
      <label class="form-label" for="#password">Password:</label>
      <input
          v-model="password"
          class="form-input"
          type="password"
          id="password"
          placeholder="Password"
      />
      <label class="form-label" for="#password-repeat"
      >Please repeat your password:</label
      >
      <input
          v-model="passwordRepeat"
          class="form-input"
          type="password"
          id="password-repeat"
          placeholder="Password"
      />
      <input class="form-submit" type="submit" value="Sign Up" />
      <p class="error" v-if="error">{{errorMsg}}</p>
    </form>
  </div>
</template>

<script>

import auth from "@/logic/auth";

export default {
  name: "RegisterView",
  data: () => ({
    email: "",
    password: "",
    passwordRepeat: "",
    error : false,
    errorMsg: ""
  }),
  methods: {
    register() {

      if (this.password!==this.passwordRepeat){
        this.error = true
        this.errorMsg = "Passwords do not match!";
      } else {

      auth.register(this.email, this.password).then(response => {
        this.$router.push("/login");
        response
        this.error = false
      }).catch(error=>{
          this.error = true
          this.errorMsg = error.response.data.error
          console.log(error)
      })
    }},
  },
}
</script>

<style scoped>
.error{
  margin: 1rem 0 0;
  color: #ff0000;
}
</style>