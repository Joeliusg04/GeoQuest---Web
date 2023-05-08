<template>
  <div class="treasure">
    <img class="image" :id="treasure.idTreasure" alt="treasure-image" />
    <div class="flex-direction:column">
      <h3>{{ treasure.name }}</h3>
      <div class="flex">
        <div class="rating">
          <span v-for="index in maxStars" :key="index" class="star" :class="{ filled: index <= rating }">&#9733;</span>
        </div>
        <h4 class="difficulty">Dificulty: {{ treasure.difficulty }}</h4>
      </div>
      <div class="buttons">
        <button @click="centerMap">View on map</button>
        <a v-bind:href="link">Treasure info</a>
      </div>
    </div>
  </div>
</template>

<script>


import TreasureService from "@/services/treasure.service";

export default {
  name: 'TreasureMap',
  components: {},
  data() {
    return {
      rating: 5,
      maxStars: 5
    };
  },
  props: {
    treasure: Object
  },
  mounted() {
    document.getElementById(`${this.treasure.idTreasure}`).setAttribute("src", TreasureService.getPicturePath(this.treasure.idTreasure))
  },
  methods: {
    centerMap() {
      console.log("center 1")
      this.$emit('centerMap', this.treasure)
    }
  },
  computed:
  {
    link() {
      return `${window.location.origin}/treasure/${this.treasure.idTreasure}`;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin: 0;
  padding: 0;
}

.rating {
  color: #ffffff;
}

.star {
  font-size: 45px;
}

.filled {
  color: #ffee00;
}

.treasure h3 {
  font-size: 30px;
  margin-left: 0;
  margin-top: 0;
  text-align: center;
}

.flex {
  display: flex;
  justify-content: space-around;
  margin-top: 0;
  align-items: center;
}

.buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
}

.treasure {
  display: flex;
  align-items: center;
  background: #a0deb1;
  border: 4px solid #84b893;
  margin-left: 2rem;
  margin-right: 2rem;
}

.image {
  height: 100%;
  width: 30%;
}

.rating {
  height: 90%;
  width: 90%;
}

button,
a {
  display: inline-block;
  background-color: #84b893;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;
}

button:hover,
a:hover {
  background-color: #2d6a4f;
}
</style>
  