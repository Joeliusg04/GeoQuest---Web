<template>
  <div class="review">
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

    UserService.getCurrentUsername().then((response) => {
      const currentUser = response.data
      UserService.getById(this.review.idUser).then((response) => {

        this.user = response.data
        document.getElementById(`${this.review.idUser}$${this.review.idReview}`).setAttribute('src', ReviewService.getPicturePath(this.review.idTreasure, this.review.idReview))

        if (this.user.nickName === currentUser) {
          this.link = `/treasure/${this.review.idTreasure}/review/${this.review.idReview}`
        }

      }).catch(() => {
      });
    }).catch(() => {
      localStorage.removeItem('token')
      this.$router.push("/login")
    })

  },
  computed: {
    getId() {
      return this.review.idUser + "$" + this.review.idReview
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
  align-items: center;  
  width: 48%;
  margin: 1rem;
  bordeR: 1px solid black;
  background-color: #e6e6e6;

}
.review-content{
  width: 100%;
}
.review-image {
  width: 250px;
  height: 250px;
}

.username-rating {
  display: flex;
  justify-content: space-around;
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
  color: #f1e100;
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
