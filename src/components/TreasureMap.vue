<template>
  <div class="treasure">
    <img class="image" src="../assets/dummy.png"/>
    <div class="flex-direction:column">
      <h3>{{ treasure.name }}</h3>
      <div class="flex">
          <img class="rating" src="../assets/icons/rating.png"/>
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


export default {
  name: 'TreasureMap',
  components: {},
  props: {
    treasure: Object
  },
  methods: {
    centerMap(){
      console.log("center 1")
      this.$emit('centerMap',this.treasure)
    }
  },
  computed:
      {
        link(){
          return `${window.location.origin}/treasure/${this.treasure.idTreasure}`;
        }
      }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.treasure h3 {
  font-size: 30px;
  margin-left: 0;
  margin-top: 0;
  text-align: center;
}
.flex{
  display: flex;
  justify-content: space-around;
  margin-top: 0;
  align-items: center;
}
.buttons{
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
.image{
  height: 100%;
  width: 30%;
}
.rating{
  height: 100%;
  width: 40%;
}

.buttons button, 
.buttons a {
  background-color: #3e8e41;
  color: white;
  border: none;
  padding: 1rem;
  font-size: 1rem;
  text-decoration: none;
  margin-right: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border-radius: 20px;
}

.buttons button:hover,
.buttons a:hover {
  background-color: #84b893;
}


</style>
  