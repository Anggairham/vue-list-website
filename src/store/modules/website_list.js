import axios from 'axios'
const state = {
  websites: [],
  website: null,
};
const getters = {
  website: state => state.website
};
// mutations is synchronous 
const mutations = {
  SET_WEBSITES(state, websites) {
      state.websites = websites
  },
  // saveNewWebsite(state, website){
  //   // UNSHIFT AKAN memasukan data baru pada urutan pertama
  //   // state.websites.unshift(website)
  //   // PUSH AKAN memasukan data baru pada urutan terakhir
  //   state.websites.push(website);
  // },
  setWebsiteDetail(state, website) {
    state.website = website
  },
  saveUpdatedWebsite(state, website) {
    let index = state.websites.findIndex((c) => c.id == website.id);
    if (index > -1) {
    //   state.websites[index] = website;
    }
  },
}
// actions is asynchronous 
const actions = {
  getWebsiteLists({ commit }) {
      axios.get(`http://localhost:3000/server/api/website_lists`)
          .then(response => {
            commit('SET_WEBSITES', response.data)
      })
  },
  async storeWebsite({ commit }, website) {
    await axios.post(`http://localhost:3000/server/api/website_lists`, website)
      .then(res => {
        // console.log(res)
        commit('saveNewWebsite', res.data);
      }).catch(err => {
        console.log('error', err);
      });
  },
  async fetchDetailWebsite({ commit }, id) {
    await axios.get(`http://localhost:3000/server/api/website_lists/${id}`)
      .then(res => {
        commit('setWebsiteDetail', res.data);
      }).catch(err => {
        console.log('error', err);
      });
  },
  async updateWebsite({ commit }, website) {
    await axios.put(`http://localhost:3000/server/api/website_lists/${website.id}`, website)
      .then(res => {
        commit('saveUpdatedWebsite', res.data);
      }).catch(err => {
        console.log('error', err);
      });
  },
};
const website_list = {
    state,getters,mutations,actions,
    namespaced: true
}
export default website_list
