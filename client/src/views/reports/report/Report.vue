<template>
  <div class="slide-in-left">
    <report-header />
    <report-info />
    <report-table :report="report" />
    <pagination-table
      @change="changePage"
      :totalPages="totalPages"
      :page="page"
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
      pageSize: 10,
      page: 1,
      totalPages: 0,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        this.report = await getReport(
          this.$route.path,
          this.page,
          this.pageSize,
        );
        this.totalPages = Math.ceil(this.report.count / this.pageSize);
      } catch (error) {
        console.error(error);
      }
    },
    changePage(page) {
      this.page = page;
      this.fetchData();
    },
    prevPage() {
      if (this.page > 1) {
        this.page--;
        this.fetchData();
      }
    },
    nextPage() {
      if (this.page < this.totalPages) {
        this.page++;
        this.fetchData();
      }
    },
  },
};
</script>

<style>
.slide-in-left {
  animation: slideInLeft 0.7s ease forwards;
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
