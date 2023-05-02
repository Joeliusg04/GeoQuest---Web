<template>
  <h1>Treasure Stats</h1>
  <div class="container">
    <div class="title">
      <h1>Treasure Stats</h1>
    </div>
    <div class="content">
      <div class="stats">
        <div class="stat">
          <h3>Total played:</h3>
          <p>X</p>
        </div>
        <div class="stat">
          <h3>Total found:</h3>
          <p>X</p>
        </div>
        <div class="stat">
          <h3>Total Favourite:</h3>
          <p>X</p>
        </div>
        <div class="stat">
          <h3>Total reviews:</h3>
          <p>X</p>
        </div>
        <div class="stat">
          <h3>Report Quantity:</h3>
          <p>X</p>
        </div>
        <div class="stat">
          <h3>Average time:</h3>
          <p>X</p>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
export default {
  name: 'UserStats',
  props: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  color: black;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

.title {
  align-items: center;
  background-color: #a0deb1;
  padding: 10px;
}

.header h1 {
  margin: 0;
  font-size: 36px;
}

.header button {
  background-color: white;
  border: none;
  color: #84b893;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
}

.content {
  display: flex;
  flex-wrap: wrap;
  background-color: #84b893;
  padding: 20px;
}

.stats {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex: 1 1 300px;
}

.stat {
  text-align: center;
}

.stat h3 {
  margin: 0;
  font-size: 24px;
}

.stat p {
  margin: 10px 0 0;
  font-size: 36px;
}


</style>
      