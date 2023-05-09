<template>
  <div class="review">
    <div class="review2">
      <img :id="getId" alt="review-picture">
      <div class="username-rating">
        <h4> {{ user.nickName }} </h4>
        <img :id="review.idReview" class="rating" alt="rating-icon"/>
        <p>{{review.rating}}</p>
      </div>
      <div class="review-text">
        <p v-if="review.opinion.length > 300" class="review-text-scroll">{{ review.opinion }}</p>
        <p v-else class="review-text-normal">{{ review.opinion }}</p>
      </div>
      <router-link v-show="link!==''" v-bind:to="link">Editar</router-link>
    </div>
  </div>
</template>
<script>
import UserService from "@/services/user.service";
import ReviewService from "@/services/review.service";

export default {
  name: 'ReviewInfo',
  data() {
    return {
      user: "",
      link: ""
    }
  },
  props: {
    review: Object,
  },
  mounted() {

    UserService.getById(this.review.idUser).then((response) => {

      this.user = response.data
      document.getElementById(this.review.idReview).setAttribute('src',require(`../assets/rating/rating_${this.review.rating}.png`))
      document.getElementById(`${this.review.idUser}$${this.review.idReview}`).setAttribute('src',ReviewService.getPicturePath(this.review.idTreasure,this.review.idReview))

      if (this.user.nickName===JSON.parse(localStorage.getItem('user'))){
        this.link = `/treasure/${this.review.idTreasure}/review/${this.review.idReview}`
      }

    }).catch((error) => {
      console.log(error)
    });

  },
  computed: {
    getId(){
      return this.review.idUser+"$"+this.review.idReview
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.review {
  display: flex;
  background: #a0deb1;
  border: 4px solid #84b893;
  width: 45%;
  margin: auto;
  border-radius: 25px;
}

.review img {
  margin: auto 20px auto 1%;
}

.review2 {
  width: 100%;
}

.review2 p {
  margin: 2rem;
  align-items: center;
  text-align: center;
  display: flex; 
  justify-content: center; 
  flex-direction: column; 
  height: 100%; 
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


</style>