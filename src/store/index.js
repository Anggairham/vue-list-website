import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import website_list from './modules/website_list'

Vue.use(Vuex)
const state = {
  posts: [],
};
// mutations is synchronous 
const mutations = {
  SET_POSTS(state, posts) {
      state.posts = posts
  },
}
// actions is asynchronous 
const actions = {
  getPosts({ commit }) {
      axios.get('https://jsonplaceholder.typicode.com/posts')
          .then(response => {
              commit('SET_POSTS', response.data)
      })
  },
};
const modules = {
  website_list
};
export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules
})
