<template>
  <div>
    <h3>{{ step }}</h3>
    <img :src="path" alt="step-image"/>
  </div>
</template>

<script>
export default {
  name: 'SteP',
  props: {
    step: String,
    path: String,
  }
}
</script>
<style scoped>
h3 {
  color: #3d5443;
}

img {
  height: 200px;
  width: 200px;
}
</style>