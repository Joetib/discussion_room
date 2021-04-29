
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
    is_loading : false,
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
      state.is_loading = true
      axios.get('/retrieve-topics').then(resp => {
        state.posts = resp.data.Topics;
        console.log(state.posts)
        state.is_loading = false
      }).catch(e => {
        console.error(e.resp);
        state.is_loading = false
      });
    },
    fetchCurrentTopic(state, { id }) {
      state.is_loading = true;
      axios.get("/discussion-page?id=" + id).then((e) => {
        state.current_topic = e.data["discussion-topic"];
        state.current_topic.replies = e.data["replies to the topic"]
        console.log(e.data)
        console.log(state.current_topic);
        state.is_loading = false
      }).catch(() => {
        state.is_loading = false
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
    setIsLoading(state, value){
      state.is_loading = value

    },

  },
  actions: {

  },
  modules: {
  }
})
