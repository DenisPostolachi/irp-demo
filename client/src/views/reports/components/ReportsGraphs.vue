<template>
  <div
    class="flex justify-between bg-white drop-shadow-xl mb-3 mt-3 p-4 items-center h-[60px] cursor-pointer"
    @mouseover="hovered = graph.id"
    @mouseleave="hovered = null"
  >
    <div class="flex items-center">
      <svg
        width="40px"
        height="40px"
        viewBox="0 0 76 76"
        xmlns="http://www.w3.org/2000/svg"
        xml:space="preserve"
        :class="{ 'orange-graphs': hovered === graph.id }"
        class="mr-2"
      >
        <path
          fill="#000000"
          fill-opacity="1"
          stroke-width="0.2"
          stroke-linejoin="round"
          d="M 17,19L 20,19L 20,54L 59,54L 59,57L 17,57L 17,19 Z M 22,52L 22,47.25L 32,37L 45,43.75L 57,25L 59,27L 46,48L 32.25,41L 22,52 Z "
        />
      </svg>
      <p>{{ graph.name }}</p>
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
  props: ['graph'],
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
