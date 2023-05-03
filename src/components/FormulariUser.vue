<template>
  <div class="flex">
    <div class="image-username">
      <img class="user" src="../assets/icons/user.png"/>
      <h2>Username</h2>
      <b>Level: X</b>
      <div class="button">
        <img src="../assets/icons/subir.png">
        <p>Change your profile picture</p>
      </div>
    </div>
    <div class="form">
      <form>
        <div>
          <label for="nombre">Username </label>
          <div class="input-icon-container">
            <input type="text" id="nombre" name="nombre" required>
            <span class="icon-container">
                <img class="icon" src="../assets/icons/edit.png"/>
              </span>
          </div>
        </div>
        <div>
          <label for="email">Email </label>
          <div class="input-icon-container">
            <input type="text" id="email" name="email" required/>
            <span class="icon-container">
                <img class="icon" src="../assets/icons/edit.png"/>
              </span>
          </div>
        </div>
        <div>
          <label for="password">Password </label>
          <div class="input-icon-container">
            <input type="password" id="password" name="password" required>
            <span class="icon-container">
                <img class="icon" src="../assets/icons/edit.png"/>
              </span>
          </div>
        </div>
        <input class="create" type="submit" value="Create">
      </form>
    </div>
  </div>


</template>

<script>
export default {
  name: 'FormulariUser',
  props: {}
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
  margin: auto;
  margin-top: 5%;
  margin-left: 25%;
}

.user {
  border: 4px solid #84b893;
  border-radius: 50%;
}

.form {
  align-items: center;
  margin-left: -500px;
  margin: auto;
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
  margin-top: 30px;
  margin-bottom: 30px;
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

.create{
  background-color: #a0deb1;
}

.create:hover{
  background-color: #84b893;
}

</style>
  