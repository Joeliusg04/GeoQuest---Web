<template>
  <div class="flex">
    <div class="image-treasure">
      <img src="../assets/icons/add.png" />
      <div class="treasure-image">
        <img src="../assets/icons/subir.png">
        <p>Upload treasure image</p>
      </div>
    </div>

    <div class="form">
      <form>
        <div>
          <label for="nombre">Name </label>
          <input type="text" id="nombre" name="nombre" required>
        </div>
        <div>
          <label for="descripcion">Description </label>
          <textarea id="descripcion" name="descripcion" required></textarea>
        </div>
        <div>
          <label for="latitud">Latitud </label>
          <input type="number" id="latitud" name="latitud" required>
        </div>
        <div>
          <label for="longitud">Longitud </label>
          <input type="number" id="longitud" name="longitud" required>
        </div>
        <div>
          <label for="longitud">Location </label>
          <input type="text" id="text" name="text" required>
        </div>
        <div>
          <label for="clue">Longitud </label>
          <input type="text" id="clue" name="clue" required>
        </div>
        <div>
          <label for="status">Status </label>
          <input type="text" id="status" name="status" required>
        </div>
        <div>
          <label for="difficulty">Difficulty </label>
          <input type="text" id="difficulty" name="difficulty" required>
        </div>
        <div>
          <label for="score">Score </label>
          <input type="text" id="score" name="score" required>
        </div>
        <div class="image-container">
          <img src="../assets/icons/add.png">
          <img src="../assets/icons/edit.png">
          <img src="../assets/icons/borrar.png">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormulariTreasure',
  props: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.flex {
  display: flex;
  justify-content: space-around;
  margin-bottom: 2.7rem;
}

.form {
  margin-top: 3rem;
  margin-left: -500px;
  align-items: center;
}

div {
  display: flex;
  display: flex;
  align-items: center;
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

textarea {
  width: 215px;
  height: 30px;
  resize: none;
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

.treasure-image {
  display: flex;
}

.treasure-image img {
  width: 30px;
  height: 30px;
}

.image-treasure {
  display: flex;
  flex-direction: column;
}
.image-container img{
  width: 50px;
  height: 50px; 
  margin: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: 4rem;
}
</style>
  