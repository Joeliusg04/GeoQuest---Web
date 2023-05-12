<template>
  <div>
    <nav-bar />
    <div class="pagew">
      <div class="border">
        <div id="container">
          <img id="imagen">
          <map-component class="map-component" v-bind:id="this.$route.params.idTreasure" v-bind:size="size" />
        </div>
        <treasure-info class="treasure" v-bind:id="this.$route.params.idTreasure" />
      </div>
      <h1 v-if="hasReviews">REVIEWS</h1>
      <div v-if="hasReviews" class="flex">
        <review-info class="review" v-for="(review, index) in reviews" v-bind:key="index" v-bind:review="review" />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import MapComponent from "@/components/MapComponent.vue";
import TreasureInfo from "@/components/TreasureInfo.vue";
import NavBar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import ReviewInfo from "@/components/ReviewInfo.vue";
import ReviewService from "@/services/review.service";
import treasureService from "@/services/treasure.service";

export default {
  name: "TreasureView",
  components: {NavBar, TreasureInfo, MapComponent, Footer, ReviewInfo },
  data() {
    return {
      treasures: [],
      size: ["80%", "300px"],
      hasReviews: false,
      reviews: []
    };
  },
  props: {
    id: Number
  },

  created() {
    ReviewService.getAllByTreasure(this.$route.params.idTreasure)
      .then((response) => {
        this.reviews = response.data;
        if (this.reviews.length > 0) this.hasReviews = true;
      })
      .catch(() => {
      });
  },
  mounted(){
    document.getElementById('imagen').setAttribute('src', treasureService.getPicturePath(this.$route.params.idTreasure) )
  }
};
</script>

<style scoped>
#container {
  display: flex;
  flex-direction: row;
  margin: 0;
  align-items: center;
  justify-content: center;
}
.treasure{
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}
#container img {
  width: 40%;
  height: 300px;
  border-right: 1px solid black;
  border-top: 1px solid black;
}

.flex {
  margin-top: 2%;
  margin-left: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.review {
  margin-top: 1rem;
  margin-bottom: 2rem;
}

.map-component {
  z-index: 0;
  border-top: 1px solid black;
}
</style>