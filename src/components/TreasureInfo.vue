<template>
  <h1>Treasure {{ treasure.id }}</h1>
    <div class="treasure">

      <div class="treasure2">
        <div class="image-rating">
          <h3>Treasure</h3>
          <img src="../assets/icons/logo.png"/>
          <b> Difficulty: </b>
          <b>Location: </b>
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

.treasure h3 {
  font-size: 30px;
  text-align: left;
}

.treasure2 {
  display: flex;
  flex-direction: column;
  background: #a0deb1;
  border: 4px solid #84b893;
  width: 50%;
  margin: auto;
  text-align: left;
}

.treasure img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 20px;
}


.image-rating {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.image-rating h4 {
  margin-right: 10px;
  font-weight: bold;
  width: 200px;
  text-align: left;

}

.image-rating img {
  width: 300px;
  height: 20px;
  margin-top: 2.5%;
}




</style>
  