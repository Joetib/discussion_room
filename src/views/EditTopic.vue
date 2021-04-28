<template>
  <div class="container">
    <div class="py-5 row d-flex justify-content-center align-items-center">
      <div class="col-md-6">
        <h2 class="py-3">{{ topic.title }}</h2>
        <h4>Edit Post</h4>
        <hr />

        <div class="col-12 py-3">
          <label for="id_details">Details</label>
          <textarea
            v-model="details"
            id="id_details"
            class="form-control"
            type="text"
          ></textarea>
        </div>
        <img
          v-if="topic.image"
          :src="topic.image"
          style="max-height: 40vh; object-fit: cover; width: 100%"
          class="mb-3 img-responsive img-thumbnail"
        />
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
  name: "EditTopic",
  data() {
    return {
      details: "",
      image: null,
    };
  },
  computed: {
    topic() {
      if (this.$store.state.current_topic == null) {
        this.$store.commit("fetchCurrentTopic", { id: this.$route.params.id });
      }
      return this.$store.state.current_topic;
    },
  },
  beforeMount() {
    this.$store.commit("fetchCurrentTopic", { id: this.$route.params.id });
    this.details = this.$store.state.current_topic.details;
  },
  mounted(){
    this.details = this.$store.state.current_topic.details;
  },
  methods: {
    addPost() {
      let formData = new FormData();
      this.handleFileUpload();
      if (
        this.image === null || this.image == ''||
        this.image === undefined ||
        typeof this.image === "undefined"
      ) {
        this.image = new File([], null);
      }
      formData.append("id", this.$store.state.current_topic.id);
      formData.append("details", this.details);
      formData.append('image', this.image)
      axios
        .post("/update", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((resp) => {
          console.log(resp.data);
          if (resp.data.status == "OK") {
            this.$router.push(`/topic/${this.$store.state.current_topic.id}`);
          }
        })
        .catch((e) => {
          console.error(e);
          alert("sorry, that didn't work, try again.");
        });
    },
    handleFileUpload() {
      this.image = this.$refs.image.files[0];
    },
  },
};
</script>

<style>
</style>