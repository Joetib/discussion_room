<template>
  <div class="card bg-dark-3">
    <div class="card-body">
      <textarea
        v-model="comment"
        class="form-control bg-dark-2 text-light"
      ></textarea>
      <div class="col-12 py-2">
        <input
          type="file"
          id="id_image"
          class="form-control bg-dark-2 text-light"
          ref="image"
          @change="handleFileUpload"
        />
      </div>
      <div>
        <button @click="save" class="btn btn-primary">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AddPostComment",
  data() {
    return { id: null, comment: "" };
  },
  beforeCreate() {
    this.id = this.$route.params.id;
  },
  methods: {
    handleFileUpload() {
      console.log("handling posts");
      this.image = this.$refs.image.files[0];
    },
    save() {
      if (this.comment && this.comment.length > 1) {
        let formData = new FormData();
        formData.append("image", this.image);
        formData.append("replyer", this.$store.state.username);
        formData.append("title", this.$store.state.current_topic.title);
        formData.append("message", this.comment);
        axios
          .post(`/discussion-page?id=${this.id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((resp) => {
            console.log(resp.data);
            this.$store.commit("fetchCurrentTopic", {
              id: this.$store.state.current_topic.id,
            });
            this.comment = "";
            this.image = null;
          })
          .catch((e) => {
            console.error(e.resp);
            alert("sorry, that didn't work, try again. Please add an image.");
          });
      }
    },
  },
};
</script>

<style>
</style>