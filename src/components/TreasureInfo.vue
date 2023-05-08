<template>
  <div class="treasure2">
    <div class="image-rating">
      <h3>{{ treasure.name }}</h3>
      <img class="rating" id="rating" alt="rating-icon">

      <b> Difficulty: {{ treasure.difficulty }} </b>
      <b>Location: {{ treasure.location }} </b>
    </div>
    <hr>
    <p> {{ treasure.description }}</p>
    <div id="hintDiv">
      <img @click="showClue" src="../assets/icons/vista.png" class="clue">
      <p @click="showClue" v-show="showHint" id="hint" style="display: none;">{{ treasure.clue }}</p>
    </div>
    <p class="popup-button" @click="viewTreasureStats">Show TreasureStats <img class="stats" src="../assets/icons/stats.png"></p>
    <TreasureStats v-if="showPopup" class="popup" />

  </div>
</template>

<script>


import TreasureService from "@/services/treasure.service";
import TreasureStats from "@/components/TreasureStats.vue";

export default {
  name: 'TreasureInfo',
  components: { TreasureStats },
  props: {
    id: String,
  },
  data() {
    return {
      treasure: "",
      showPopup: false,
      showHint: false
    }

  },
  methods: {

    viewTreasureStats() {
      if (this.showPopup == true) {
        this.showPopup = false
      } else this.showPopup = true
    },
    showClue() {
      if (this.showHint == true) {
        this.showHint = false
      } else {
        this.showHint = true
      }
    }
  },
  created() {
    TreasureService.getById(this.id).then((response) => {
      this.treasure = response.data
      document.getElementById("rating").setAttribute("src", require(`../assets/rating/rating_${this.treasure.score}.png`))
      document.getElementById("treasureImage").setAttribute("src", TreasureService.getPicture(this.treasure.idTreasure))
    }
    ).catch((error) => {
      console.log("Ha fallat get de tresor amb id" + this.id)
      console.log(error)
    })
  },
  mounted() {
    // document.getElementById("rating").setAttribute("src", require(`../assets/rating/rating_${this.treasure.score}.png`))
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
}

#hintDiv {
  display: flex;
}

.clue {
  height: 50px;
  width: 50px;
  margin-left: 2rem;
}

.popup-button:hover {
  background-color: #84b893;
}

.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 40px;
  width: 60%;
  height: 20%;
  max-width: 800px;
  max-height: 600px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
.treasure2 h3 {
  font-size: 50px;
}
.stats{
  height: 25px;
  width: 25px;
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
</style>
  