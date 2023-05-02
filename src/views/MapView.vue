<template>
  <div id="container">
    <MapComponent v-bind:treasures="treasures"/>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import MapComponent from "@/components/MapComponent.vue";

export default {
  name: "BigMap",
  components: {MapComponent},

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

}


</script>

<style scoped>

</style>