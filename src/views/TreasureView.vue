<template>
  <nav-bar />
  <div class="pagew">
    <div class="border">
      <div id="container">
        <img src="../assets/dummy.png">
        <map-component v-bind:treasures="[currentTreasure]" v-bind:size="size" />
      </div>
      <treasure-info v-bind:treasure="currentTreasure" />
    </div>
    <h1>REVIEWS</h1>
    <div class="flex">
      <ReviewInfo />
      <ReviewInfo />
    </div>
    <div class="flex">
      <ReviewInfo />
      <ReviewInfo />
    </div>
  </div>
  <Footer />
</template>

<script>
import MapComponent from "@/components/MapComponent.vue";
import TreasureInfo from "@/components/TreasureInfo.vue";
import NavBar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import ReviewInfo from "@/components/ReviewInfo.vue";

export default {
  name: "TreasureView",
  components: { NavBar, TreasureInfo, MapComponent, Footer, ReviewInfo },
  data() {
    return {
      treasures: [],
      treasure: {
        id: 1,
        name: "Tresor super guai",
        latitude: 0,
        longitude: 0
      },
      size: ["70%", "300px"]
    }
  },
  props: {
    id: Number
  },

  computed: {
    currentTreasure() {
      return this.treasure;
    }
  }


}
</script>

<style scoped>
#container {
  display: flex;
  flex-direction: row;
}

#container img {
  width: 30%;
}

.pagew {

}

.flex{
  display: flex;
  margin-top: 2%;
  margin-left: 0%;
}
</style>