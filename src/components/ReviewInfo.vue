<template>
  <div class="review">
<!--    <img :src="review.path" alt="image" />-->
    <div class="review2">
      <div class="username-rating">
<!--        <h4> {{ user.username }} - {{ review.solved }} </h4> -->
        <h4> {{ user.nickName }} </h4>
        <img :id="review.idReview" class="rating"/>
      </div>
      <div class="review-text">
        <p v-if="review.opinion.length > 300" class="review-text-scroll">{{ review.opinion }}</p>
        <p v-else class="review-text-normal">{{ review.opinion }}</p>
      </div>
<!--      <p>{{ review.path }}</p>-->
    </div>
  </div>
</template>
<script>
import UserService from "@/services/user.service";

export default {
  name: 'ReviewInfo',
  data(){
    return{
      user: ""
    }
  },
  props: {
    review: Object,
  },
  mounted() {


    document.getElementById(`${this.review.idReview}`).setAttribute("src",require(`../assets/rating/rating_${this.review.rating}.png`))


    UserService.getById(this.review.idUser).then((response)=>{
      this.user = response.data
    }).catch((error)=>{
      console.log(error)
    })

    // TODO Acabar de carregar la imatge de la review (cal solucionar el tema imatges a FormulariTreasure tambe)
/*    ReviewService.getPicture(this.review.idTreasure,this.review.idReview).then((response)=>{
      console.log(response)
        }
    ).catch((error)=>{
      console.log(error)
    })*/

  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.review {
  display: flex;
  margin: 20px 0;
  background: #a0deb1;
  border: 4px solid #84b893;
  width: 45%;
  margin: auto;
  border-radius: 25px;
}

.review img {
  margin: auto;
  margin-right: 20px;
  margin-left: 1%;
}

.review2 {
  width: 100%;
}

.review2 p {
  margin: 2rem;
  align-items: center;
  text-align: left;
}

.username-rating {
  display: flex;
  justify-content: space-around;
}

.username-rating h4 {
  margin-right: 10px;
  font-weight: bold;
  width: 200px;
  text-align: left;

}

.rating {
  height: 50px;
  width: 200px;
}

.review-text {
  max-height: 150px;
  overflow-y: scroll;
}

.review-text-normal {
  margin: 0;
}

.review-text-scroll {
  margin: 0;
  white-space: pre-line;
  overflow-wrap: anywhere;
}
</style>