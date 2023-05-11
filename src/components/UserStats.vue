<template>
  <div class="container">
    <div class="title">
      <h1>User Stats</h1>
    </div>
    <div class="content">
      <div class="stats">
        <div class="stat">
          <h3>Solved games:</h3>
          <p>{{ userStats.solved }}</p>
        </div>
        <div class="stat">
          <h3>Not solved:</h3>
          <p>{{ userStats.notSolved }}</p>
        </div>
        <div class="stat">
          <h3>Report Quantity:</h3>
          <p>{{ userStats.reportQuantity }}</p>
        </div>
        <div class="stat">
          <h3>Average time:</h3>
          <p>{{ userStats.averageTime }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import UserService from "@/services/user.service";

export default {
  name: 'UserStats',
  data() {
    return {
      userStats: ""
    }
  },
  props: {},
  mounted() {

    UserService.getCurrentUsername().then((response) => {
      UserService.getByNickname(response.data).then((response) => {
        const id = response.data.idUser
        UserService.getStats(id).then((response) => {
          this.userStats = response.data
        }).catch(() => {
          localStorage.setItem('error', JSON.stringify("Error when getting treasure stats"))
          this.$router.push("/error")
        });
      }).catch(() => {
      });
    }).catch(() => {
      localStorage.removeItem('token')
      this.$router.push("/login")
    });
  }
}
</script>


<style scoped>
* {
  color: black;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

.title {
  align-items: center;
  background-color: #a0deb1;
  padding: 10px;
}

.header h1 {
  margin: 0;
  font-size: 36px;
}

.header button {
  background-color: white;
  border: none;
  color: #84b893;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
}

.content {
  display: flex;
  flex-wrap: wrap;
  background-color: #84b893;
  padding: 20px;
}

.stats {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex: 1 1 300px;
}

.stat {
  text-align: center;
}

.stat h3 {
  margin: 0;
  font-size: 24px;
}

.stat p {
  margin: 10px 0 0;
  font-size: 36px;
}


</style>
  