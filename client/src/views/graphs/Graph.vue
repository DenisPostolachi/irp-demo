<template>
  <div>
    <div class="flex justify-between w-fit z-200 items-center">
      <p class="cursor-pointer" @click="backRoute">Reports</p>
      <img
        alt="arrow"
        src="@/assets/img/down-arrow.svg"
        class="rotate-[-90deg] w-3 mr-1 ml-1"
      />
      <p>{{ $route.name }}</p>
    </div>
    <div id="container"></div>
  </div>
</template>

<script>
import Highcharts from 'highcharts';
import { getGraph } from '@/service/graphServices/api';

export default {
  data() {
    return {
      chartData: [],
      chart: null,
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await getGraph();
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
    backRoute() {
      this.$router.go(-1);
    },
  },
  created() {
    this.fetchData();
  },
  watch: {
    chartData() {
      this.updateChart();
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
  height: 400px;
}
</style>
