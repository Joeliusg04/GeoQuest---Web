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
        <p v-if="report.reportInfo.length > 300" class="report-text-scroll">{{ report.reportInfo }}</p>
        <p v-else class="report-text-normal">{{ report.reportInfo }}</p>
      </div>
      <!--      <p>{{ review.path }}</p>-->
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
    }).catch((error) => {
      console.log(error)
    })
  },
  methods: {
    deleteReport() {
      ReportService.deleteByUser(this.user.idUser, this.report.idReport).then((response) => {
        console.log(response.data)
        location.reload()
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
.report {
  display: flex;
  background: #a0deb1;
  border: 4px solid #84b893;
  width: 45%;
  margin: auto;
  border-radius: 25px;
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
}


.username-rating h4 {
  margin-right: 10px;
  font-weight: bold;
  width: 200px;
  text-align: left;

}

button {
  height: 50%;
}

.report-text {
  max-height: 150px;
  overflow-y: scroll;
}

.report-text-normal {
  margin: 0;
}

.report-text-scroll {
  margin: 0;
  white-space: pre-line;
  overflow-wrap: anywhere;
}
</style>