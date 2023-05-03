<template>
  <nav-bar/>
  <div id="container">
  <img v-bind:treasures="[currentTreasure]">
  <map-component v-bind:treasures="[currentTreasure]"/>
  </div>
  <treasure-info v-bind:treasure="currentTreasure"/>

  <Footer/>
</template>

<script>
import MapComponent from "@/components/MapComponent.vue";
import TreasureInfo from "@/components/TreasureInfo.vue";
import NavBar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "TreasureView",
  components: {NavBar, TreasureInfo, MapComponent, Footer},
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
  margin: auto;
  display: flex;
}

#container img{
  width: 30%;
  height: 300px;
}

</style>