<template>
  <div class="container pt-5">
    <div class="row">
      <div class="col-md-8">
        <div class="pb-3">
          <h3>{{ topic.title }}</h3>
          <p class="text-muted">{{ topic.author }}</p>
          <div v-if="isAuthor">
            <button @click="deletePost" class="btn btn-danger m-2">Delete</button>
            <button @click="editPost" class="btn btn-success m-2">Edit</button>
          </div>
        </div>
        <div class="pb-3">
          {{ topic.details }}
        </div>
        <img 
          :src="topic.image"
          style="max-height: 60vh; object-fit: cover; width: 100%"
          class="mb-3 img-responsive img-thumbnail"
        />

        <hr />
        <h2 class="pt-5">Replies</h2>
        <hr />
        <div v-for="reply in topic.replies" :key="reply.id">
          <div class="d-flex flex-row align-items-start">
            <img
              :src="reply.image"
              style="width: 80px; object-fit: cover; height: 80px"
              class="img-thumbnail"
              v-if="reply.image"
              alt=""
            />
            <div class="ps-2 w-100">
              <div class="d-flex text-muted justify-content-between">
                <p class="m-0">by {{ reply.replier }}</p>
                <p class="m-0">{{ reply.date_replied }}</p>
              </div>
              <p class="m-0">{{ reply.message }}</p>
            </div>
          </div>
          <hr />
        </div>
        <AddPostComment />
      </div>

      <div class="col-md-4 pt-5 pt-md-0">
        <div class="card bg-dark-3 sticky-top">
          <div class="card-header py-3 bg-dark-2 text-white">Recent Posts</div>
          <div v-for="post in posts" :key="post.id">
            <div class="bb-2 p-3" @click="routeToTopic(post.id)">
              <p class="m-0 pointer">
                {{ post.title }}<br /><small class="m-0 text-muted">{{
                  post.author
                }}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import AddPostComment from "@/components/AddPostComment.vue";
export default {
  components: {
    AddPostComment,
  },

  computed: {
    topic: function () {
      return this.$store.state.current_topic;
    },
    posts: function () {
      return this.$store.state.posts.slice(0, 5);
    },
    isAuthor: function () {
      let extra_message = "Topic posted by";
      let author = this.$store.state.current_topic.author;
      let result = author.slice(extra_message.length + 1, author.length);

      if (result == this.$store.state.username) {
        return true;
      }
      return false;
    },
  },
  methods: {
    routeToTopic(id) {
      this.$router.push(`/topic/${id}`);
      this.$store.commit("fetchCurrentTopic", { id: id });
      window.scrollTo(0, 0)
    },
    editPost(){
        this.$router.push(`/edit/${this.$store.state.current_topic.id}`)
    },
    deletePost() {
      let result = confirm("Are you sure you want to delete this post?");
      if (result) {
        console.log(this.$store.state.current_topic.title)
        axios.post("/delete", {
          title: this.$store.state.current_topic.title,
        }).then(resp => {
            console.log(resp.data)
            this.$router.push('/')
        }).catch(e => console.log(e));
      }
    },
  },
  mounted() {
    this.$store.commit("clearCurrentTopic");
    this.$store.commit("fetchCurrentTopic", { id: this.$route.params.id });
  },
};
</script>

<style>
.bb-2 {
  border-bottom: 1px solid silver;
}
</style>