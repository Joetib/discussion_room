<template>
  <div class="container">
    <div class="py-5 row d-flex justify-content-center align-items-center">
      <div class="col-md-6">
        <h3>Add Post</h3>
        <div class="col-12 py-3">
          <label for="id_title">Title:</label>
          <input
            v-model="title"
            id="id_title"
            class="form-control"
            type="text"
          />
        </div>
        <div class="col-12 py-3">
          <label for="id_details">Details</label>
          <textarea
            v-model="details"
            id="id_details"
            class="form-control"
            type="text"
          ></textarea>
        </div>
        <div class="col-12 py-3">
          <label for="id_image">Image</label>
          <input
            class="form-control"
            ref="image"
            v-on:change="handleFileUpload"
            type="file"
          />
        </div>
        <div class="col-12 py-3">
          <button class="btn btn-primary" @click="addPost">Save Post</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "AddTopic",
  data() {
    return {
      title: "",
      details: "",
      image: null,
    };
  },
  methods: {
    addPost() {
      let formData = new FormData();
      formData.append("image", this.image);
      formData.append("author", this.$store.state.username);
      formData.append("title", this.title);
      formData.append("details", this.details);
      axios
        .post("/insert", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((resp) => {
          console.log(resp.data);
          if (resp.data.status == "OK") {
            this.$router.push("/");
          }
        })
        .catch((e) => {
            console.error(e);
            alert("sorry, that didn't work, try again.")

        });
    },
    handleFileUpload() {
      console.log("handling posts");
      this.image = this.$refs.image.files[0];
    },
  },
};
</script>

<style>
</style>