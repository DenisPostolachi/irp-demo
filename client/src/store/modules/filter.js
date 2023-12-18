const state = {
  filters: {
    page: 1,
    pageSize: 10,
  },
};

const getters = {
  reportFilters: (state) => state.filters,
};

const mutations = {
  applyFilters: (state, results) => {
    state.filters = { ...state.filters, ...results };
  },
  resetFilters: (state) => {
    state.filters = { page: 1, pageSize: 10 };
  },
};

export default {
  state,
  getters,
  mutations,
};
