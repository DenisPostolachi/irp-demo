import Vue from 'vue';
import Vuex from 'vuex';
import filter from '@/store/modules/filter';
import addedReport from '@/store/modules/addedReports';
import snackbar from '@/store/modules/snackbar';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { filter, addedReport, snackbar },
});
