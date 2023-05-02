<template>
  <nav-bar/>
  <div id="container">
    <div id="treasure-info">
      <TreasureMap v-for="(treasure, index) of treasures" v-bind:key="index" v-bind:treasure="treasure"/>
    </div>
    <MapComponent v-bind:treasures="treasures"/>

  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import MapComponent from "@/components/MapComponent.vue";
import TreasureMap from "@/components/TreasureMap.vue";
import NavBar from "@/components/Navbar.vue";

export default {
  name: "BigMap",
  components: {NavBar, TreasureMap, MapComponent},

  data() {
    return {
      latitudeInit: 0,
      longitudeInit: 0,
      treasures: [
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
      ]
    }
  },
  methods: {

  }
}

</script>

<style scoped>
#container {
  display: flex;
  margin-top: 2em;
}

#treasure-info {
  display: flex;
  flex-direction: column;
}
</style>