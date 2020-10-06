import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,

  state: {
    user: {
      name: '',
      password: ''
    }
  },

  mutations: {
    setUser (state, user) {
      Object.state(state.user, user)
    }
  },

  actions: {

  },

  plugins: []
})

export default store
