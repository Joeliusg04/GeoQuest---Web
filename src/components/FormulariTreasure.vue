<template>
  <div class="flex">

    <form id="form" @submit.prevent="sendTreasure">
      <div id="imgDiv" class="image-treasure">
        <img id="preview" alt="preview" />
        <div class="treasure-image">
          <input id="image" type="file" @change="onFileUpload">
        </div>
      </div>
      <div class="data">
        <div>
          <label for="name">Name </label>
          <input type="text" id="name" name="name" maxlength="30" required v-model="treasure.name">
        </div>
        <div>
          <label for="description">Description </label>
          <textarea id="description" name="description" required v-model="treasure.description"></textarea>
        </div>
        <div>
          <label for="latitude">Latitude </label>
          <input type="number" step="0.00001" id="latitude" min=-90 max=90 name="latitude" required
            v-model="treasure.latitude">
        </div>
        <div>
          <label for="longitude">Longitude </label>
          <input type="number" step="0.00001" id="longitude" min=-180 max=180 name="longitude" required
            v-model="treasure.longitude">
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
          <select id="status" class="sss" name="status" form="form" required v-model="treasure.status">
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Poor">Poor</option>
          </select>
        </div>
        <div class="select">
          <label for="difficulty">Difficulty</label>
          <select id="difficulty" class="sss" name="difficulty" form="form" required v-model="treasure.difficulty">
            <option value="Noob">Noob</option>
            <option value="Normal">Normal</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div class="image-container">
          <input v-if="id === ''" class="form-submit" type="submit" value="Add" />
          <img class="buttons" v-if="id !== ''" @click.prevent="updateTreasure" src="../assets/icons/edit.png"
            alt="edit-icon" />
          <img class="buttons" v-if="id !== ''" @click.prevent="deleteTreasure" src="../assets/icons/borrar.png"
            alt="delete-icon" />
        </div>
      </div>
    </form>
    <MapComponent class="map" ref="mapa" v-bind:new="newTreasure" v-bind:id="this.$route.params.idTreasure"
      v-bind:size="size" v-on:emitCoords="receiveCoords" />
  </div>
</template>

<script>
import TreasureService from "@/services/treasure.service";
import MapComponent from "./MapComponent.vue";
import UserService from "@/services/user.service";

