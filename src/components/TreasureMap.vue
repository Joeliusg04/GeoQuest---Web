<template>
  <div class="treasure">
    <img class="image" src="../assets/dummy.png" alt="treasure-image"/>
    <div class="flex-direction:column">
      <h3>{{ treasure.name }}</h3>
      <div class="flex">
        <div class="rate">
          <img :id="this.treasure.idTreasure" class="rating" alt="rating-icon"/>
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


export default {
  name: 'TreasureMap',
  components: {},
  props: {
    treasure: Object
  },
  mounted(){
    document.getElementById(`${this.treasure.idTreasure}`).setAttribute("src", require(`../assets/rating/rating_${this.treasure.score}.png`))
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

.rate {
  float: left;
  height: 46px;
  padding: 0 10px;
}

.rate:not(:checked) > input {
  position: absolute;
  top: -9999px;
}

.rate:not(:checked) > label {
  float: right;
  width: 1em;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
  font-size: 30px;
  color: #ccc;
}

.rate:not(:checked) > label:before {
  content: '★ ';
}

.rate > input:checked ~ label {
  color: #ffc700;
}

.rate:not(:checked) > label:hover,
.rate:not(:checked) > label:hover ~ label {
  color: #deb217;
}

.rate > input:checked + label:hover,
.rate > input:checked + label:hover ~ label,
.rate > input:checked ~ label:hover,
.rate > input:checked ~ label:hover ~ label,
.rate > label:hover ~ input:checked ~ label {
  color: #c59b08;
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
  height: 100%;
  width: 40%;
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
  