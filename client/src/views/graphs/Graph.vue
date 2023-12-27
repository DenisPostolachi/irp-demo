<template>
  <div id="container"></div>
</template>

<script>
import Highcharts from 'highcharts';

import { getGraph } from '@/service/graphServices/api'; // Замените на правильный путь к файлу api.js

export default {
  data() {
    return {
      chartData: [],
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await getGraph();
        // Преобразовываем данные в нужный формат
        this.chartData = response.data[0].map((item) => ({
          id: item.id,
          x: new Date(item.created_at).getTime(),
          y: item.volume,
          created_at: item.created_at,
          volume: item.volume,
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    createChart() {
      Highcharts.chart('container', {
        chart: {
          type: 'line',
        },
        title: {
          text: 'Graph Data',
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
            name: 'Graph',
            data: this.chartData,
          },
        ],
      });
    },
  },
  created() {
    this.fetchData().then(() => {
      this.$nextTick(() => {
        this.createChart();
      });
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
