<template>
  <div>
    <div class="slide-in-from-top">
      <h2 class="mb-3">All Reports</h2>
      <div class="grid-cols-2 grid gap-5">
        <div>
          <h3 class="text-4xl">Statistics</h3>
          <div v-for="report in reports" :key="report.id">
            <router-link
              :to="{ name: 'reportItem', params: { id: report.id } }"
            >
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
                  src="../../assets/img/down-arrow.svg"
                />
              </div>
            </router-link>
          </div>
        </div>
        <div>
          <h3 class="text-4xl">Graphs</h3>
          <div
            class="flex justify-between bg-white drop-shadow-xl mb-3 mt-3 p-4 items-center h-[60px] cursor-pointer"
            v-for="graph in graphs"
            :key="graph.id"
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
              src="../../assets/img/down-arrow.svg"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reports, graphs } from '@/views/reports/config';

export default {
  data() {
    return {
      reports: reports,
      graphs: graphs,
      hovered: null,
      hoveredReport: null,
    };
  },
};
</script>

<style>
.orange-graphs path {
  fill: #ff8400;
  transition: fill 0.6s ease;
}

.orange-reports path {
  stroke: #ff8400;
  transition: stroke 0.6s ease;
}

.slide-in-from-top {
  opacity: 0;
  transform: translateY(-100px);
  animation: slideFromTop 0.5s ease forwards;
}

@keyframes slideFromTop {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
