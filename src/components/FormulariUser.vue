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
            <input type="password" id="password" name="password" placeholder="Password" required>
            <span class="icon-container">
              <img class="icon" src="../assets/icons/edit.png" alt="edit-icon" />
            </span>
          </div>
        </div>
        <input class="create" type="submit" value="Update" @click.prevent="updateUser">
      </form>
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
      FILE: require("../assets/icons/user.png"),
      user: {
      }
    }
  },
  mounted() {

    UserService.getByNickname(JSON.parse(localStorage.getItem('user'))).then((response) => {
      console.log(response)
      this.user = response.data
      this.getImage(this.user)
    }).catch((error) => {
      console.log(error)
    })
  },
  methods: {
    updateUser() {
      const formData = new FormData()
      console.log(this.FILE)
      formData.append('image', this.FILE, this.FILE.name)
      formData.append('body', JSON.stringify(this.user))
      UserService.update(formData,this.user.idUser).then((response)=>{
        this.user = response.data
      }).catch((error)=>{
        console.log(error)
      })
    },
    previewImage(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.FILE = e.target.result
          this.user.photo = this.FILE.name
          document.getElementById("profile-pic").src = this.FILE
        };
        reader.readAsDataURL(file);
      }
    },
    getImage(user) {

      this.FILE = UserService.getPicture(user.idUser)
      document.getElementById("profile-pic").src = UserService.getPicture(user.idUser)

    },
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
</style>
  