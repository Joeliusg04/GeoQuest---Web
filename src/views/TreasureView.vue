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
// import TreasureService from "@/services/treasure.service";

export default {
  name: "TreasureView",
  components: { NavBar, TreasureInfo, MapComponent, Footer, ReviewInfo },
  data() {
    return {
      size: ["70%", "300px"],
    }
  },
  props: {
    idTreasure: String
  // },
  // computed: {
  //   async currentTreasure(){
  //     TreasureService.getById(this.$route.params.idTreasure).then(
  //         (response) => {
  //           console.log(response.data)
  //           console.log("eiii")
  //           return  response.data;
  //         }).catch(
  //         (error) => {
  //           console.log(error.code)
  //           var code = error.code
  //           this.$route.push(`/error/${code}`);
  //         }
  //     );
  //   },
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

}

.flex{
  display: flex;
  margin-top: 2%;
  margin-left: 0%;
}
</style>