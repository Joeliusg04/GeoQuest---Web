<template>
  <div class="treasure">
    <img class="image" :id="treasure.idTreasure" alt="treasure-image"/>
    <div class="flex-direction">
      <h3 class="title">{{ treasure.name }}</h3>
      <div class="flex">
        <div class="rating">
          <span v-for="index in maxStars" :key="index" class="star"
                :class="{ filled: index <= treasure.score }">&#9733;</span>
        </div>
        <h4 class="difficulty">Difficulty: {{ treasure.difficulty }}</h4>
      </div>
      <div class="buttons">
        <div>
          <button @click="centerMap">View on map</button>
          <a :href="link">Treasure info</a>
        </div>
        <img @click="redirectAdmin" v-if="Admin" class="config" src="../assets/icons/config.png">
      </div>
    </div>
  </div>
</template>

<script>
import TreasureService from "@/services/treasure.service";
import UserService from "@/services/user.service";

export default {
  name: 'TreasureMap',
  data() {
    return {
      maxStars: 5,
      Admin: false
    };
  },
  props: {
    treasure: Object,
  },
  mounted() {
    document.getElementById(`${this.treasure.idTreasure}`).setAttribute("src", TreasureService.getPicturePath(this.treasure.idTreasure));
    UserService.getCurrentUsername().then((response) => {
      UserService.getByNickname(response.data).then((response) => {
        this.Admin = response.data.userRole === "Admin"
      }).catch(() => {
      });
    }).catch(() => {
      localStorage.removeItem('token')
      this.$router.push("/login")
    });
  },
  methods: {
    centerMap() {
      this.$emit('centerMap', this.treasure);
    }
    ,
    redirectAdmin() {
      window.location.href = '/management/' + this.treasure.idTreasure;
    }
  }
  ,
  computed: {
    link() {
      return `${window.location.origin}/treasure/${this.treasure.idTreasure}`;
    }
  }
}
</script>

<style scoped>
.treasure {
  display: flex;
  align-items: center;
  background: #a4975b;
  border-radius: 20px;
  margin-left: 2rem;
  margin-right: 2rem;
  margin-bottom: 1rem;
}

.title {
  display: flex;
  justify-content: start;
  margin: 0;
  font-size: 30px;
  text-align: center;
  color: black;
}

.image {
  height: 100%;
  width: 200px;
  margin-right: 1rem;
  border-bottom-left-radius: 20px;
  border-top-left-radius: 20px;
}

.flex-direction {
  margin-top: 0.5rem;
  width: 100%;
}

.flex {
  display: flex;
  justify-content: space-around;
  margin: 0;
  align-items: center;
}

.rating {
  color: #ffffff;
  height: 90%;
  width: 90%;
}

.star {
  font-size: 45px;
}

.filled {
  color: #ffee00;
}

.difficulty {
  display: flex;
  margin-right: 1rem;
  color: black;
}

.buttons {
  display: flex;
  margin-top: 1rem;
  align-items: center;
  justify-content: center;
}

.config {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  width: 20px;
  cursor: pointer;
  margin-left: 2rem;

}

button,
a {
  display: inline-block;
  background-color: #5a4a37;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;
  margin: 0.5rem;
}

button:hover,
a:hover {
  background-color: black;
}

</style>
