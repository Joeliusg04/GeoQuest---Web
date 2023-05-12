<template>

  <div class="report">
    <div class="report2">
      <div class="username-date">
        <!--        <h4> {{ user.username }} - {{ review.solved }} </h4> -->
        <div>
          <h4>Reported by: {{ user.nickName }} - Date: {{ report.reportDate }} </h4>
        </div>
        <button class="delete" @click="deleteReport"><img class="delete-image" src="../assets/icons/borrar.png"></button>
      </div>
      <div class="report-text">
        <p>{{ report.reportInfo }}</p>
      </div>
    </div>
  </div>
</template>

<script>

import UserService from "@/services/user.service";
import ReportService from "@/services/report.service";

export default {
  name: "ReportInfo",
  data() {
    return {
      user: ""
    }
  },
  props: {
    report: Object,
  },
  mounted() {
    UserService.getById(this.report.idUser).then((response) => {
      this.user = response.data
    }).catch(() => {
      localStorage.setItem('error', JSON.stringify("Error when loading resources"))
      this.$router.push("/error")
    })
  },
  methods: {
    deleteReport() {
      ReportService.deleteByUser(this.user.idUser, this.report.idReport).then(() => {
        location.reload()
      }).catch(() => {
        localStorage.setItem('error', JSON.stringify("Error when deleting report"))
        this.$router.push("/error")
      })
    }
  }
}
</script>

<style scoped>
*{
  color: black;
}
.report {
  display: flex;
  background-color: #4e6a55;
  border: 4px solid black;
  width: 45%;
  margin: auto;
  border-radius: 25px;
}
h4{
  font-weight: bold;
}

.report2 {
  width: 100%;
}

.delete {
  display: flex;
  align-items: center;
  background-color: red;
  margin: 0;
  padding: 0;
}

.report2 p {
  margin: 2rem;
  align-items: center;
  text-align: left;
}


.username-date {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.delete-image {
  height: 20px;
  width: 20px;
  cursor: pointer;
}
.delete-image:hover{
  background-color: lightgray;
}

button {
  height: 50%;
}

.report-text {
  max-height: 200px;
}

</style>