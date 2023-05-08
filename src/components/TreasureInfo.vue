<template>
  <div class="treasure2">
    <img id="treasureImage" alt="treasure-image">
    <div class="image-rating">
      <h3>{{ treasure.name }}</h3>
      <img class="rating" id="rating" alt="rating-icon">

      <b> Difficulty: {{ treasure.difficulty }} </b>
      <b>Location: {{ treasure.location }} </b>
    </div>
    <hr>
    <p> {{ treasure.description }}</p>
    <img src="">
    <div id="hint">
      <p>{{ treasure.clue }}</p>
    </div>
  </div>
</template>

<script>


import TreasureService from "@/services/treasure.service";

export default {
  name: 'TreasureInfo',
  components: {},
  props: {
    id: String
  },
  data() {
    return {
      treasure: ""
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
.treasure2 h3 {
  font-size: 50px;
}

.treasure2 {
  display: flex;
  flex-direction: column;
  background: #a0deb1;
  border: 4px solid #84b893;
  width: 50%;
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
}</style>
  