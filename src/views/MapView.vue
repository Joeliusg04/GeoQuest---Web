<template>
  <nav-bar />
  <div id="container" v-show="!emptyFilter">
    <div id="search" v-show="!emptyFilter">
      <img @click="displayFilters('filters')" src="../assets/icons/filter.png" class="filter">
      <div id="filters" style="display: none;">
        <form>
          <label @click="displayFilters('difficulty')" for="difficulty">Difficulty</label>
          <select id="difficulty" name="difficulty" style="display: none;">
            <option name="select" value="none">--Select difficulty--</option>
            <option name="easy" value="Noob">Easy</option>
            <option name="medium" value="Normal">Medium</option>
            <option name="hard" value="Hard">Hard</option>
          </select>
          <label @click="displayFilters('rating')" for="rating">Rating</label>
          <select name="rating" id="rating" style="display: none;">
            <option name="select" value="none">--Select rating--</option>
            <option name="low" value="2">Low rated (0-2)</option>
            <option name="average" value="4">Average (2-4)</option>
            <option name="excellent" value="5">Excellent (5)</option>
          </select>
          <label @click="displayFilters('location')" for="location">Location</label>
          <input type="text" placeholder="Example: Barcelona" id="location" name="location" style="display: none;">
          <input type="submit" value="Filter" id="submit">
        </form>
      </div>
    </div>
    <div id="treasure-info">
      <TreasureMap v-on:centerMap="centerMap" v-for="(treasure, index) of treasures" v-bind:key="index"
        v-bind:treasure="treasure" />
    </div>
    <MapComponent v-if="!emptyFilter" class="map" ref="mapa" v-bind:treasures="treasures" v-bind:size="size" />
    
  </div>
  <div v-show="emptyFilter" class="nofiltersfound">
    <p id="emptyFilter" v-if="emptyFilter"></p>
    <img src="../assets/icons/robot.png">
  </div>
  <Footer />
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
  components: { NavBar, Footer, TreasureMap, MapComponent },

  data() {
    return {
      size: ["1000px", "560px"],
      treasures: [],
      emptyFilter: false
    }
  },
  methods: {
    centerMap(treasure) {
      console.log("center 2")
      this.$refs.mapa.centerMap([treasure.latitude, treasure.longitude])
    },
    displayFilters(filter) {


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
      if (filterElement.style.display == "block") {
        filterElement.style.display = "none"
      } else {
        filterElement.style.display = "block"
      }
    }
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search);
    TreasureService.getAll().then(
      (response) => {
        console.log(response.data)
        this.treasures = response.data;


        const diff = urlParams.get('difficulty')
        const rating = urlParams.get('rating')
        const loc = urlParams.get('location')
        console.log(diff)
        console.log(rating)
        console.log(loc)
        if (diff !== "none" && diff !== null) {
          this.treasures = this.treasures.filter((t) => t.difficulty === diff)
          console.log("filtrant diff")
        }
        if (rating !== "none" && rating !== null) {
          switch (rating) {
            case "2":
              this.treasures = this.treasures.filter((t) => t.score <= 2)
              break;
            case "4":
              this.treasures = this.treasures.filter((t) => t.score <= 4 && t.score > 2)
              break;
            case "5":
              this.treasures = this.treasures.filter((t) => t.score > 4 && t.score <= 5)
              break;
          }

        }

        if (loc !== "" && loc !== null) {
          this.treasures = this.treasures.filter((t) => t.location === loc)
        }

        if (this.treasures.length > 0) {
          this.$refs.mapa.treasuresF = this.treasures
        } else {
          this.emptyFilter = true
          setTimeout(function () {
            window.location.href = '/map';
          }, 5000);
          let count = 5;

          const countdown = setInterval(function () {
            
            const message = document.getElementById("emptyFilter")
            message.innerText = "No results found, wait! You will be redirected in ... "+count
            count--;


            if (count < 0) {
              clearInterval(countdown);
              console.log("¡Cuenta regresiva terminada!");
            }
          }, 1000);

        }


      },
      (error) => {
        console.log(error)
        const code = error.code;
        this.$router.push(`/error/${code}`);
      }
    )
  },
  watch: {
    '$route.query': {
      handler: function () {
        location.reload()
      }
    }
  },
}

</script>

<style scoped>
.map {
  border: black solid 1px;
  position: sticky;
  top: 150px;
  z-index: 0;
}

.filter {
  height: 100px;
  width: 100px;
}
label {
  margin-top: 20px;
  font-weight: bold;
  display: flex;
  align-items: start;
}
#emptyFilter{
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  font-family: 'Courier New', Courier, monospace;
  font-size: 20px;

}
.nofiltersfound{
  margin-top: 10rem;
  margin-bottom: 10rem;
}
input,
select {
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