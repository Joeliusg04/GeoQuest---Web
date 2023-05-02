<template>
  <nav-bar/>
  <div id="container">
  <treasure-info v-bind:treasure="currentTreasure"/>
  <map-component v-bind:treasures="[currentTreasure]"/>
  </div>
</template>

<script>
import MapComponent from "@/components/MapComponent.vue";
import TreasureInfo from "@/components/TreasureInfo.vue";
import NavBar from "@/components/Navbar.vue";

export default {
  name: "TreasureView",
  components: {NavBar, TreasureInfo, MapComponent},
  data(){
    return {
      treasures:[],
      treasure: {
        id: 1,
        name: "Tresor super guai",
        latitude: 0,
        longitude: 0
      }
    }
  },
  props: {
    id: Number
  },

  computed: {
      currentTreasure(){
      return this.treasure;
    }
  }



}
</script>

<style scoped>
#container{
  display: flex;
  flex-direction: row;
}
</style>