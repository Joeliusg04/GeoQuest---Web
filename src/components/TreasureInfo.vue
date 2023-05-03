<template>
      <div class="treasure2">
        <div class="image-rating">
          <h3>Treasure</h3>
          <img class="rating" src="../assets/icons/rating.png"/>
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
.treasure2 h3 {
  font-size: 50px;
}

.treasure2 {
  display: flex;
  flex-direction: column;
  background: #a0deb1;
  border: 4px solid #84b893;
  width: 99.59%;
  margin: auto;
  text-align: left;
}

.rating{
  height: 50px;
  width: 40%;
}


.image-rating {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}




</style>
  