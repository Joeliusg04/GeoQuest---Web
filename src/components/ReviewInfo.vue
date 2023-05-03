<template>
  <div class="review">
    <img src="../assets/icons/logo.png"/>
    <div class="review2">
      <div class="username-rating">
        <h4> Username</h4>
        <img src="../assets/icons/logo.png"/>
      </div>
      <p> Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el
        texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se
        dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro
        de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos
        electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas
        "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como
        por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReviewInfo',
  props: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.review {
  display: flex;
  align-items: center;
  margin: 20px 0;
  background: #a0deb1;
  border: 4px solid #84b893;
  width: 99.7%;
  margin: auto;
}

.review img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 20px;
}

.review2 {
  width: 100%;
}

.username-rating {
  display: flex;
}

.username-rating h4 {
  margin-right: 10px;
  font-weight: bold;
  width: 200px;
  text-align: left;

}

.username-rating img {
  margin-left: 20px;
  width: 300px;
  height: 20px;
  margin-top: 2.5%;
}


</style>
