<template>
  <div class="login">
    <h1 class="title">Login</h1>
    <form action class="form" @submit.prevent="login">
      <label class="form-label" for="#email">Email:</label>
      <input
          v-model="email"
          class="form-input"
          type="email"
          id="email"
          required
          placeholder="Email"
      /><br>
      <label class="form-label" for="password">Password:</label>
      <input
          v-model="password"
          class="form-input"
          type="password"
          id="password"
          placeholder="Password"
      />
      <p v-if="error" class="error">
        {{ errorMsg }}
      </p><br>
      <input class="form-submit" type="submit" value="Login"/>
    </form>
  </div>
</template>

<script>
import auth from "@/logic/auth";

export default {
  name: "LoginView",
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
                this.$router.push({name: 'Map', params: {username: this.email}});
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
</style>