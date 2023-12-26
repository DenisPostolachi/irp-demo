<template>
  <div>
    <p class="pl-2 mb-3">Prefix</p>
    <input
      v-model="filterValues.page"
      placeholder="Prefix"
      type="text"
      class="hoverSlow border-2 border-[#e9e9e9] border-solid rounded-2xl h-[38px] p-2 min-w-full"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterValues: {},
    };
  },
  computed: {
    savedFilters() {
      return this.$store.getters.reportFilters;
    },
  },
  mounted() {
    this.filterValues = { ...this.savedFilters };
  },
};
</script>
