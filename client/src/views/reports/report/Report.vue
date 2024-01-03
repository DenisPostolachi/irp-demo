<template>
  <div class="slide-in-left">
    <report-header />
    <report-info />
    <report-table :report="report" />
    <pagination-table
      @change="changePage"
      :totalPages="totalPages"
      :page="reportFilters.page"
      @prevPage="prevPage"
      @nextPage="nextPage"
    />
  </div>
</template>

<script>
import { getReport } from '@/service/reportServices/api';
import PaginationTable from '@/components/pagination/PaginationTable.vue';
import ReportHeader from '@/views/reports/components/ReportHeader.vue';
import ReportTable from '@/views/reports/components/ReportTable.vue';
import ReportInfo from '@/views/reports/components/ReportInfo.vue';
import store from '@/store';
export default {
  name: 'ReportView',
  components: {
    PaginationTable,
    ReportHeader,
    ReportTable,
    ReportInfo,
  },
  data() {
    return {
      report: { headers: [] },
      pagePaginator: 1,
      totalPages: 0,
    };
  },
  computed: {
    reportFilters() {
      return store.getters.reportFilters;
    },
  },
  created() {
    this.fetchData();
  },
  watch: {
    reportFilters() {
      this.fetchData();
    },
  },
  methods: {
    async fetchData() {
      try {
        this.report = await getReport(this.$route.path, this.reportFilters);
        this.totalPages = this.report.lastPage;
      } catch (error) {
        this.showMessage();
        console.error(error);
      }
    },
    showMessage() {
      this.$store.commit('showSnackbar', {
        message: 'Data is not defined',
        color: '#ff0033',
        duration: 3000,
      });
    },
    changePage(value) {
      store.commit('applyFilters', { page: value });
    },
    prevPage() {
      if (store.state.filters.page > 1) {
        store.state.filters.page--;
        this.fetchData();
      }
    },
    nextPage() {
      if (store.state.filters.page < this.totalPages) {
        store.state.filters.page++;
        this.fetchData();
      }
    },
  },
};
</script>

<style scoped>
.slide-in-left {
  animation: slideInLeft 0.7s ease forwards;
  position: relative;
}

@keyframes slideInLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
