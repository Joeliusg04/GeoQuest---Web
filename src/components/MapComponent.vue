<template>
  <div id="map"></div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

export default {
  name: "MapComponent",

  props: {
    treasures: Array[Object],
  },
  data() {
    return {
      latitudeInit: 0,
      longitudeInit: 0,
      map: ""
    }
  },
  methods: {
    setupMap() {
      this.map = L.map('map', {minZoom: 2, maxBounds: [[90, 180], [-90, -180]],})
          .setView([this.latitudeInit, this.longitudeInit], 6);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      for (let treasure of this.treasures) {

        let link = `<a href='${window.location.origin}/treasure/${treasure.id}'>${treasure["name"]}</a>`
        L.marker([treasure["latitude"], treasure["longitude"]]).bindPopup(link).addTo(this.map)
      }
    },
    centerMap(center) {
      this.map.setView(center, 6);

    }
  },
  mounted() {
    this.setupMap()
  },


}


</script>

<style scoped>
#map {
  width: 800px;
  height: 700px;
}
</style>