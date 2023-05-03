<template>
  <h1>Treasure Info</h1>
  <div class="treasure">
    <img src="../assets/icons/logo.png"/>
    <div class="treasure-wrap">
      <h3>Treasure</h3>
      <div class="treasure2">
        <div class="username-rating">
          <img src="../assets/icons/logo.png"/>
          <h4> Dificulty</h4>

        </div>
        <button @click="centerMap">View</button>
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.treasure-wrap h3 {
  font-size: 30px;
  margin-left: 20%;
}

.treasure-wrap {
  flex-wrap: wrap;
  text-align: left;
}

.treasure {
  display: flex;
  align-items: center;
  margin: 20px 0;
  background: #a0deb1;
  border: 4px solid #84b893;
  width: 80%;
  margin: auto;
}

.treasure img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 20px;
}

.treasure2 {
  width: 100%;
}

.username-rating {
  display: flex;
}

.username-rating h4 {
  margin-right: 10px;
  font-weight: bold;
  width: 200px;
  text-align: left;

}

.username-rating img {
  width: 300px;
  height: 20px;
  margin-top: 2.5%;
}


</style>
  