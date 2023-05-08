<template>
  <div id="map" :style="{width:mapWidth, height:mapHeight}"></div>
</template>


<!--<script setup>
import TreasureService from "@/services/treasure.service";
import {ref} from "vue";

const treasures = ref(null)
async function load() {
  treasures.value = await TreasureService.getAll().then(
      (response) => {
        console.log(response.data)
        console.log("tipus es:" + typeof response.data)
        this.$refs.mapa.setTreasures([response.data])
        this.treasures = response.data;

      }).catch(
      (error) => {
        console.log(error)
        var code = error.code
        this.$route.push(`/error/${code}`);
      }
  );


}
load()
</script>-->


<script>
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import TreasureService from "@/services/treasure.service";

export default {
  name: "MapComponent",

  props: {
    //treasures: Array[Object],
    size: Array,
    id: String,
    new: Boolean
  },
  data() {
    return {
      marker: "",
      latitudeInit: 41.45,
      longitudeInit: 2.18,
      map: "",
      treasures: [],
    }
  },
  methods: {
    setupMap() {

      this.map = L.map('map', {minZoom: 2, maxBounds: [[90, 180], [-90, -180]],})
          .setView([this.latitudeInit, this.longitudeInit], 8);


      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);


      this.map.on('click', (e) => {
        if (window.location.pathname === '/management') {
          this.$emit('emitCoords', e.latlng.lat, e.latlng.lng)
        }
      })

    },
    centerMap(center) {
      this.map.setView(center, 15);
    },
    addMarker(center) {

      this.marker.setLatLng(center)
      this.map.setView(center)
    },

  },
  mounted() {

    this.setupMap()
    if (this.id !== undefined && this.id !== "") {
      //console.log("ID ES "+this.id)
      TreasureService.getById(this.id).then(
          (response) => {
            console.log(response.data)
            const treasure = response.data;
            this.marker = L.marker([treasure.latitude, treasure.longitude]).addTo(this.map)
            this.map.setView([treasure.latitude, treasure.longitude], 8)
          },
          (error) => {
            console.log(error)
            const code = error.message;
            console.log("code: " + code)
            this.$router.push(`/error/${code}`);
          }
      );
    } else if (!this.new === true) {
      TreasureService.getAll().then(
          (response) => {
            console.log(response.data)
            this.treasures = response.data;

            for (let treasure of this.treasures) {
              let link = `<a href='${window.location.origin}/treasure/${treasure.idTreasure}'>${treasure["name"]}</a>`
              // console.log(treasure)
              L.marker([treasure.latitude, treasure.longitude]).bindPopup(link).addTo(this.map)
            }
          },
          (error) => {
            console.log(error)
            const code = error.code;
            this.$router.push(`/error/${code}`);
          }
      );
    } else {
      this.marker = L.marker([0, 0]).addTo(this.map)
      this.map.setView([0, 0], 8)
    }


  }
  ,
  computed: {
    mapWidth() {
      return this.size[0]
    }
    ,
    mapHeight() {
      return this.size[1]
    }
  },
}


</script>

<style scoped>
/*#map {*/
/*  width: 800px;*/
/*  height: 700px;*/
/*}*/
</style>