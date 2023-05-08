<template>
  <nav-bar/>
  <div id="container">
    <div id="search">
      <img @click="displayFilters('filters')" src="../assets/icons/filter.png" class="filter">
      <div id="filters"  style="display: none;">
        <form>
          <label @click="displayFilters('difficulty')" for="difficulty">Difficulty</label>
          <select id="difficulty" name="difficulty" style="display: none;">
            <option name="select" value="none">--Select difficulty--</option>
            <option name="easy" value="easy">Easy</option>
            <option name="medium" value="medium">Medium</option>
            <option name="hard" value="hard">Hard</option>
          </select>
          <label @click="displayFilters('rating')" for="rating">Rating</label>
          <select name="rating" id="rating" style="display: none;">
            <option name="select" value="none">--Select rating--</option>
            <option name="low" value="0.2">Low rated (0-2)</option>
            <option name="average" value="2.4">Average (2-4)</option>
            <option name="excellent" value="4,1.5">Excellent (5)</option>
          </select>
          <label @click="displayFilters('location')" for="location">Location</label>
          <input type="text" placeholder="Example: Barcelona" id="location" name="location" style="display: none;">
          <input type="submit" value="Filter" id="submit">
        </form>
      </div>
    </div>
    <div id="treasure-info">
      <TreasureMap v-on:centerMap="centerMap" v-for="(treasure, index) of treasures" v-bind:key="index"
                   v-bind:treasure="treasure"/>
    </div>
    <MapComponent class="map" ref="mapa" v-bind:treasures="treasures" v-bind:size="size"/>

  </div>
  <Footer/>
</template>

<script>
import "leaflet/dist/leaflet.css";
import MapComponent from "@/components/MapComponent.vue";
import TreasureMap from "@/components/TreasureMap.vue";
import NavBar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import TreasureService from "@/services/treasure.service";

export default {
  name: "BigMap",
  components: {NavBar, Footer, TreasureMap, MapComponent},

  data() {
    return {
      size: ["1000px", "560px"],
      treasures: []
    }
  },
  methods: {
    centerMap(treasure) {
      console.log("center 2")
      this.$refs.mapa.centerMap([treasure.latitude, treasure.longitude])
    },
    displayFilters(filter){

      
      /*const filtersDiv = document.getElementById('filters')
      if (filtersDiv.style.display == "block"){
        filtersDiv.style.display = "none"
      } else {
        filtersDiv.style.display = "block"
      }
      const button = document.getElementById('submit')
      button.addEventListener("click", function(){
        filtersDiv.style.display ="none";
      });
      */

      const filterElement = document.getElementById(filter)
      if (filterElement.style.display == "block"){
        filterElement.style.display = "none"
      } else {
        filterElement.style.display = "block"
      }
    }
  },
  mounted() {
    TreasureService.getAll().then(
        (response) => {
          console.log(response.data)
          this.treasures = response.data;

        },
        (error) => {
          console.log(error)
          const code = error.code;
          this.$router.push(`/error/${code}`);
        }
    )


  }
}

</script>

<style scoped>

.map {
  border: black solid 1px;
  position: sticky;
  top: 150px;
  z-index: 0;
}
.filter{
  height: 100px;
  width: 100px;
}
label {
  margin-top: 20px;
  font-weight: bold;
  display: flex;
  align-items: start;
}

input, select {
  padding: 10px;
  border-radius: 5px;
  background-color: #a0deb1;
  color: black;
  font-size: 16px;
  border: none;
  cursor: pointer;
  margin-top: 1rem;
}

input:hover {
  background-color: #84b893;
}
#container {
  display: flex;
  margin: 2rem;
  justify-content: space-evenly;
}

#treasure-info {
  display: flex;
  flex-direction: column;
}
</style>