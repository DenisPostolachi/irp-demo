<template>
  <div class="grid grid-cols-2 gap-3">
    <template v-for="(filter, index) in selectedFilters">
      <div :key="index">
        <p class="pl-2 mb-3">{{ filter.name }}</p>
        <input
          type="text"
          class="hoverSlow border-2 border-[#e9e9e9] border-solid rounded-2xl h-[38px] p-2 min-w-full"
          :placeholder="filter.placeholder"
          v-model="localFilterValues[filter.key]"
        />
      </div>
    </template>
  </div>
</template>

<script>
import { filters } from '@/views/reports/components/reportFilter/config';

export default {
  props: ['filterValues'],
  data() {
    return {
      filters: { ...filters },
      localFilterValues: { ...this.filterValues, pageSize: 10, page: 1 },
    };
  },
  computed: {
    selectedFilters() {
      const currentRoute = this.$route.path;
      console.log(this.$route.path);
      if (currentRoute === '/reports/historical-record') {
        return this.filters.historicalRecords;
      } else if (currentRoute === '/reports/asnumber') {
        return this.filters.asNumber;
      } else {
        return [];
      }
    },
  },
  watch: {
    localFilterValues: {
      handler(newValues) {
        this.$emit('updateFilterValues', newValues);
      },
      deep: true,
    },
  },
};
</script>
