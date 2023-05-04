<template>
  <nav-bar/>
  <div id="container">
    <div id="treasure-info">
      <TreasureMap v-on:centerMap="centerMap" v-for="(treasure, index) of treasures" v-bind:key="index"
                   v-bind:treasure="treasure"/>
    </div>
    <MapComponent class="map"  ref="mapa" v-bind:treasures="treasures" v-bind:size="size"/>

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
      size: ["1500px", "1000px"],
      treasures: []
      /*treasures: [
        {
          id: 1,
          name: "Tresor super guai",
          latitude: 0,
          longitude: 0
        }, {
          id: 2,
          name: "Tresor 2",
          latitude: 20,
          longitude: 10
        }
      ]*/
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
          var code = error.code
          this.$router.push(`/error/${code}`);
        }
    );

  }
}

</script>

<style scoped>
.map {
  border: black solid 1px;
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