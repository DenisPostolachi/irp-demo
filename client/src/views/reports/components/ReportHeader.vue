<template>
  <div>
    <div class="flex justify-between">
      <div class="flex justify-between w-fit z-200 items-center">
        <p class="cursor-pointer" @click="backRoute">Reports</p>
        <img
          alt="arrow"
          src="../../../assets/img/down-arrow.svg"
          class="rotate-[-90deg] w-3 mr-1 ml-1"
        />
        <p>{{ $route.name }}</p>
      </div>
      <div>
        <button
          @click.prevent="toggleFilter"
          class="flex bg-[#e9e9e9] rounded-[36px] h-[36px] p-3 cursor-pointer items-center text-l"
        >
          Filters
          <img class="ml-1" alt="filter" src="../../../assets/img/filter.svg" />
        </button>
      </div>
    </div>
    <div>
      <report-filter
        @toHideFilter="toggleFilter"
        v-if="showFilter"
        v-click-outside="onClickOutside"
      />
    </div>
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

  watch: {
    showFilter(value) {
      if (value) {
        document.documentElement.style.overflow = 'hidden';
      } else {
        document.documentElement.style.overflow = 'auto';
      }
    },
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
