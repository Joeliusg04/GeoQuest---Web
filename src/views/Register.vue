<template>
  <NavbarGuest/>
  <div class="register">
    <h1 class="title">Sign Up</h1>
    <form action class="form" @submit.prevent="register">
      <div class="input">
        <img src="../assets/icons/user.png" alt="user-icon">
        <input v-model="nickname" class="form-input" type="text" id="username" required placeholder="Username">
      </div>
      <div class="input">
        <img src="../assets/icons/email.png" alt="email-icon">
        <input v-model="email" class="form-input" type="email" id="email" required placeholder="Email"/>
      </div>
      <div class="input">
        <img src="../assets/icons/candado.png" alt="lock-icon">
        <input v-model="password" class="form-input" type="password" id="password" placeholder="Password"/>
      </div>
      <div class="input">
        <img src="../assets/icons/candado.png" alt="lock-icon">
        <input v-model="passwordRepeat" class="form-input" type="password" id="password-repeat"
               placeholder="Repeat your password"/>
      </div>
      <div class="check">
        <input type="radio" name="policy" id="terms" value="true" required
               title="You must accept in order to register in GeoQuest!"><label for="#terms">I have read and accept the
        privacy policy</label>
      </div>
      <div class="check">
        <input type="checkbox" name="promotion" id="promotion" value="true"><label for="#promotion">I accept receiving
        promotional emails</label>
      </div>
      <p class="error" v-if="error">{{ errorMsg }}</p>
      <input class="form-submit" type="submit" value="Sign Up"/>
      <p>Already have an account?
        <router-link to="/login">Sign in</router-link>
      </p>
    </form>
  </div>
  <Footer/>
</template>

<script>
import NavbarGuest from "@/components/NavbarGuest.vue";
import Footer from "@/components/Footer.vue";
import { SHA256 } from 'crypto-js';

export default {
  name: "RegisterView",
  components: {NavbarGuest, Footer},
  data: () => ({
    nickname: "",
    email: "",
    password: "",
    passwordRepeat: "",
    error: false,
    errorMsg: ""
  }),
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/map");
    }
  },
  methods: {
    register() {
      if (this.checkPasswordSecurity()) {
        if (this.password !== this.passwordRepeat) {
          this.error = true;
          this.errorMsg = "Passwords do not match!";
        } else {
          const encryptedPass = SHA256(this.password).toString();
          const user = {
            email: this.email,
            password: encryptedPass,
            nickname: this.nickname
          };

          this.$store.dispatch("auth/register", user).then(
              () => {
                this.$router.push("/login")
              }
          ).catch(
              (error) => {

                if (error.response.data === 409){
                  this.error = true
                  this.errorMsg = "This username already exists"
                }


              }
          )
        }
      }
    },
    checkPasswordSecurity() {

      const uppercaseRegex = /[A-Z]/;
      const lowercaseRegex = /[a-z]/;
      const numberRegex = /[0-9]/;

      if (this.password.length < 8) {
        this.error = true;
        this.errorMsg = "Password too short. Minimum 8 characters";
        return false;
      }

      if (!uppercaseRegex.test(this.password)) {
        this.error = true;
        this.errorMsg = "Password must contain an upper case letter";
        return false;
      }

      if (!lowercaseRegex.test(this.password)) {
        this.error = true;
        this.errorMsg = "Password must contain a lower case letter";
        return false;
      }

      if (!numberRegex.test(this.password)) {
        this.error = true;
        this.errorMsg = "Password must contain a number";
        return false;
      }

      if (this.password !== this.passwordRepeat) {
        this.error = true;
        this.errorMsg = "Passwords do not match"
        return false
      }
      return true;
    },
  },
}
</script>

<style scoped>
.error {
  margin: 1rem 0 0;
  color: #ff0000;
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

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.register {
  width: 25%;
  padding: 5rem;
  border: black solid 2px;
  margin: 7rem auto;
  background-color: #e8ecde;
}

.check {
  display: flex;
}

.form-input {
  flex: 1;
  margin-left: 0.5rem;
  border: none;
}

.title {
  text-align: center;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

img {
  height: 20px;
  width: 20px;
}

.form-submit:hover {
  background-color: #4e6a55;
}

.form-submit {
  margin-top: 1rem;
  background-color: #3e8e41;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
}
</style>