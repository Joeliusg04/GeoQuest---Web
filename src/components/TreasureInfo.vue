<template>
  <div class="treasure2">
    <div class="image-rating">
      <h3>{{ treasure.name }}</h3>
      <img class="rating" id="rating" alt="rating-icon">

      <b>Difficulty: {{ treasure.difficulty }}</b>
      <b>Location: {{ treasure.location }}</b>
      <img class="fav" v-show="fav" src="../assets/icons/fav.png" @click="addOrRemoveFav">
      <img class="fav" v-show="!fav" src="../assets/icons/nofav.png" @click="addOrRemoveFav">
    </div>
    <hr>
    <p>{{ treasure.description }}</p>
    <div class="flex">
      <img @click="displayClue" src="../assets/icons/vista.png" class="clue">
      <div v-if="showCluePopup" class="popup">
        <button class="close-button" @click="displayClue">&times;</button>
        <p class="clue-text">{{ treasure.clue }}</p>
      </div>
      <button class="popup-button" @click="displayTreasureStats">Show TreasureStats</button>
      <div v-if="showStatsPopup" class="popup">
        <button class="close-button" @click="displayTreasureStats">&times;</button>
        <TreasureStats/>
      </div>
    </div>
  </div>
</template>

<script>


import TreasureService from "@/services/treasure.service";
import TreasureStats from "@/components/TreasureStats.vue";
import FavService from "@/services/fav.service";
import UserService from "@/services/user.service";

export default {
  name: 'TreasureInfo',
  components: {TreasureStats},
  props: {
    id: String,
  },
  data() {
    return {
      treasure: "",
      showCluePopup: false,
      showStatsPopup: false,
      fav: false
    };
  },
  methods: {
    displayTreasureStats() {
      this.showCluePopup = false
      if (this.showStatsPopup == false) {
        this.showStatsPopup = true
      } else this.showStatsPopup = false
    },
    displayClue() {
      this.showStatsPopup = false
      if (this.showCluePopup == false) {
        this.showCluePopup = true
      } else this.showCluePopup = false
    },
    addOrRemoveFav() {
      if (this.fav === false) {
        console.log("1")
        UserService.getByNickname(JSON.parse(localStorage.getItem('user'))).then((response) => {
          const user = response.data
          console.log(this.treasure)
          FavService.addToFav(this.treasure.idTreasure, user.idUser).then((response) => {
            console.log(response)
            this.fav = true
          }).catch((error) => {
            console.log(error)
          })
        }).catch((error) => {
          console.log(error)
        })


        this.fav = true
      } else {
        console.log("2")
        UserService.getCurrentUsername().then((response) => {
          UserService.getByNickname(response.data).then((response) => {
            const user = response.data
            FavService.deleteFav(user.idUser, this.treasure.idTreasure).then((response) => {
              console.log(response)
              this.fav = true
            }).catch((error) => {
              console.log(error)
            })
          }).catch((error) => {
            console.log(error)
          })
        }).catch((error) => {
          console.log(error)
        })


        this.fav = false
      }
    }
  },
  created() {
    TreasureService.getById(this.id).then((response) => {
          this.treasure = response.data
          document.getElementById("rating").setAttribute("src", require(`../assets/rating/rating_${this.treasure.score}.png`))

          // document.getElementById("rating").setAttribute("src", require(`../assets/rating/rating_${this.treasure.score}.png`))
          UserService.getCurrentUsername().then((response) => {
            UserService.getByNickname(response.data).then((response) => {
              const user = response.data
              FavService.getFav(user.idUser, this.treasure.idTreasure).then((response) => {
                this.fav = response.data
              }).catch((error) => {
                console.log(error)
                this.fav = false
              })
            }).catch((error) => {
              console.log(error)
            })
          }).catch((error) => {
            console.log(error)
          })
        }
    ).catch((error) => {
      console.log("Ha fallat get de tresor amb id" + this.id)
      console.log(error)
    })
  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.popup-button {
  background-color: #a0deb1;
  color: black;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  margin: 10px;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #84b893;
  width: 100%;
}

#hintDiv {
  display: flex;
}

.clue {
  height: 50px;
  width: 50px;
  cursor: pointer;
}

.popup-button:hover {
  background-color: #84b893;
}

.fav {
  height: 20px;
  width: 20px;

}

.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 40px;
  max-width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2)
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 18px;
  color: #aaa;
  background: none;
  border: none;
  cursor: pointer;
}

.treasure2 h3 {
  font-size: 50px;
}

.treasure2 {
  display: flex;
  flex-direction: column;
  background: #a0deb1;
  border: 4px solid #84b893;
  width: 70%;
  height: 100%;
  margin: 1rem auto auto;
  text-align: center;
  border-radius: 25px;
}

.rating {
  height: 50px;
  width: 40%;
}

.image-rating {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.flex {
  display: flex;
  margin-left: 1rem;
}

.clue-text {
  background-color: #a0deb1;
  text-align: center;
  padding: 10px;
  margin: 0;
}

</style>
  