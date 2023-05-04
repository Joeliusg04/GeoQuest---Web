<template>
  <nav-bar />
  <div class="pagew">
    <div class="border">
      <div id="container">
        <img src="../assets/dummy.png">
        <map-component v-bind:treasures="[currentTreasure]" v-bind:id="this.$route.params.idTreasure" v-bind:size="size" />
      </div>
      <treasure-info v-bind:treasure="currentTreasure" />
    </div>
    <h1>REVIEWS</h1>
    <div class="flex">
        <review-info class="review" v-bind:review="review" v-for="(review, index) in reviews" v-bind:key="index" />
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
      size: ["70%", "300px"],
      reviews:  [
        { id: 1, text: "This treasure was amazing!" },
        { id: 2, text: "I didn't find anything here..." },
        { id: 3, text: "This treasure was amazing!" },
        { id: 4, text: "I didn't find anything here..."}
      ]
    }
  },
  props: {
    id: Number
  },

  computed: {
    currentTreasure() {
      return this.treasure;
    }
  },

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
  margin-left: 1%;
  margin-right: 1%;
  margin-bottom: 1%;
}

.flex{
  margin-top: 2%;
  margin-left: 0%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.review{
  margin-top: 1rem;
  margin-bottom: 2rem;
}
</style>