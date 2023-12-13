<template>
  <div>
    <div class="slide-in-from-top">
      <h2 class="mb-3">All Reports</h2>
      <div class="grid-cols-2 grid gap-5">
        <div>
          <h3 class="text-4xl">Statistics</h3>
          <div v-for="report in reports" :key="report.id">
            <router-link :to="{ path: report.slug, params: { id: report.id } }">
              <reports-statistics :report="report" />
            </router-link>
          </div>
        </div>
        <div>
          <h3 class="text-4xl">Graphs</h3>
          <div v-for="graph in graphs" :key="graph.id">
            <reports-graphs :graph="graph" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reports, graphs } from '@/views/reports/config/config';
import ReportsStatistics from '@/views/reports/components/ReportsStatistics.vue';
import ReportsGraphs from '@/views/reports/components/ReportsGraphs.vue';

export default {
  components: {
    ReportsStatistics,
    ReportsGraphs,
  },
  data() {
    return {
      reports: reports,
      graphs: graphs,
    };
  },
};
</script>

<style scoped>
.slide-in-from-top {
  opacity: 0;
  transform: translateY(-100px);
  animation: slideFromTop 0.5s ease forwards;
}

@keyframes slideFromTop {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
