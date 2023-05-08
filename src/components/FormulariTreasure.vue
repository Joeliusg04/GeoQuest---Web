<template>
  <div class="flex">
    <div class="image-treasure">
      <img id="preview" alt="preview"/>
      <div class="treasure-image">
        <input id="image" type="file" @change="onFileUpload">
      </div>
    </div>

    <div class="form">
      <form id="form" @submit.prevent="sendTreasure">
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
        <div class="select">
          <label for="status">Status</label>
          <select id="status" name="status" form="form" required v-model="treasure.status">
            <option value="Good conditions">Excellent</option>
            <option value="Correct conditions">Correct</option>
            <option value="Poor conditions">Poor</option>
          </select>
        </div>
        <div class="select">
          <label for="difficulty">Difficulty</label>
          <select id="difficulty" name="difficulty" form="form" required v-model="treasure.difficulty">
            <option value="Noob">Noob</option>
            <option value="Normal">Normal</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div class="image-container">
          <input v-if="id === ''" class="form-submit" type="submit" value="Add"/>
          <button v-if="id !== ''" @click.prevent="updateTreasure"><img src="../assets/icons/edit.png" alt="edit-icon"/>
          </button>
          <button v-if="id !== ''" @click.prevent="deleteTreasure"><img src="../assets/icons/borrar.png"
                                                                        alt="delete-icon"/></button>
        </div>
      </form>
      <MapComponent class="map" ref="mapa" v-bind:new="newTreasure" v-bind:id="this.$route.params.idTreasure"
                    v-bind:size="size" v-on:emitCoords="receiveCoords"/>
    </div>
  </div>
</template>

<script>
import TreasureService from "@/services/treasure.service";
import MapComponent from "./MapComponent.vue";

export default {
  name: 'FormulariTreasure',
  components: {MapComponent},
  props: {
    id: String
  },
  data() {
    return {
      size: ["450px", "450px"],
      FILE: null,
      treasure: {
        name: "",
        description: "",
        latitude: 0,
        longitude: 0,
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
      this.loadPreview()
    },

    receiveCoords(lat, lng) {
      console.log("eeei")
      this.treasure.latitude = Math.round(lat * 100000) / 100000
      this.treasure.longitude = Math.round(lng * 100000) / 100000
    },

    loadPreview() {
      const reader = new FileReader();
      reader.onload = () => {
        document.getElementById("preview").src = reader.result;
        // console.log(reader.result)
      };
      // console.log(this.FILE)
      reader.readAsDataURL(this.FILE);
    },

    getImage(treasure) {

      document.getElementById("preview").src = TreasureService.getPicture(treasure.idTreasure)

    },

    sendTreasure() {

      const formData = new FormData()
      formData.append('image', this.FILE, this.FILE.name)
      formData.append('body', JSON.stringify(this.treasure))

      TreasureService.createNew(formData).then((response) => {
        console.log(response)
        console.log("ha funcionat")
        this.$router.push(`/map`)
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
        this.$router.push(`/treasure/${this.id}`)
      }).catch(
          (error) => {
            console.log("Ha fallat! Hahaha ajuda2")
            console.log(error)
          }
      )

    },

    deleteTreasure() {
      TreasureService.delete(this.id).then((response) => {
        alert(response.data)
        this.$router.push("/management")
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  mounted() {


    if (this.id !== "") {
      console.log("hola")
      TreasureService.getById(this.id).then((response) => {
            this.treasure = response.data
            this.getImage(response.data)

          }
      ).catch((error) => {
        localStorage.setItem('error', error.response.data)
        this.$router.push("/error")
      });
    }


  },
  watch: {
    'treasure.latitude': {
      handler() {
        // this.$refs.mapa.setupMap()
        this.$refs.mapa.addMarker([this.treasure.latitude, this.treasure.longitude])
      }
    },
    'treasure.longitude': {
      handler() {
        // this.$refs.mapa.setupMap()
        this.$refs.mapa.addMarker([this.treasure.latitude, this.treasure.longitude])
      }
    }
  }, computed: {
    newTreasure() {
      return (this.$route.params.idTreasure === undefined || this.$route.params.idTreasure === '')
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* *{
  border: solid black 2px;
} */
.flex {
  display: flex;
  justify-content: space-around;
  margin-bottom: 3.3rem;
  margin-top: 3.3rem;
}

.form-submit {
  margin-top: 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.form-submit:hover {
  background-color: #3e8e41;
}


div {
  display: flex;
  align-items: center;
}

label {
  margin-top: 20px;
  font-weight: bold;
  display: flex;
  align-items: start;
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
  margin-top: 20px;
  resize: none;
  background-color: #a0deb1;
  border: none;
}

textarea :hover {
  size: 200px;
}

.select {
  margin-top: 1rem;
}

input, select {
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

.image-treasure img {
  border: 1px solid #4CAF50;
  border-radius: 20px;
}

.map {
  margin-left: 7rem;
  z-index: 0;
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

input, select {
  display: flex;
  justify-content: end;
  margin-top: 20px;
  margin-left: auto;
}
</style>
  