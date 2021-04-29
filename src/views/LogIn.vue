<template>
  <div class="container">
    <div class="py-5 row d-flex justify-content-center align-items-center">
      <div class="col-md-6">
        <h3>Log In</h3>
        <div class="col-12 text-danger bg-light p-2" v-if="error">
          <p class="m-0">{{ error }}</p>
        </div>
        <div class="col-12 py-2">
          <label for="id_username">Username</label>
          <input v-model="username" class="form-control" type="text" />
        </div>
        <div class="col-12 py-2">
          <label for="id_password">Password</label>
          <input v-model="password" class="form-control" type="password" />
        </div>
        <div class="col-12 py-3">
          <button class="btn btn-primary" @click="login">Log In</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LogIn",
  data() {
    return {
      username: "",
      password: "",
      error: null,
    };
  },
  methods: {
    login() {
      if (this.username.length < 3) {
        this.error = "Username must be at least 3 characters long";
      }else if (this.username.includes(" ")) {
        this.error =
          "Username must contain no spaces";
      }  else if (this.password.length < 5) {
        this.error = "Password must be at least 5 characters long";
      } else {
        axios
          .post("/auth/login", {
            username: this.username,
            password: this.password,
          })
          .then((e) => {
            this.username = e.data.username;
            this.token = e.data.token;
            this.$store.commit("updateUsername", e.data.username);
            this.$store.commit("updateToken", e.data.token);
            if (this.$route.params.nextUrl == null) {
              this.$router.push("/");
            } else {
              this.$router.push(this.$route.params.nextUrl);
            }
          }).catch(e => {
            this.error = "Sorry that didn't work, check if your username and password are correct."
            console.log(e)
          });
      }
    },
  },
};
</script>
