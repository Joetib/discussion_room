<template>
  <div id="nav" class="bg-dark text-light">
    <NavBar />
  <router-view/>
  </div>
</template>
<script>
import NavBar from './components/layout/NavBar.vue'
export default {
  name: 'App',
  components: {
    NavBar,
  },
  beforeCreate() {
    this.$store.commit("fetchTopics");
  },
}
</script>
<style>
.pointer {
  cursor: pointer;
}
.bg-dark-2{
  background: #333;
}
.bg-dark-3{
  background: #444;
}
.form-control{
  background: #555;
  color: #ddd;
}
.form-control:focus{
  background: #444;
  color: #ccc;
}
</style>
