<template>
  <nav-bar/>
  <div id="container">
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
    );

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

#container {
  display: flex;
  margin-top: 2rem;
  margin-bottom: 2rem;
  margin-right: 1rem;
}

#treasure-info {
  display: flex;
  flex-direction: column;
}
</style>