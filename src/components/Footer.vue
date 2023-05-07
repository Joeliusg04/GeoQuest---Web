<template>
  <footer>
    <div class="container">
      <div>
        <h3>About us</h3>
        <p>GeoQuest is a geocaching company...</p>
      </div>
      <div>
        <h3>Social media</h3>
        <a @click="redirectToExternalPage('twitter')"><img src="../assets/icons/twitter.png" alt="twitter"></a>
        <a @click="redirectToExternalPage('instagram')"><img src="../assets/icons/instagram.png" alt="instagram"></a>
        <a @click="redirectToExternalPage('facebook')" href="#"><img src="../assets/icons/facebook.png" alt="facebook"></a>
      </div>
      <div>
        <h3>Contact</h3>
        <p>silici@geocaching.com</p>
        <p>+34 937 07 00 20</p>
        <p>Carrer d'Aiguablava, 121.</p>
        <p>08033, Barcelona</p>
      </div>
    </div>
    <hr>
    <p class="copyright">© 2023 GeoQuest. All rights reserved.</p>
  </footer>

</template>

<script>
export default {
  name: 'FooTer',
  methods: {
    redirectToExternalPage(name) {
      window.location.assign('https://www.' + name + '.com');
    }
  }
}
</script>

<style scoped>
/* *{
    border: black solid 1px;
} */
h3 {
  color: white;
}

footer {
  background-color: #3d5543;
  color: white;
  padding: 20px;
}

.container {
  display: flex;
  justify-content: space-around
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

hr {
  border-color: white;
  margin: 20px 0;
}

.copyright {
  text-align: center;
  margin: 0;
}

a, img {
  height: 50px;
  width: 50px;
  padding: 5px;
}
</style>