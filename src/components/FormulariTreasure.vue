<template>
  <div class="flex">
    <div class="image-treasure">
      <img src="../assets/icons/add.png"/>
      <div class="treasure-image">
        <input id="image" type="file">
      </div>
    </div>

    <div  class="form">
      <form id="form">
        <div>
          <label for="name">Name </label>
          <input type="text" id="name" name="name" required v-model="name">
        </div>
        <div>
          <label for="description">Description </label>
          <textarea id="description" name="description" required v-model="description"></textarea>
        </div>
        <div>
          <label for="latitude">Latitude </label>
          <input type="number" step="0.00001" id="latitude" name="latitude" required v-model="latitude">
        </div>
        <div>
          <label for="longitude">Longitude </label>
          <input type="number" step="0.00001" id="longitude" name="longitude" required v-model="longitude">
        </div>
        <div>
          <label for="location">Location </label>
          <input type="text" id="location" name="location" required v-model="location">
        </div>
        <div>
          <label for="clue">Clue </label>
          <input type="text" id="clue" name="clue" required v-model="clue">
        </div>
        <div>
          <label for="status">Status </label>
          <input type="text" id="status" name="status" required v-model="status">
        </div>
        <div>
          <label for="difficulty">Difficulty </label>
          <input type="text" id="difficulty" name="difficulty" required v-model="difficulty">
        </div>
        <div>
          <label for="score">Score </label>
          <input type="text" id="score" name="score" required v-model="score">
        </div>
        <div class="image-container">
          <button @click.prevent="sendTreasure"><img src="../assets/icons/add.png"/></button>
          <button><img src="../assets/icons/edit.png"/></button>
          <button><img src="../assets/icons/borrar.png"/></button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import TreasureService from "@/services/treasure.service";

export default {
  name: 'FormulariTreasure',
  props: {},
  data() {
    return {
      name: "",
      description: "",
      latitude: "",
      longitude: "",
      location: "",
      clue: "",
      status: "",
      difficulty: "",
      score: ""
    }
  },
  methods: {
    sendTreasure(){



      var image = document.querySelector('#image').files[0];
      var treasure = {
        name: this.name,
        description: this.description,
        latitude: this.latitude,
        location: this.location,
        image: "",
        clue: this.clue,
        status: this.status,
        difficulty: this.difficulty,
        score: this.score,
        //image: image
      }
      console.log(typeof image)
      var formData = new FormData()
      formData.append("file",image)
      formData.append("body",treasure)

      TreasureService.createNew(treasure,image).then((response) => {
        console.log(response)
        console.log("ha funcionat")
      }).catch(
          (error)=> {
            console.log("Ha fallat! Hahaha ajuda")
            console.log(error)
          }
      )

    }
  }
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

.image-container img {
  width: 50px;
  height: 50px;
  margin: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: 4rem;
}

.image-container button {
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.image-container button:hover img {
  filter: brightness(0.7);
}

.image-container button:not(:last-child) {
  margin-right: 1rem;
}


</style>
  