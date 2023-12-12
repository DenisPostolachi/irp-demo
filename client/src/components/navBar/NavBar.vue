<template>
  <nav
    class="fixed block z-20 top-[64px] start-0 left-0 bg-white drop-shadow-2xl min-h-screen w-16"
  >
    <div class="flex flex-col items-center">
      <router-link :to="{ name: 'dashboard' }">
        <div
          :class="{ 'bg-gray-200': isActive('dashboard') }"
          @click="setActive('dashboard')"
          @mouseover="setHovered('dashboard')"
          @mouseleave="setHovered(null)"
          class="relative cursor-pointer w-16 h-16 flex justify-center items-center transition duration-300"
        >
          <img
            class="w-7 h-7 hover:fill-cyan-700"
            alt="speedometer"
            src="../../assets/img/speedometer.svg"
          />
          <div
            v-if="isHovered('dashboard')"
            class="absolute top-[15px] left-[70px] p-2 bg-white text-black text-m rounded-none drop-shadow-xl font-medium"
          >
            Dashboard
          </div>
        </div>
      </router-link>
      <router-link :to="{ name: `reports` }">
        <div
          :class="{ 'bg-gray-200': isActive('reports') }"
          @click="setActive('reports')"
          @mouseover="setHovered('reports')"
          @mouseleave="setHovered(null)"
          class="relative cursor-pointer w-16 h-16 flex justify-center items-center transition duration-300 drop-shadow-xl font-medium"
        >
          <img
            class="w-9 h-9"
            alt="reports"
            src="../../assets/img/reports.svg"
          />
          <div
            v-if="isHovered('reports')"
            class="absolute top-[15px] left-[70px] p-2 bg-white text-black text-m rounded-none"
          >
            Reports
          </div>
        </div>
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      activeItem: null,
      hoveredItem: null,
    };
  },
  created() {
    this.activeItem = localStorage.getItem('activeItem');
  },

  methods: {
    setActive(item) {
      this.activeItem = item;
      this.hoveredItem = null;
      localStorage.setItem('activeItem', item);
    },

    isActive(item) {
      return this.activeItem === item;
    },

    setHovered(item) {
      this.hoveredItem = item;
    },

    isHovered(item) {
      return this.hoveredItem === item;
    },
  },
};
</script>
