<template>
  <div
    class="flex justify-between bg-white drop-shadow-xl mb-3 mt-3 p-4 items-center h-[60px] cursor-pointer"
    @mouseover="hoveredReport = report.id"
    @mouseleave="hoveredReport = null"
  >
    <div class="flex items-center">
      <svg
        width="30px"
        height="30px"
        viewBox="0 0 24 24"
        fill="#ff8400"
        xmlns="http://www.w3.org/2000/svg"
        :class="{ 'orange-reports': hoveredReport === report.id }"
      >
        <path
          d="M20 7L4 7"
          stroke="#000"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <path
          d="M15 12L4 12"
          stroke="#000"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <path
          d="M9 17H4"
          stroke="#000"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
      <p class="">{{ report.name }}</p>
    </div>
    <img
      class="rotate-[-90deg]"
      alt="arrow"
      src="../../../assets/img/down-arrow.svg"
    />
  </div>
</template>

<script>
export default {
  props: ['report'],
  data() {
    return { hovered: null, hoveredReport: null };
  },
};
</script>

<style scoped>
.orange-graphs path {
  fill: #ff8400;
  transition: fill 0.6s ease;
}

.orange-reports path {
  stroke: #ff8400;
  transition: stroke 0.6s ease;
}
</style>
