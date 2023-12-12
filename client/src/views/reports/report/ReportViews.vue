<template>
  <div>
    <div class="items-center">
      <div class="flex justify-between items-center">
        <p>#</p>
        <p>Time</p>
        <p>ASN</p>
        <p>AS Name</p>
        <p>Volume</p>
        <p>Improvements</p>
      </div>
      <div
        class="flex justify-between items-center"
        v-for="report in reportsData"
        :key="report.id"
      >
        <p>{{ report.id }}</p>
        <p>{{ report.time }}</p>
        <p>{{ report.asn }}</p>
        <p>{{ report.asName }}</p>
        <p>{{ report.volume }}</p>
        <p>{{ report.time }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { reportsData } from '@/views/reports/report/config';

export default {
  data() {
    return {
      reportsData: reportsData,
    };
  },
};
</script>
