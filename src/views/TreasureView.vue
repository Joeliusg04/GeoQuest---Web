<template>
  <nav-bar />
  <div class="pagew">
    <div class="border">
      <div id="container">
<!--        <img :src="path">-->
        <map-component class="map-component" v-bind:id="this.$route.params.idTreasure" v-bind:size="size" />
      </div>
      <treasure-info v-bind:id="this.$route.params.idTreasure" />
      <treasure-stats/>
    </div>
    <h1>REVIEWS</h1>
    <div v-if="hasReviews" class="flex">
        <review-info  class="review"  v-for="(review, index) in reviews" v-bind:key="index" v-bind:review="review" />
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
import ReviewService from "@/services/review.service";
import TreasureStats from "@/components/TreasureStats.vue";

export default {
  name: "TreasureView",
  components: {TreasureStats, NavBar, TreasureInfo, MapComponent, Footer, ReviewInfo },
  data() {
    return {
      treasures: [],
      size: ["70%", "300px"],
      hasReviews: false,
      reviews:  []
    }
  },
  props: {
    id: Number
  },

  created() {
    ReviewService.getAllByTreasure(this.$route.params.idTreasure).then((response)=> {
      console.log(response.data)
      this.reviews = response.data
      if (this.reviews.length>0) this.hasReviews = true

    }).catch((error)=>{
      console.log(error)
    })
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
  margin-left: 1%;
  margin-right: 1%;
  margin-bottom: 1%;
}

.flex{
  margin-top: 2%;
  margin-left: 0;
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