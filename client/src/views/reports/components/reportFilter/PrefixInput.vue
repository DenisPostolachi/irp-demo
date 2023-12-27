<template>
  <div>
    <p class="pl-2 mb-3">Prefix</p>
    <input
      v-model="localFilterValues.page"
      placeholder="Prefix"
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
      localFilterValues: { ...this.filterValues },
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
