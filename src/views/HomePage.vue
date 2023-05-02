<template>
  <nav-bar v-if="logged"/>
  <navbar-guest v-if="!logged"/>
  <div class="info">
    <iframe width="3560" height="315" src="https://www.youtube.com/embed/1YTqitVK-Ts" title="What is geocaching"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen></iframe>
    <p class="text">Geocaching is a recreational activity that involves using GPS coordinates and clues to find hidden
      containers, called geocaches, in various locations around the world. Geocaching is often described as a "treasure
      hunt" where participants use GPS-enabled devices, such as smartphones or handheld GPS units, to navigate to
      specific coordinates and search for the hidden caches. The geocaches can range in size from tiny containers, such
      as film canisters, to larger containers, such as ammo boxes, and can be hidden in both urban and rural areas.
      Geocachers typically sign a logbook located within the geocache to show they found it and may exchange small
      trinkets with the cache, which is a traditional practice known as "swag." Geocaching is a popular hobby enjoyed by
      people of all ages and is a great way to explore new places, get exercise, and challenge yourself mentally. The
      activity is also often used in education as a fun and interactive way to teach navigation, geography, and other
      subjects.</p>
  </div>
  <div class="nuestraApp">
    <h2>4 SIMPLES STEPS TO USE GEOQUEST:</h2>
    <Step class="step" step="1. Download our app!" :path="require('../assets/icons/download.png')"/>
    <Step class="step" step="2. Register" :path="require('../assets/icons/user.png')"/>
    <Step class="step" step="3. Search for an interesting geocaching on your location"
          :path="require('../assets/icons/search.png')"/>
    <Step class="step" step="4. Start enjoying and having fun trying to find a treasure"
          :path="require('../assets/icons/phonemap.png')"/>
  </div>
  <Footer/>
</template>

<script>
import Footer from "@/components/Footer.vue";
import Step from "@/components/Step.vue"
import NavbarGuest from "@/components/NavbarGuest.vue";
import NavBar from "@/components/Navbar.vue";

export default {
  name: 'HomePage',
  components: {
    NavBar,
    NavbarGuest,
    Footer,
    Step
  },
  computed: {
    logged(){
      return localStorage.getItem("logged")==="true";
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.info {
  display: flex;
  padding: 5rem 10rem 0rem 10rem;
}

iframe {
  margin-right: 3rem;
}

h2 {
  display: flex;
  justify-content: left;
}

.text {

  color: black;
  text-align: justify;
  text-justify: inter-word;
  line-height: 1.5;
}

.nuestraApp {
  align-items: center;
  padding: 5rem 10rem 5rem 10rem;
}

.step {
  display: inline-block;
  justify-content: left;
  width: 20%;
}


</style>
