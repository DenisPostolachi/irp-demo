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
      totalPages: 0,
    };
  },
  computed: {
    reportFilters() {
      return store.getters.reportFilters;
    },
  },
  async created() {
    await this.fetchData();
  },
  watch: {
    reportFilters: 'fetchData',
  },
  methods: {
    async fetchData() {
      try {
        const response = await getReport(this.$route.path, this.reportFilters);
        this.report = response;
        this.totalPages = response.lastPage;
      } catch (error) {
        console.error(error);
      }
    },
    changePage(value) {
      store.commit('applyFilters', { page: value });
    },
    prevPage() {
      if (this.reportFilters.page > 1) {
        store.commit('applyFilters', { page: this.reportFilters.page - 1 });
      }
    },
    nextPage() {
      if (this.reportFilters.page < this.totalPages) {
        store.commit('applyFilters', { page: this.reportFilters.page + 1 });
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
