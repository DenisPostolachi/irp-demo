<template>
  <div
    v-if="snackbar.show"
    :style="{ borderColor: snackbar.color }"
    class="slide-in-left bg-white drop-shadow-2xl border-solid rounded-lg w-[270px] h-[120px] p-1 z-[150] fixed bottom-[10px] left-[80px]"
  >
    <div class="flex justify-end items-start">
      <img
        @click="closeSnackbar"
        class="h-[20px] cursor-pointer hover:bg-[#e9e9e9] rounded-xl"
        alt="cross"
        src="@/assets/img/cross.svg"
      />
    </div>
    <div class="flex justify-center items-center">
      <p class="text-lg font-medium">
        {{ snackbar.message }}
      </p>
    </div>
  </div>
</template>

<script>
import store from '@/store';

export default {
  computed: {
    snackbar() {
      return store.getters.getSnackbarData;
    },
  },
  methods: {
    closeSnackbar() {
      store.commit('hideSnackbar');
    },
  },
};
</script>

<style scoped>
.slide-in-left {
  animation: slideInLeft 0.7s ease forwards;
}

@keyframes slideInLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
