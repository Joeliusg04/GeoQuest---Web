<template>
  <nav-bar/>
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
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}

</script>

<style scoped>

</style>
    