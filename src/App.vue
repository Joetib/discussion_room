<template>
  <div id="nav" class="bg-dark text-light">
    <NavBar />
    <div class="loading sticky-top" v-if="$store.state.is_loading">
    <div class="circle-loaer"></div>
      <span class="load-item"></span>
        <span class="load-item"></span>
        <span class="load-item"></span>
      </div>
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
@keyframes loading {
  0%{
    background: gold;
  }
  70%{
    background: #555;
  }
}
.load-item {
  border-radius: 50%;
  padding: 10px;
  width: 10px;
  height: 10px;
  background: #555;
  margin: 20px;
  animation: loading 0.9s ease-in infinite;
}
.load-item:nth-child(1){
  animation-delay: 0s
}
.load-item:nth-child(2){
  animation-delay: 0.3s
}
.load-item:nth-child(3){
  animation-delay: 0.6s
}
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
}
@keyframes spin {
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg)
  }
  
}
.circle-loader {
  border: 16px solid rgb(68, 59, 9);
  border-top: 16px solid #666;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;

}
</style>
