<template>
  <div class="flex justify-between">
    <div class="flex justify-between w-fit items-center">
      <p class="cursor-pointer" @click="backRoute">Reports</p>
      <img
        alt="arrow"
        src="../../../assets/img/down-arrow.svg"
        class="rotate-[-90deg] w-3 mr-1 ml-1"
      />
      <p>{{ $route.name }}</p>
    </div>

    <button
      @click="toggleFilter"
      class="flex bg-[#e9e9e9] rounded-[36px] h-[36px] p-3 cursor-pointer items-center text-l"
    >
      Last Month
      <img class="ml-1" alt="filter" src="../../../assets/img/filter.svg" />
    </button>
    <report-filter v-if="showFilter" v-click-outside="onClickOutside" />
  </div>
</template>

<script>
import ReportFilter from '@/views/reports/components/reportFilter/ReportFilter.vue';
import vClickOutside from 'v-click-outside';
export default {
  components: {
    ReportFilter,
  },
  data() {
    return {
      showFilter: false,
    };
  },

  directives: {
    clickOutside: vClickOutside.directive,
  },

  methods: {
    backRoute() {
      this.$router.go(-1);
    },
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
    onClickOutside() {
      this.showFilter = false;
    },
  },
};
</script>

<style scoped></style>
