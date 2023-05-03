<template>
  <h1>Create Treasure</h1>
  <div class="flex">
    <div class="image-username">
      <img src="../assets/icons/logo.png"/>
      <h2>Username</h2>
      <p>Level</p>
      <div class="button">
        <img src="../assets/icons/logo.png">
        <p>Change your profile picture</p>
      </div>
    </div>

    <div class="form">
      <form>
        <div>
          <label for="nombre">Username </label>
          <input type="text" id="nombre" name="nombre" required>
        </div>
        <div>
          <label for="email">Email </label>
          <input type="text" id="email" name="email" required/>
        </div>
        <div>
          <label for="password">Password </label>
          <input type="password" id="password" name="password" required>
        </div>
        <input type="submit" value="Create">
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
  justify-content: space-around;
}

.image-username {
  flex-wrap: wrap;
}

.form {
  margin-top: 5%;
  margin-left: -500px;
}

.button {
  display: flex;
}

.button img {
  width: 50px;
  height: 50px;
}

label {
  margin-top: 20px;
  display: flex;
  font-weight: bold;
  margin: auto;
}

input,
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
  background-color: #a0deb1;
  color: black;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

input:hover {
  background-color: #84b893;
}
</style>
  