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
      <p id="hint" style="display: none;">{{ treasure.clue }}</p>
    </div>
    <button class="popup-button" @click="showTreasureStats">Show TreasureStats</button>
    <div v-if="showPopup" class="popup">
      <button class="close-button" @click="closeTreasureStats">&times;</button>
      <TreasureStats />
    </div>

  </div>
</template>

<script>


import TreasureService from "@/services/treasure.service";
import TreasureStats from "@/components/TreasureStats.vue";

export default {
  name: 'TreasureInfo',
  components: { TreasureStats },
  props: {
    id: String
  },
  data() {
    return {
      treasure: "",
      showPopup: false
    }

  },
  methods: {
    showTreasureStats() {
      this.showPopup = true;
    },
    closeTreasureStats() {
      this.showPopup = false;
    },
    showClue() {
      const clueDiv = document.getElementById('hint')
      if (clueDiv.style.display == "none") {
        clueDiv.style.display = "block"
      } else {
        clueDiv.style.display = "none"
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
  border-radius: 4px;
  border: 1px solid #84b893;
}

#hintDiv{
  display: flex;
}
.clue {
  height: 50px;
  width: 50px;
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
</style>
  