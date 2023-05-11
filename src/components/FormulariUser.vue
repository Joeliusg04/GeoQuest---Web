<template>
  <div class="flex">
    <div class="image-username">
      <img class="user" id="profile-pic" alt="user-profile-pic" />
      <h2>{{ user.nickName }}</h2>
      <b>Level: {{ user.userLevel }}</b>
      <div class="button">
        <label for="fileInput">
          <input type="file" id="fileInput" @change="previewImage" style="display: none" />
          <img class="upload-icon" src="../assets/icons/subir.png" alt="upload-icon" />
          <p>Change your profile picture</p>
        </label>
      </div>
    </div>
    <div class="form">
      <form>
        <div>
          <label for="nombre">Username </label>
          <div class="input-icon-container">
            <input type="text" id="nombre" name="nombre" placeholder="Username" v-model="user.nickName" readonly>
            <span class="icon-container">
            </span>
          </div>
        </div>
        <div>
          <label for="email">Mail </label>
          <div class="input-icon-container">
            <input type="text" id="email" name="email" placeholder="Mail" v-model="user.email" required />
            <span class="icon-container">
              <img class="icon" src="../assets/icons/edit.png" alt="edit-icon" />
            </span>
          </div>
        </div>
        <div>
          <label for="password">Password </label>
          <div class="input-icon-container">
            <input type="password" id="password" name="password" placeholder="●●●●●●●●●●●" required>
            <span class="icon-container">
              <img class="icon" src="../assets/icons/edit.png" alt="edit-icon" />
            </span>
          </div>
        </div>
        <input class="create" type="submit" value="Update" @click.prevent="updateUser">
        <input class="delete" type="submit" value="Delete user" @click.prevent="deleteUser">
      </form>
      <p class="error" v-if="error">{{ errorMsg }}</p>
    </div>
  </div>
</template>

<script>
import UserService from "@/services/user.service";

export default {
  name: 'FormulariUser',
  props: {},
  data() {
    return {
      FILE: "",
      user: {},
      error: false,
      errorMsg: ""

    }
  },
  mounted() {

    UserService.getCurrentUsername().then((response) => {
      UserService.getByNickname(response.data).then((response) => {
        console.log(response)
        this.user = response.data
        this.getImage(this.user)
      }).catch((error) => {
        console.log(error)
      })
    }).catch((error) => {
      console.log(error)
    }
    )
  },
  methods: {
    checkPasswordSecurity(password) {

      const uppercaseRegex = /[A-Z]/;
      const lowercaseRegex = /[a-z]/;
      const numberRegex = /[0-9]/;

      if (password.length < 8) {
        this.error = true;
        this.errorMsg = "Password too short. Minimum 8 characters";
        return false;
      }

      if (!uppercaseRegex.test(password)) {
        this.error = true;
        this.errorMsg = "Password must contain an upper case letter";
        return false;
      }

      if (!lowercaseRegex.test(password)) {
        this.error = true;
        this.errorMsg = "Password must contain a lower case letter";
        return false;
      }

      if (!numberRegex.test(password)) {
        this.error = true;
        this.errorMsg = "Password must contain a number";
        return false;
      }
      return true;
    },
    updateUser() {
      var correctUpdate = true
      const newPass = document.getElementById('password').value
      if (!newPass.length == 0) {
        if (this.checkPasswordSecurity(newPass)) {
          this.user.password = newPass
          console.log("nova contrasenya: " + this.user.password)
        } else {
          correctUpdate = false
        }
      }
      if (correctUpdate) {
        const formData = new FormData()
        formData.append('image', this.FILE, this.FILE.name)
        formData.append('body', JSON.stringify(this.user))
        UserService.update(formData, this.user.idUser).then((response) => {
          this.user = response.data
        }).catch((error) => {
          console.log(error)
        })
      }
    }
    ,
    previewImage(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {

          document.getElementById("profile-pic").src = reader.result
          this.FILE = event.target.files[0]
          this.user.photo = this.FILE.name
        };
        reader.readAsDataURL(file);
      }
    }
    ,
    getImage(user) {

      UserService.getPicture(user.idUser).then((response) => {
        const bytes = new Uint8Array(response.data.length);
        for (var i = 0; i < response.data.length; i++) {
          bytes[i] = response.data.charCodeAt(i);
        }

        const blob = new Blob(bytes, { type: response.headers["content-type"] })
        this.FILE = new File([blob], this.user.photo, { type: response.headers["content-type"] })
      }).catch((error) => {
        console.log(error)
      })

      document.getElementById("profile-pic").src = UserService.getPicturePath(user.idUser)

    }
    ,
    deleteUser() {
      const confirmation = confirm("Are you sure you want to delete this user?");

      if (confirmation) {
        UserService.delete(this.user.idUser)
          .then(() => {
            localStorage.clear()
            this.$router.push("/home")
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.flex {
  display: flex;
  margin-bottom: 8rem;
}

.image-username {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5% auto auto 25%;
}

.user {
  border: 4px solid #84b893;
  border-radius: 50%;
}

.form {
  align-items: center;
  margin-left: -500px;
  margin-top: 10rem;
  margin-right: 30%;
}

.button {
  display: flex;
}

.button img {
  width: 50px;
  height: 50px;
}

label {
  display: flex;
  font-weight: bold;
  margin: auto;
}

input,
textarea {
  margin-top: 5px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #84b893;
  font-size: 16px;
}

input {
  padding: 10px;
  border-radius: 5px;
  color: black;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid #84b893;
}


.input-icon-container {
  margin-bottom: 5%;
  position: relative;
}

.input-icon-container .icon-container {
  position: absolute;
  right: 10px;
  top: 55%;
  transform: translateY(-50%);
  pointer-events: none;
}

.icon {
  width: 20px;
  height: 20px;
}

.create {
  background-color: #a0deb1;
}

.create:hover {
  background-color: #84b893;
}

.delete {
  padding: 10px;
  border-radius: 5px;
  margin-left: 2rem;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid black;
  background-color: #D10000;
  color: white;
}

.delete:hover {
  background-color: #A30000;
}
</style>
  