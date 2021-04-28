<template>
  <div class="home">
    <div
      class="container py-4 d-flex align-items-center justify-content-center"
    >
      <div class="row g-3 g-md-4">
        <div class="col-12">
          <h3>Topics</h3>
        </div>
        <div class="col-12 d-flex justify-content-center">
          <input
            type="text"
            class="search-input"
            placeholder="search"
            v-model="search"
          />
        </div>
        <div v-for="post in posts" :key="post.id" class="col-12">
          <div class="card pointer bg-dark-2" @click="routeToTopic(post.id)">
            <div class="card-body">
              <h5 class="m-0">{{ post.title }}</h5>
            </div>
            <div class="card-footer bg-dark-3 d-flex justify-content-between">
              <p class="m-0">{{ post.author }}</p>
              <p class="m-0">{{ post.number_of_replies }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
      search: "",
    };
  },
  beforeCreate() {
    this.$store.commit("fetchTopics");
  },
  computed: {
    posts() {
      if (this.search) {
        return this.$store.state.posts.filter((i) =>
          i.title.includes(this.search)
        );
      }
      return this.$store.state.posts;
    },
  },
  methods: {
    routeToTopic(id) {
      this.$router.push("/topic/" + id);
    },
  },
};
</script>

<style scoped>
.search-input {
  padding: 10px 20px;
  text-align: center;
  border: 0;
  outline: 0;
  background: transparent;
  width: 100%;
  min-width: 100px;
  border-bottom: 2px solid silver;
  transition: all 0.6s;
}
.search-input:focus {
  color: rgb(34, 145, 145);
  border-bottom: 2px solid rgb(34, 145, 145);
  font-size: 18px;
}
@media screen and (min-width: 720px) {
  .home .row {
    width: 70%;
    min-width: 400px;
  }
}
</style>