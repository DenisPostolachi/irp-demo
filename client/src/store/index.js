import Vue from 'vue';
import Vuex from 'vuex';
// import { getReport } from '../src/service/reportServices/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    filters: {
      page: 1,
      pageSize: 10,
    },
  },
  getters: {
    reportFilters: (state) => state.filters,
  },
  mutations: {
    applyFilters: (state, results) => {
      state.filters = { ...state.filters, ...results };
    },
  },
  actions: {},
  modules: {},
});
