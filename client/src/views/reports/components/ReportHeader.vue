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
      class="flex bg-[#e9e9e9] rounded-[36px] h-[36px] p-3 cursor-pointer items-center text-l"
    >
      Last Month
      <img class="ml-1" alt="filter" src="../../../assets/img/filter.svg" />
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    backRoute() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped></style>
