import axios from 'axios'
const state = {
  websites: []
};
// mutations is synchronous 
const mutations = {
  SET_WEBSITES(state, websites) {
      state.websites = websites
  }
}
// actions is asynchronous 
const actions = {
  getWebsiteLists({ commit }) {
      axios.get('http://localhost:3000/server/api/website_lists')
          .then(response => {
            commit('SET_WEBSITES', response.data)
      })
  }
};
const website_list = {
    state,mutations,actions
}
export default website_list
