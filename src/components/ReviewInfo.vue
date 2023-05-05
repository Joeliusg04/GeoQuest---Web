<template>
  <div class="review">
    <img :src="review.path" alt="image" />
    <div class="review2">
      <div class="username-rating">
        <h4> {{ review.username }} - {{ review.solved }} </h4>
        <img class="rating" src="../assets/rating/rating_4.png" />
      </div>
      <div class="review-text">
        <p v-if="review.text.length > 300" class="review-text-scroll">{{ review.text }}</p>
        <p v-else class="review-text-normal">{{ review.text }}</p>
      </div>
      <p>{{ review.path }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ReviewInfo',
  props: {
    review: Object,
  },
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