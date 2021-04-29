<template>
  <div class="container">
    <div class="py-5 row d-flex justify-content-center align-items-center">
      <div class="col-md-6">
        <h3>Sign Up</h3>
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
          <button class="btn btn-primary" @click="signup">Sign Up</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SignUp",
  data() {
    return {
      username: "",
      password: "",
      error: null,
    };
  },

  methods: {
    signup() {
      if (this.username.length < 3) {
        this.error = "Username must be at least 3 characters long";
      } else if (this.username.includes(" ")) {
        this.error = "Username must contain no spaces";
      } else if (this.password.length < 5) {
        this.error = "Password must be at least 5 characters long";
      } else {
        this.$store.commit("setIsLoading", true);

        axios
          .post("/auth/signup", {
            username: this.username,
            password: this.password,
          })
          .then((e) => {
            console.log(e.data);
            this.$store.commit("setIsLoading", false);
            this.$router.push("/login");
          })
          .catch((e) => {
            console.log(e);
            this.error = `Sorry, that failed, try using a different username as '${this.username}' might be already taken`;
            this.$store.commit("setIsLoading", true);
          });
      }
    },
  },
};
</script>
