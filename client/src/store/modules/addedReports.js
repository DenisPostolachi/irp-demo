const localStorageKey = 'infoReports';
const state = {
  infoReports: JSON.parse(localStorage.getItem(localStorageKey)) || [],
};

const mutations = {
  addReportItem: (state, item) => {
    const existingItem = state.infoReports.find(
      (report) => report.id === item.id,
    );
    if (!existingItem) {
      state.infoReports.push(item);
      localStorage.setItem(localStorageKey, JSON.stringify(state.infoReports));
    }
  },
  removeReportItem(state, item) {
    state.infoReports = state.infoReports.filter(
      (reportItem) => reportItem.id !== item.id,
    );
    localStorage.setItem(localStorageKey, JSON.stringify(state.infoReports));
  },
};

const getters = {};

export default {
  state,
  getters,
  mutations,
};
