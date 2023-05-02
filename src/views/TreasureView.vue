<template>
<h1>Tresor {{id}}</h1>
  <map-component v-bind:treasures="[treasure[id-1]]"/>
</template>

<script>
import MapComponent from "@/components/MapComponent.vue";

export default {
  name: "TreasureView",
  components: {MapComponent},
  data(){
    return {
      treasure: [{
        id: 1,
        name: "Tresor super guai",
        latitude: 0,
        longitude: 0
      },
        {
          id:2,
          name: "AAAA",
          latitude: 40,
          longitude: 15
        }]
    }
  },
  props: {
    id: Number
  },

  computed(){

  }



}
</script>

<style scoped>

</style>