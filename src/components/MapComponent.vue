<template>
  <div id="map"></div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

export default {
  name: "MapComponent",

  props: {
    treasures: Array[Object]
  },
  data() {
    return {
      latitudeInit: 0,
      longitudeInit: 0,
    }
  },
  methods: {
    setupMap() {
      var map = L.map('map').setView([this.latitudeInit, this.longitudeInit], 6);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      for (let treasure of this.treasures){

        let link = `<a href='${window.location.origin}/treasure/${treasure.id}'>${treasure["name"]}</a>`
        console.log(link)
        L.marker([treasure["latitude"], treasure["longitude"]]).bindPopup(link).addTo(map)
      }
    },
  },
  mounted() {
    this.setupMap()
  }
}


</script>

<style scoped>
#map {
  width: 500px;
  height: 500px;
}
</style>