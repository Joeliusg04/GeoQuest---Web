<template>
  <tr>
    <td class="name">{{ treasure.name }}</td>
    <td><star-rating :star-size="20" :rating="review.rating" :read-only="true" :increment="0.01"/><img class="edit" @click="editReview" src="../assets/icons/edit.png"></td>
  </tr>
</template>

<script>
import UserService from "@/services/user.service";
import TreasureService from "@/services/treasure.service";
import StarRating from "vue-star-rating"

export default {
  name: 'MiniReview',
  data() {
    return {
      user: "",
      treasure: ""
    }
  },
  props: {
    review: Object,
  },
  components: {
    StarRating
  },
  mounted() {
    console.log(this.review)
    UserService.getById(this.review.idUser).then((response) => {

      this.user = response.data

    }).catch(() => {
      localStorage.setItem('error', JSON.stringify("Error when loading resources"))
      this.$router.push("/error")
    });
    TreasureService.getById(this.review.idTreasure).then((response) => {
      this.treasure = response.data

    }).catch(() => {
      localStorage.setItem('error', JSON.stringify("Error when loading resources"))
      this.$router.push("/error")
    });
  },
  methods: {
    editReview() {
      window.location.href = "/treasure/" + this.treasure.idTreasure + "/review/" + this.review.idReview

    }
  },
  computed: {
    getId() {
      return this.review.idUser + "$" + this.review.idReview
    }
  }
}
</script>

<style scoped>
img {
  height: 20%;
  width: 20%;

}

td {
  display: flex;
  justify-content: center;
  background-color: #8c996A;
}

.name {
  background-color: #48603D;
  color: white;
}

.edit {
  height: 25px;
  width: 25px;
  cursor: pointer;
  margin-left: 1rem;
}
</style>