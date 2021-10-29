import axios from 'axios'
const state = {
  login: {
    username : "",
    password : "",
  },
  isSubmited: {
    loading: false,
    status: null,
    message: '',
  },
};
const getters = {
  login: state => state.login,
  isSubmited: state => state.isSubmited,
};
// mutations is synchronous 
const mutations = {
  setLogin(state, login) {
    state.login = login
  },
  setIsSubmited(state, isSubmited) {
    state.isSubmited = isSubmited
  },
}
// actions is asynchronous 
const actions = {
  async login({ commit }, login) {
    commit('setIsSubmited', {loading : true});
    await axios.post(`${process.env.VUE_APP_API_URL}authentication/login`, login)
      .then((res) => {
        commit('setIsSubmited', {loading : false,status:'success', message:res.data.message});
      }).catch(err => {
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          commit('setIsSubmited', {loading : false,status:'failed',  message:err.response.data.message});
        } else if (err.request) {
          // The request was made but no response was received
          // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(err.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', err.message);
        }
        
      });
  },

};
const authentication = {
    state,getters,mutations,actions,
    namespaced: true
}
export default authentication
