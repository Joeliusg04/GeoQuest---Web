<template>
  <div class="container">
    <nav-bar/>
    <FormulariUser/>
    <button class="popup-button" @click="displayUserStats">Show your stats</button>
    <button class="popup-button" @click="displayFavs">
      <img src="../assets/icons/favorito.png" class="favorite-icon">
    </button>
    <button class="popup-button" @click="displayReviews"><img src="../assets/icons/like.png"
                                                              class="reviews-icon"></button>
    <div v-if="showUserStats" class="popup">
      <button class="close-button" @click="displayUserStats">&times;</button>
      <UserStats/>
    </div>
    <div v-if="showFavs" class="popup">
      <button class="close-button" @click="displayFavs">&times;</button>
      <ShowFavs class="favs" v-for="(fav,index) of favs" v-bind:key="index" v-bind:favorite="fav"/>
      <p v-show="favs.length === 0">No favourite treasures found</p>
    </div>
    <div v-if="showReviews" class="popup">
      <table>
        <button class="close-button" @click="displayReviews">&times;</button>
        <MiniReview v-for="(review, index) of reviews" :key="index" v-bind:review="review"></MiniReview>
        <p v-show="reviews.length === 0">No reviews found</p>
      </table>
      <div>
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script>
import FormulariUser from "@/components/FormulariUser.vue";
import Footer from "@/components/Footer.vue";
import NavBar from "@/components/Navbar.vue";
import UserStats from "@/components/UserStats.vue";
import UserService from "@/services/user.service";
import FavService from "@/services/fav.service";
import MiniReview from "@/components/MiniReview.vue"
import reviewService from "@/services/review.service";
import ShowFavs from "@/components/ShowFavs.vue";


export default {
  name: "ProfileView",
  components: {UserStats, NavBar, FormulariUser, Footer, MiniReview, ShowFavs},
  data() {
    return {
      showUserStats: false,
      showFavs: false,
      favs: [],
      reviews: [],
      showReviews: false
    };
  },
  methods: {
    displayUserStats() {
      this.showFavs = false
      this.showReviews = false
      if (this.showUserStats == false) {
        this.showUserStats = true
      } else this.showUserStats = false
    },
    displayFavs() {
      this.showUserStats = false
      this.showReviews = false
      if (this.showFavs == false) {
        this.showFavs = true
      } else this.showFavs = false
    },
    displayReviews() {
      this.showFavs = false
      this.showUserStats = false
      if (this.showReviews == false) {
        this.showReviews = true
      } else this.showReviews = false
    },
    closeFavs() {
      this.showPopup2 = false;
    },
    deleteFav(idTreasure) {
      FavService.delete(idTreasure).then((response) => {
        alert(response.data)
        this.$router.push("/profile")
      }).catch((error) => {
        console.log(error)
      })
    }
  },


  mounted() {
    UserService.getCurrentUsername().then((response) => {
      UserService.getByNickname(response.data).then((response) => {
        const user = response.data;

        FavService.getAllFavs(user.idUser)
            .then((response) => {
              this.favs = response.data.map((favorite) => ({
                ...favorite,
                favoriteLink: `${window.location.origin}/treasure/${favorite.idTreasure}`
              }));
            })
            .catch((error) => {
              console.log(error);
            });

        reviewService.getAllByUser(user.idUser)
            .then((response) => {
              this.reviews = response.data;
            })
            .catch((error) => {
              console.log(error);
            });
      })
          .catch((error) => {
            console.log(error);
          });
    }).catch((error) => {
      console.log(error)
    })
  }
}


</script>

<style scoped>
.popup-button {
  background-color: #a0deb1;
  color: black;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #84b893;
}

.popup-button:hover {
  background-color: #84b893;
}

.favorite-icon {
  width: 15px;
  height: 15px;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
}
.container{
  margin-bottom: 5rem;
}
table {
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: auto;
  border: none;
  border-collapse: collapse;
}

.favs {
  border: 1px solid black;
}

.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 40px;
  width: 80%;
  max-width: 600px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 18px;
  color: #aaa;
  background: none;
  border: none;
  cursor: pointer;
}

ul {
  margin-top: -3.3%;
  list-style-type: none;
  font-weight: bold;
  padding: 20px;
  background-color: #84b893;
}

li {
  margin-bottom: 10px;
}

.borrar {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
}

.del-img {
  width: 20px;
  height: 20px;
}

.del-img:hover {
  background-color: white;
}

table {
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: auto;
  border: none;
  border-collapse: collapse;

}

.reviews-icon {
  width: 20px;
  height: 15px;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
}

.bg-green {
  padding: 10px;
  background-color: #a0deb1;
}
</style>

