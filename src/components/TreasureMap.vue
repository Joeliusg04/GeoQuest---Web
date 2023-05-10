<template>
  <div class="treasure">
    <img class="image" :id="treasure.idTreasure" alt="treasure-image" />
    <div class="flex-direction:column">
      <h3>{{ treasure.name }}</h3>
      <div class="flex">
        <div class="rating">
          <span v-for="index in maxStars" :key="index" class="star"
            :class="{ filled: index <= treasure.score }">&#9733;</span>
        </div>
        <h4 class="difficulty">Difficulty: {{ treasure.difficulty }}</h4>
      </div>
      <div class="buttons">
        <div>
        <button @click="centerMap">View on map</button>
        <a :href="link">Treasure info</a>
      </div>
        <img @click="redirectAdmin" v-if="admin" class="config" src="../assets/icons/config.png">
      </div>
    </div>
  </div>
</template>

<script>


import TreasureService from "@/services/treasure.service";

export default {
  name: 'TreasureMap',
  data() {
    return {
      maxStars: 5,
      admin: true
    };
  },
  props: {
    treasure: Object,
  },
  mounted() {
    document.getElementById(`${this.treasure.idTreasure}`).setAttribute("src", TreasureService.getPicturePath(this.treasure.idTreasure))
  },
  methods: {
    centerMap() {
      console.log("center 1");
      this.$emit('centerMap', this.treasure);
    },
    redirectAdmin(){
      window.location.href = '/management/'+this.treasure.idTreasure;
    }
  },
  computed: {
    link() {
      return `${window.location.origin}/treasure/${this.treasure.idTreasure}`;
    }
  }
}
</script>

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
  margin-top: 1rem;
  align-items: center;
}

.treasure {
  display: flex;
  align-items: center;
  background: #a0deb1;
  border: 4px solid #84b893;
  margin-left: 2rem;
  margin-right: 2rem;
}
.config{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  width: 20px;
  cursor: pointer;
  margin-left: 2rem;

}
.image {
  height: 200px;
  width: 200px;
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
  margin-left: 1rem;
}

button:hover,
a:hover {
  background-color: #2d6a4f;
}</style>
