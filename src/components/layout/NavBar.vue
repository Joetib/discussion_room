<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark-2">
    <div class="container">
      <router-link class="navbar-brand" style="font-size: 28px" to="/"
        >Discussion</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse pe-5 w-100"
        id="navbarSupportedContent"
      >
        <div class="mx-md-auto">
          <ul class="navbar-nav mx-md-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link active" aria-current="page" to="/"
                >Home</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/addtopic"
                >Add Topic</router-link
              >
            </li>
          </ul>
        </div>
        <ul class="navbar-nav ms-md-auto">
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="nav-link" to="/login">Log In</router-link>
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="nav-link" to="/signup">Sign Up</router-link>
          </li>
          <li class="nav-item ms-md-auto" v-if="isLoggedIn">
            <a @click="logout" class="nav-link btn btn-sm btn-danger"
              >Log Out</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: "NavBar",
  beforeCreate() {
    this.$store.commit("initializeStore");
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.token !== null && this.$store.state.token !== "";
    },
  },
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.navbar-brand {
  font-family: cursive;
  font-weight: bolder;
  color: rgb(34, 145, 145);
}
a.nav-link {
  color: rgb(29, 107, 107);
}
a {
  color: rgb(34, 145, 145);
}
</style>