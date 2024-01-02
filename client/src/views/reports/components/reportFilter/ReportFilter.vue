<template>
  <div class="filter">
    <div
      @keyup.enter="applyFiltersAndHide"
      class="filter-component block absolute top-[-100px] right-[-20px] bottom-0 bg-white drop-shadow-2xl z-[2] w-[640px] pt-[60px] pl-3 pr-3"
    >
      <h4 class="text-lg font-medium mb-10">Filters</h4>
      <report-calendar :value="filterValues.dates" @click="obgFilters" />
      <div class="wrapper">
        <div>
          <template>
            <component
              :is="reportFilterInput"
              @updateFilterValues="updateFilterValues"
            ></component
          ></template>
        </div>
        <div>
          <div class="flex justify-end">
            <button
              @click="resetFilter"
              class="bg-[#c2c2c2] hover:bg-[#9c9c9c] mr-4 p-2 rounded-2xl color-[#515151] font-bold text-xs w-[80px] uppercase"
            >
              reset
            </button>
            <button
              @click="submit"
              class="bg-[#ff8400] hover:bg-[#e67700] p-2 rounded-2xl text-white font-bold text-xs w-[80px] uppercase"
            >
              apply
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReportCalendar from '@/views/reports/components/reportFilter/ReportCalendar.vue';
import ReportFilterInput from '@/views/reports/components/reportFilter/ReportFilterInput.vue';
export default {
  components: {
    ReportCalendar,
    ReportFilterInput,
  },

  data() {
    return {
      filterValues: {
        dates: {},
      },
      selectedFilterComponent: ReportFilterInput,
    };
  },
  computed: {
    reportFilterInput() {
      return reportFilterInput;
    },
    savedFilters() {
      return this.$store.getters.reportFilters;
    },
  },
  mounted() {
    this.filterValues = { ...this.savedFilters };
  },
  methods: {
    applyFiltersAndHide() {
      this.hideFilterComponent();
      this.$store.commit('applyFilters', this.filterValues);
    },
    resetFiltersAndHide() {
      this.hideFilterComponent();
      this.$store.commit('resetFilters');
      this.filterValues = { ...this.savedFilters };
    },
    hideFilterComponent() {
      this.$emit('toHideFilter');
    },
    updateDateFilters(value) {

      this.filterValues = {
        ...this.filterValues,
        dates: { start: value.start, end: value.end },
      };
    },
    updateFilterValues(newFilterValues) {
      this.filterValues = newFilterValues;
    },
  },
};
</script>

<style scoped>
.filter {
  position: relative;
}
.filter-component {
  opacity: 0;
  animation: fadeIn 0.7s forwards;
  height: 100vh;
}
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 30vh;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
