
import axios from 'axios'
import { createStore } from 'vuex'



export default createStore({
  state: {
    isAuthenticated: false,
    token: '',
    username: '',
    password: '',
    posts: [],
    current_topic: {
      title: '',
      image: '',
      author: '',
    },
  },
  mutations: {
    clearCurrentTopic(state){
      state.current_topic = {
        title: '',
        image: '',
        author: '',
      }
    },
    updateUsername(state, newUsername) {
      state.username = newUsername
      localStorage.setItem('username', newUsername)
    },
    updatePassword(state, newPassword) {
      state.password = newPassword
    },
    updateToken(state, newToken) {
      state.token = newToken
      localStorage.setItem('token', newToken)
      if (newToken !== null && newToken.length > 1) {
        state.isAuthenticated = true
      }
    },
    updateisAuthenticated(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    fetchTopics(state) {
      axios.get('/retrieve-topics').then(resp => {
        state.posts = resp.data.Topics;
        console.log(state.posts)
      }).catch(e => console.error(e.resp));
    },
    fetchCurrentTopic(state, { id }) {
      axios.get("/discussion-page?id=" + id).then((e) => {
        state.current_topic = e.data["discussion-topic"];
        state.current_topic.replies = e.data["replies to the topic"]
        console.log(state.current_topic);
      });
    },
    initializeStore(state) {
      if (localStorage.getItem('token')) {
        state.token = localStorage.getItem('token')
        state.username = localStorage.getItem('username')
      }
    },
    logout(state){
      localStorage.removeItem('token');
      state.token = null
    },

  },
  actions: {

  },
  modules: {
  }
})
