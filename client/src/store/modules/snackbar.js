const state = {
  snackbar: {
    show: false,
    message: '',
    color: '',
    timeoutId: null,
  },
};

const mutations = {
  showSnackbar: (state, { message, color }) => {
    state.snackbar.show = true;
    state.snackbar.message = message;
    state.snackbar.color = color;
  },
  hideSnackbar(state) {
    state.snackbar.show = false;
    state.snackbar.message = '';
    state.snackbar.color = '';
    clearTimeout(state.snackbar.timeoutId);
    state.snackbar.timeoutId = null;
  },
  setTimeoutId(state, timeoutId) {
    state.snackbar.timeoutId = timeoutId;
  },
};

const getters = {
  getSnackbarData: (state) => state.snackbar,
};

export default { state, mutations, getters };
