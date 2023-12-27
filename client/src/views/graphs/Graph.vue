<template>
  <div>
    <report-header />
    <div id="container"></div>
  </div>
</template>

<script>
import Highcharts from 'highcharts';
import { getGraph } from '@/service/graphServices/api';
import ReportHeader from '@/views/reports/components/ReportHeader.vue';
import store from '@/store';
export default {
  components: { ReportHeader },
  data() {
    return {
      chartData: [],
      chart: null,
    };
  },
  methods: {
    async fetchData() {
      try {
        const { start, end } = this.reportFilters;
        const response = await getGraph(start, end);
        this.chartData = response.data[0].map((item) => ({
          x: new Date(item.created_at).getTime(),
          y: item.volume,
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    createChart() {
      this.chart = Highcharts.chart('container', {
        chart: {
          type: 'line',
        },
        title: {
          text: 'Loss Rates',
        },
        xAxis: {
          type: 'datetime',
          title: {
            text: 'Time',
          },
        },
        yAxis: {
          title: {
            text: 'Volume',
          },
        },
        series: [
          {
            name: 'Volume',
            data: this.chartData,
          },
        ],
      });
    },
    updateChart() {
      this.chart.series[0].setData(this.chartData);
    },
  },
  created() {
    this.fetchData();
  },
  computed: {
    reportFilters() {
      return store.getters.reportFilters;
    },
  },
  watch: {
    chartData() {
      this.updateChart();
    },
    reportFilters() {
      this.fetchData();
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.createChart();
    });
  },
};
</script>

<style>
#container {
  width: 100%;
}
</style>
