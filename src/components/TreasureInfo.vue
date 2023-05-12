<template>
  <div class="treasure2">
    <h3>{{ treasure.name }}</h3>
    <div class="image-rating">
      <div class="score">
        <star-rating :rating="treasure.score" :read-only="true" :increment="0.01"/>
    </div>
      <b>Difficulty: {{ treasure.difficulty }}</b>
      <b>Location: {{ treasure.location }}</b>
      <img class="fav" v-show="fav" src="../assets/icons/fav.png" @click="addOrRemoveFav">
      <img class="fav" v-show="!fav" src="../assets/icons/nofav.png" @click="addOrRemoveFav">
    </div>
    <p class="desc">{{ treasure.description }}</p>
    <div class="flex">
      <img v-if="!showCluePopup" @click="displayClue" src="../assets/icons/vista.png" class="clue">
      <img v-if="showCluePopup" @click="displayClue" src="../assets/icons/visibilidad.png" class="clue">
      <div v-if="showCluePopup" class="popup">
        <button class="close-button" @click="displayClue">&times;</button>
        <p class="clue-text">{{ treasure.clue }}</p>
      </div>
      <button v-if="!showStatsPopup" class="popup-button" @click="displayTreasureStats">Show treasure stats</button>
      <button v-if="showStatsPopup" class="popup-button" @click="displayTreasureStats">Hide treasure stats</button>
      <div v-if="showStatsPopup" class="popup">
        <button class="close-button" @click="displayTreasureStats">&times;</button>
        <TreasureStats />
      </div>
    </div>
  </div>
</template>

<script>


import TreasureService from "@/services/treasure.service";
import TreasureStats from "@/components/TreasureStats.vue";
import FavService from "@/services/fav.service";
import UserService from "@/services/user.service";
import StarRating from "vue-star-rating";

export default {
  name: 'TreasureInfo',
  components: { TreasureStats, StarRating },
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
        UserService.getCurrentUsername().then((response) => {
          UserService.getByNickname(response.data).then((response) => {
            const user = response.data
            console.log(this.treasure)
            FavService.addToFav(this.treasure.idTreasure, user.idUser).then(() => {
              this.fav = true
            }).catch(() => {
              localStorage.setItem('error', JSON.stringify("Error when adding treasure to favorites"))
              this.$router.push("/error")
            })
          }).catch(() => {
          })
        }).catch(() => {
          localStorage.removeItem('token')
          this.$router.push("/login")
        })


        this.fav = true
      } else {
        UserService.getCurrentUsername().then((response) => {
          UserService.getByNickname(response.data).then((response) => {
            const user = response.data
            FavService.deleteFav(user.idUser, this.treasure.idTreasure).then(() => {
              this.fav = false
            }).catch(() => {
              localStorage.setItem('error', JSON.stringify("Error when removing treasure from favorites"))
              this.$router.push("/error")
            })
          }).catch(() => {
          })
        }).catch(() => {
          localStorage.removeItem('token')
          this.$router.push("/login")
        })


        this.fav = false
      }
    }
  },
  created() {
    TreasureService.getById(this.id).then((response) => {
      this.treasure = response.data
      document.getElementById("rating").setAttribute("src", require(`../assets/rating/rating_${this.treasure.score}.png`))

      UserService.getCurrentUsername().then((response) => {
        UserService.getByNickname(response.data).then((response) => {
          const user = response.data
          FavService.getFav(user.idUser, this.treasure.idTreasure).then((response) => {
            this.fav = response.data
          }).catch(() => {
          })
        }).catch(() => {
        })
      }).catch(() => {
        localStorage.removeItem('token')
        this.$router.push("/login")
      })
    }).catch(() => {
    })
  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  color: blacK;
}
.treasure2 {
  display: flex;
  flex-direction: column;
  background: #a4975b;
  width: 100%;
  height: 100%;
  text-align: center;
  margin: 0rem auto 0rem auto;

}

.image-rating {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0rem 1rem 1rem 1rem;
}
.score{
  display: flex;
  align-items: center;
}
h3 {
  width: 100%;
  font-size: 50px;
  color: black;
}

#rating {
  height: 50px;
  width: 250px;
  margin-right: 1rem;
}

.fav {
  height: 20px;
  width: 20px;

}

.desc {
  text-align: center;
  margin: 2rem;
}

.flex {
  display: flex;
  margin: 0rem 1rem 1rem 1rem;
  justify-content: space-around;
  align-items: center;
}

.clue {
  height: 50px;
  width: 50px;
  cursor: pointer;
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

.clue-text {
  background-color: #a0deb1;
  text-align: center;
  padding: 10px;
  margin: 0;
}

.popup-button {
  background-color: #48603d;
  color: white;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid black;
  width: 15%;
  padding-top: 15px;
  padding-bottom: 15px;
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

.popup-button:hover {
  background-color: #8c996a;
}</style>
  