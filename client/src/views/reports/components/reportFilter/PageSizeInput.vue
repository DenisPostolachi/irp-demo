<template>
  <div>
    <p class="pl-2 mb-3">Number of records</p>
    <input
      v-model="localFilterValues.pageSize"
      type="text"
      class="hoverSlow border-2 border-[#e9e9e9] border-solid rounded-2xl h-[38px] p-2 min-w-full"
    />
  </div>
</template>

<script>
export default {
  props: ['filterValues'],
  data() {
    return {
      localFilterValues: { ...this.filterValues, pageSize: 10 },
    };
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