export default {
  name: 'FormulariTreasure',
  components: { MapComponent },
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
      this.treasure.latitude = Math.round(lat * 100000) / 100000
      this.treasure.longitude = Math.round(lng * 100000) / 100000
    },

    loadPreview() {
      const reader = new FileReader();
      reader.onload = () => {
        document.getElementById("preview").src = reader.result;
      };
      reader.readAsDataURL(this.FILE);
    },

    getImage(treasure) {

      document.getElementById("preview").src = TreasureService.getPicturePath(treasure.idTreasure)

    },

    sendTreasure() {

      const formData = new FormData()


      formData.append('image', this.FILE, this.FILE.name)
      formData.append('body', JSON.stringify(this.treasure))

      TreasureService.createNew(formData).then(() => {
        this.$router.push(`/map`)
      }).catch((error) => {
        if (error.response.status === 401) {
          localStorage.setItem('error', JSON.stringify("Unauthorized action"))
          this.$router.push("/error")
        }
        localStorage.setItem('error', JSON.stringify("Error when creating new treasure"))
        this.$router.push("/error")
      }
      );

    },

    updateTreasure() {


      if (this.FILE === null) {
        TreasureService.getPicture(this.treasure.idTreasure).then((response) => {
          const bytes = new Uint8Array(response.data.length);
          for (var i = 0; i < response.data.length; i++) {
            bytes[i] = response.data.charCodeAt(i);
          }

          const blob = new Blob(bytes, { type: response.headers["content-type"] })
          this.FILE = new File([blob], this.treasure.image, { type: response.headers["content-type"] })


          const formData = new FormData()

          formData.append('image', this.FILE, this.FILE.name)
          formData.append('body', JSON.stringify(this.treasure))
          TreasureService.update(formData, this.id).then(() => {
            this.$router.push(`/treasure/${this.id}`)
          }).catch(() => {
            localStorage.setItem('error', JSON.stringify("Error when updating treasure"))
            this.$router.push("/error")
          })
        }).catch((error) => {
          if (error.response.status === 404) {
            localStorage.setItem('error', JSON.stringify("Picture not found"))
            this.$router.push("/error")
          } else {
            localStorage.setItem('error', JSON.stringify("Error when getting treasure picture"))
            this.$router.push("/error")
          }

        })
      } else {
        const formData = new FormData()
        formData.append('image', this.FILE, this.FILE.name)
        formData.append('body', JSON.stringify(this.treasure))
        TreasureService.update(formData, this.id).then(() => {
          this.$router.push(`/treasure/${this.id}`)
        }).catch(() => {
          localStorage.setItem('error', JSON.stringify("Error when updating treasure"))
          this.$router.push("/error")
        })
      }


    },

    deleteTreasure() {
      const confirmation = confirm("Are you sure you want to delete this treasure?");
      if (confirmation) {
        UserService.getCurrentUsername().then((response) => {
          UserService.getByNickname(response.data).then((response) => {

            if (response.data.userRole === "Admin") {
              TreasureService.delete(this.id).then((response) => {
                alert(response.data)
                this.$router.push("/management")
              }).catch(() => {
                localStorage.setItem('error', JSON.stringify("Error when deleting treasure"))
                this.$router.push("/error")
              })
            }
          }).catch(() => {
          })
        }).catch(() => {
          localStorage.removeItem('token')
          this.$router.push("/login")
        })
      }
    }
  },
  mounted() {


    if (this.id !== "") {
      TreasureService.getById(this.id).then((response) => {
        this.treasure = response.data
        this.getImage(response.data)

      }
      ).catch((error) => {
        localStorage.setItem('error', error.response.data)
        this.$router.push("/error")
      });
    } else {
      document.getElementById('image').setAttribute('required', '')
    }


  },
  watch: {
    'treasure.latitude': {
      handler() {
        this.$refs.mapa.addMarker([this.treasure.latitude, this.treasure.longitude])
      }
    },
    'treasure.longitude': {
      handler() {
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
.flex {
  display: flex;
  justify-content: center;
  margin-bottom: 4rem;
  margin-top: 4rem;
}

#imgDiv {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-right: 2rem;
}

#form {
  display: flex;
  justify-content: space-between;
}

.data {
  display: block;
  margin-left: 10rem;
}

.map {
  z-index: 0;
  margin-left: 10rem;
  ;
}
.sss:hover{
  background-color: #84d893;
}
.form-submit {
  margin-top: 1rem;
  background-color: #4e6a55;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.form-submit:hover {
  background-color: #84d893;
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
  border: 1px solid #4e6a55;
  font-size: 16px;
}

textarea {
  width: 215px;
  height: 30px;
  margin-top: 20px;
  resize: none;
  background-color: #4e6a55;
  border: none;
}

textarea:hover {
  size: 200px;
  background-color: #84d893;
}

.select {
  margin-top: 1rem;
}

input,
select {
  padding: 10px;
  border-radius: 5px;
  background-color: #4e6a55;
  color: white;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

input:hover {
  background-color: #84d893;
}

.treasure-image img {
  width: 30px;
  height: 30px;
}

.image-treasure {
  display: flex;

}
textarea{
  color: white;
}
.image-treasure img {
  border: 1px solid #4e6a55;
  border-radius: 20px;
  width: 250px;
  height: 250px;
}

.buttons {
  border-radius: 5px;
  cursor: pointer;
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
  display: flex;
  border: 1px solid black;
  background-color: transparent;
  cursor: pointer;
}

.image-container button:hover img {
  filter: brightness(0.7);
}

.buttons:hover {
  background-color: lightgray;
}

.image-container button:not(:last-child) {
  margin-right: 1rem;
}

input,
select {
  display: flex;
  justify-content: end;
  margin-top: 20px;
  margin-left: auto;
}
</style>
  