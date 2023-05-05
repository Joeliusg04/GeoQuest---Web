<template>
  <div class="flex">
    <div class="image-treasure">
      <img src="../assets/icons/add.png" />
      <div class="treasure-image">
        <input id="image" type="file" @change="onFileUpload">
      </div>
    </div>

    <div class="form">
      <form id="form">
        <div>
          <label for="name">Name </label>
          <input type="text" id="name" name="name" required v-model="treasure.name">
        </div>
        <div>
          <label for="description">Description </label>
          <textarea id="description" name="description" required v-model="treasure.description"></textarea>
        </div>
        <div>
          <label for="latitude">Latitude </label>
          <input type="number" step="0.00001" id="latitude" name="latitude" required v-model="treasure.latitude">
        </div>
        <div>
          <label for="longitude">Longitude </label>
          <input type="number" step="0.00001" id="longitude" name="longitude" required v-model="treasure.longitude">
        </div>
        <div>
          <label for="location">Location </label>
          <input type="text" id="location" name="location" required v-model="treasure.location">
        </div>
        <div>
          <label for="clue">Clue </label>
          <input type="text" id="clue" name="clue" required v-model="treasure.clue">
        </div>
        <div>
          <label for="status">Status:</label>
          <select id="status" name="status" form="form" required v-model="treasure.status">
            <option value="Good conditions">Excellent</option>
            <option value="Correct conditions">Correct</option>
            <option value="Poor conditions">Poor</option>
          </select>
        </div>
        <div>
          <label for="difficulty">Difficulty:</label>
          <select id="difficulty" name="difficulty" form="form" required v-model="treasure.difficulty">
            <option value="Noob">Noob</option>
            <option value="Normal">Normal</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div class="image-container">
          <button v-if="id === ''" @click.prevent="sendTreasure"><img src="../assets/icons/add.png" /></button>
          <button v-if="id !== ''" @click.prevent="updateTreasure"><img src="../assets/icons/edit.png" /></button>
          <button v-if="id !== ''"><img src="../assets/icons/borrar.png" /></button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import TreasureService from "@/services/treasure.service";

export default {
  name: 'FormulariTreasure',
  props: {
    id: String
  },
  data() {
    return {

      FILE: null,
      treasure: {
        name: "",
        description: "",
        latitude: "",
        longitude: "",
        location: "",
        clue: "",
        status: "",
        difficulty: "",
        image: ""
      }
    }
  },
  methods: {

    onFileUpload(event) {
      this.FILE = event.target.files[0]
      this.treasure.image = this.FILE.name
    },

    sendTreasure() {


      const formData = new FormData()
      formData.append('image', this.FILE, this.FILE.name)
      formData.append('body', JSON.stringify(this.treasure))

      TreasureService.createNew(formData).then((response) => {
        console.log(response)
        console.log("ha funcionat")
      }).catch(
        (error) => {
          console.log("Ha fallat! Hahaha ajuda")
          console.log(error)
        }
      )

    },

    updateTreasure() {


      const formData = new FormData()
      formData.append('image', this.FILE, this.FILE.name)
      formData.append('body', JSON.stringify(this.treasure))
      console.log(this.treasure)
      TreasureService.update(formData, this.id).then((response) => {
        console.log(response)
      }).catch(
        (error) => {
          console.log("Ha fallat! Hahaha ajuda2")
          console.log(error)
        }
      )

    }
  },
  mounted() {


    if (this.id !== "") {
      console.log("hola")
      TreasureService.getById(this.id).then((response) => {
        this.treasure = response.data
      }
      ).catch((error) => {
        console.log(error)
      });
      // TODO Convert received data to File format
      TreasureService.getPicture(this.id).then((response) => {
        console.log(response)
        this.FILE = response.data
        console.log("holiwi")
      }).catch((error) => {
        console.log(error)
      });
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
  