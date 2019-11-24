import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    total: 0
  },
  mutations: {
    start(state, data) {
      state.total = ++data
    }
  },
  actions: {
  },
  modules: {
  }
})
