<template>
  <nav-bar/>
  <div class="flex"><router-link class="link" v-show="this.$route.params.idTreasure !== ''" to="/management"><img class="add" src="../assets/icons/add.png"><p>Add new treasure</p></router-link></div>
  <FormulariTreasure v-bind:id="this.$route.params.idTreasure"/>
  <div v-if="this.$route.params.idTreasure!==''">
    <ReportInfo v-for="(report, index) of reports" v-bind:key="index" v-bind:report="report"/>
    <h3 v-if="reports===''">This treasure has not been reported</h3>
  </div>

  <Footer/>
</template>

<script>
import FormulariTreasure from "@/components/FormulariTreasure.vue";
import Footer from "@/components/Footer.vue";
import NavBar from "@/components/Navbar.vue";
import ReportInfo from "@/components/ReportInfo.vue";
import ReportService from "@/services/report.service";

export default {
  name: "ManagementView",
  components: {NavBar, Footer, FormulariTreasure, ReportInfo},
  data() {
    return {
      reports: ""
    }

  },
  props: {
    id: String
  },
  watch: {
    '$route.query': {
      handler: function () {
        location.reload()
      }
    }
  },
  mounted() {

    if (this.$route.params.idTreasure !== '') {
      ReportService.getAllByTreasure(this.$route.params.idTreasure).then((response) => {
        this.reports = response.data
      }).catch(() => {
      })
    }
  }
}

</script>

<style scoped>
.flex{
  display: flex;
justify-content: center;
align-items: center;
margin-top: 0.5rem;
}

.add{
  height: 40px;
  width: 40px;
}
p{
  display: flex;
  text-align: center;
  justify-content: center;
  text-decoration: none;
  margin-left: 1rem;
  width: auto;
}
.link{
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: auto;
  text-decoration: none;
  color: black;
}
</style>
    