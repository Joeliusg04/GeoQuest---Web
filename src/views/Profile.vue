<template>
  <div>
    <nav-bar />
    <FormulariUser />
    <button class="popup-button" @click="displayUserStats">Mostrar UserStats</button>
    <button class="popup-button" @click="displayFavs">
      <img src="../assets/icons/favorito.png" class="favorite-icon">
    </button>
    <button class="popup-button" @click="displayReviews"><img src="../assets/icons/like.png"
        class="favorite-icon"></button>
    <div v-if="showUserStats" class="popup">
      <button class="close-button" @click="displayUserStats">&times;</button>
      <UserStats />
    </div>
    <div v-if="showFavs" class="popup">
      <button class="close-button" @click="displayFavs">&times;</button>
      <h2 style="background-color:#a0deb1">Favs </h2>
      <ul>
        <li v-for="(favorite, index) in favs" :key="index">
          <div class="flex"> <a :href="link">{{ favorite.name }}</a> - Location: {{ favorite.location }} <button
              class="borrar"><img class="del-img" src="../assets/icons/borrar.png"></button> </div>
        </li>
      </ul>
    </div>
    <div v-if="showReviews" class="popup">
      <table>
        <button class="close-button" @click="displayReviews">&times;</button>
        <MiniReview v-for="(review, index) of reviews" :key="index" v-bind:review="review"></MiniReview>
      </table>
      <div>
      </div>
    </div>
  </div>
  <Footer />
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


export default {
  name: "ProfileView",
  components: { UserStats, NavBar, FormulariUser, Footer, MiniReview },
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
      if (this.showUserStats == false) {
        this.showUserStats = true
      } else this.showUserStats = false
    },
    displayFavs() {
      if (this.showFavs == false) {
        this.showFavs = true
      } else this.showFavs = false
    },
    displayReviews() {
      if (this.showReviews == false) {
        this.showReviews = true
      } else this.showReviews = false
    }
  },
  mounted() {

    UserService.getByNickname(JSON.parse(localStorage.getItem('user'))).then((response) => {
      console.log(response)
      const user = response.data
      FavService.getAllFavs(user.idUser).then((response) => {
        console.log(response)
        this.favs = response.data
      }).catch((error) => {
        console.log(error)
      })

      reviewService.getAllByUser(user.idUser).then((response) => {
        console.log(response)
        this.reviews = response.data
      }).catch((error) => {
        console.log(error)
      })



    }).catch((error) => {
      console.log(error)
    })
  },
  computed: {
    link() {
      return `${window.location.origin}/treasure/${this.treasure.idTreasure}`;
    }
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
table {
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: auto;
  border: none;
  border-collapse: collapse;
  
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

.popup2 h2 {
  margin-top: 0;
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
</style>
