<template>
  <h1>Treasure {{ treasure.id }}</h1>
  <div class="treasure">
    <img src="../assets/icons/logo.png"/>
    <div class="treasure-wrap">
      <h3>Treasure</h3>
      <div class="treasure2">
        <div class="username-rating">
          <img src="../assets/icons/logo.png"/>
          <h4> Dificulty</h4>
        </div>
        <p> Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el
          texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se
          dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un
          libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en
          documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación
          de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de
          autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.</p>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'TreasureInfo',
  components: {},
  props: {
    treasure: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.treasure-wrap h3 {
  font-size: 30px;
}

.treasure-wrap {
  flex-wrap: wrap;
  text-align: left;
}

.treasure {
  display: flex;
  align-items: center;
  margin: 20px 0;
  background: #a0deb1;
  border: 4px solid #84b893;
  width: 80%;
  margin: auto;
}

.treasure img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 20px;
}

.treasure2 {
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
  width: 300px;
  height: 20px;
  margin-top: 2.5%;
}

.treasure2 p {
  text-align: left;
}


</style>
  