<template>
  <div class="flex-column bg-green">
    <div class="flex-column">
      <div class="flex">
        <div>
          <a :href="favorite.favoriteLink">{{ favorite.name }}</a> - Location: {{ favorite.location }}
        </div>
        <img @click="deleteFav" class="del-img" src="../assets/icons/borrar.png">
      </div>
    </div>
  </div>
</template>

<script>

import FavService from '@/services/fav.service';
import UserService from '@/services/user.service';

export default {
  name: "ShowFavs",
  components: {},
  data() {
    return {

    }
  },
  props: {
    favorite: Object,
  },
  methods: {
    displayFavs() {
      if (this.showFavs == false) {
        this.showFavs = true
      } else this.showFavs = false
    },
    deleteFav() {
      UserService.getCurrentUsername().then((response) => {
        UserService.getByNickname(response.data).then((response) => {
          const user = response.data;
          FavService.deleteFav(user.idUser, this.favorite.idTreasure,).then(() => {
            location.reload()
          }).catch(() => {
            localStorage.setItem('error', JSON.stringify("Error when removing treasure from favorites"))
            this.$router.push("/error")
          })
        }).catch(() => {
        })
      }).catch(() => {
        localStorage.removeItem('token')
        this.$router.push("/login")
      })
    },
  }
}
</script>

<style scoped>
.flex-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bg-green {
  background-color: #4e6a55;
}

.flex {
  font-weight: bold;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.del-img {
  width: 10px;
  height: 10px;
  cursor: pointer;
  margin-left: 1rem;
}

.button {
  text-align: right;
}

a {
  text-decoration: none;
  color: black;
}
</style>