import Vue from 'vue';
import Vuex from 'vuex';
import filter from './modules/filter';
import addedReport from '@/store/modules/addedReports';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { filter, addedReport },
});
