<template>
  <div class="filter">
    <div
      @keyup.enter="
        submit();
        $emit('toHideFilter');
      "
      class="filter-component block absolute top-[-100px] right-[-20px] bottom-0 bg-white drop-shadow-2xl z-50 w-[640px] pt-[60px] pl-3 pr-3"
    >
      <h4 class="text-lg font-medium mb-10">Filters</h4>
      <report-calendar :value="filterValues.dates" @click="test" />
      <div class="wrapper">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <p class="pl-2 mb-3">AS name</p>
            <input
              v-model="filterValues.asName"
              placeholder="Any As name"
              type="text"
              class="hoverSlow border-2 border-[#e9e9e9] border-solid rounded-2xl h-[38px] p-2 min-w-full"
            />
          </div>
          <div>
            <p class="pl-2 mb-3">Page</p>
            <input
              v-model="filterValues.page"
              placeholder="Page"
              type="text"
              class="hoverSlow border-2 border-[#e9e9e9] border-solid rounded-2xl h-[38px] p-2 min-w-full"
            />
          </div>
          <div>
            <p class="pl-2 mb-3">Number of records</p>
            <input
              v-model="filterValues.pageSize"
              type="text"
              class="hoverSlow border-2 border-[#e9e9e9] border-solid rounded-2xl h-[38px] p-2 min-w-full"
            />
          </div>
        </div>
        <div class="">
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
export default {
  components: {
    ReportCalendar,
  },
  data: () => ({
    filterValues: {},
  }),
  computed: {
    savedFilters() {
      return this.$store.getters.reportFilters;
    },
  },
  mounted() {
    this.filterValues = { ...this.savedFilters };
  },
  methods: {
    submit() {
      this.$emit('toHideFilter');
      this.$store.commit('applyFilters', this.filterValues);
    },
    resetFilter() {
      this.$emit('toHideFilter');
      this.$store.commit('resetFilters');
      this.filterValues = { ...this.savedFilters };
    },
    test(value) {
      this.filterValues = {
        ...this.filterValues,
        dates: { start: value.start, end: value.end },
      };
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
  height: 40vh;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes slowHover {
  0% {
    border-color: #e9e9e9;
  }
  100% {
    border-color: #000;
  }
}
.hoverSlow:hover,
.hoverSlow:focus {
  animation: slowHover 1s linear forwards;
  outline: none;
}
</style>
