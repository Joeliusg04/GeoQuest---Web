<template>
  <div class="review">
    <div class="review2">
      <img :id="getId" alt="review-picture" class="review-image">
      <div class="review-content">
        <div class="username-rating">
          <div class="username">
            <h4>{{ user.nickName }}</h4>
          </div>
          <div class="rating">
            <span v-for="index in maxStars" :key="index" class="star" :class="{ filled: index <= review.rating }">&#9733;</span>
          </div>
        </div>
        <div class="review-text">
          <p v-if="review.opinion.length > 300" class="review-text-scroll">{{ review.opinion }}</p>
          <p v-else class="review-text-normal">{{ review.opinion }}</p>
        </div>
      </div>
      <router-link v-show="link !== ''" v-bind:to="link">Editar</router-link>
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
      link: "",
      maxStars: 5
    }
  },
  props: {
    review: Object,
  },
  mounted() {

    UserService.getById(this.review.idUser).then((response) => {

      this.user = response.data
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
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.review {
  display: flex;
  background: #a0deb1;
  border: 4px solid #84b893;
  width: 45%;
  margin: auto;
  border-radius: 25px;
}

.review-image {
  width: 150px;
  height: 150px;
  padding: 20px;
}

.review2 {
  display: flex;
  align-items: center;
}

.review-content {
  flex-grow: 1;
  margin-left: 6rem;
}

.username-rating {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  margin-right: 5rem;
}

.username {
  margin-right: 20px;
}

.username h4 {
  font-weight: bold;
  text-align: right;
}

.rating {
  color: #ffffff;
}

.star {
  font-size: 45px;
  margin-right: 5px;
}

.filled {
  color: #ffee00;
}

.review-text {
  margin-top: 10px;
}

.review-text p {
  margin: 2rem;
  text-align: center;
}

.review-text-scroll {
  max-height: 150px;
  overflow-y: scroll;
}

.router-link {
  margin-left: auto;
}

.router-link a {
  color: #84b893;
  text-decoration: underline;
}

.router-link a:hover {
  color: #84b893;
  text-decoration: none;
}
</style>
