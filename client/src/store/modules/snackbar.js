const state = {
  snackbar: {
    show: false,
    message: '',
    color: '',
    duration: 3000,
  },
};

const mutations = {
  showSnackbar: (state, { message, color, duration }) => {
    state.snackbar.show = true;
    state.snackbar.message = message;
    state.snackbar.color = color;
    state.snackbar.duration = duration;
  },
  hideSnackbar: (state) => {
    state.snackbar.show = false;
  },
};

const getters = {
  getSnackbarData: (state) => state.snackbar,
};

export default { state, mutations, getters };
