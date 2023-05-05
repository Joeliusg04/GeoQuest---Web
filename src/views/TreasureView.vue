<template>
  <nav-bar />
  <div class="pagew">
    <div class="border">
      <div id="container">
        <img :src="path">
        <map-component class="map-component" v-bind:treasures="[currentTreasure]" v-bind:id="this.$route.params.idTreasure" v-bind:size="size" />
      </div>
      <treasure-info v-bind:id="this.$route.params.idTreasure" />
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
        { id: 1, username: "Asier", solved:"Not Solved", text: "I've been using this geocaching website for a few months now, and I have to say, I'm thoroughly impressed. The site is easy to navigate and has a ton of great features that make planning and executing a geocaching adventure a breeze. One of the things I love about this site is the map function. It's so simple to search for geocaches in a specific location, and the map shows all the caches in that area, so you can easily plan your route. The site also has a great filtering system, so you can easily find caches that match your preferences, such as difficulty level or cache type. The community aspect of this site is also really cool. You can join groups of geocachers, chat with other members, and share your experiences. Plus, there are tons of helpful resources and tips on the site to help you improve your geocaching skills. Overall, I would highly recommend this geocaching website to anyone who loves outdoor adventures and wants to explore new places. It's a great way to meet new people, discover hidden gems in your area, and challenge yourself with fun and exciting geocaching hunts!" },
        { id: 2, username: "Marti", solved:"Not Solved", text: "I didn't find anything here..." },
        { id: 3, username: "Raúl", solved:"Solved", text: "This treasure was amazing!" },
        { id: 4, username: "Ivan", solved:"Solved", text: "I didn't find anything here..."}
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

.map-component{
  z-index: 0;
}
</style>