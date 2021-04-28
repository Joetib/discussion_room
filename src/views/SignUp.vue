<template>
  <div class="container">
    <div class="py-5 row d-flex justify-content-center align-items-center">
      <div class="col-md-6">
        <h3>Sign Up</h3>
        <div class="col-12 py-2">
          <label for="id_username">Username</label>
          <input v-model="username" class="form-control" type="text" />
        </div>
        <div class="col-12 py-2">
          <label for="id_password">Password</label>
          <input v-model="password" class="form-control" type="password" />
        </div>
        <div class="col-12 py-3">
          <button class="btn btn-primary" @click="signup">Sign Up</button>
          {{ username }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "SignUp",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  
  methods: {
    signup() {
      axios
        .post("/auth/signup", {
          username: this.username,
          password: this.password,
        })
        .then((e) => {
          this.username = e.data.username;
          this.token = e.data.token;
          this.$store.commit("updateUsername", e.data.username);
          this.$store.commit("updateToken", e.data.token);
          if (this.$route.params.nextUrl !== null) {
            this.$router.push(this.$route.params.nextUrl);
          } else {
            this.$router.push("LogIn");
          }
        })
        .catch((e) => console.error(e));
    },
    
  },
};
</script>
