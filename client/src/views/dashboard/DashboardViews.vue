<template>
  <div class="slide-in-from-top">
    <h1 class="text-3xl text-center">Welcome to Noction!</h1>
    <div class="flex justify-center mt-10">
      <img
        class="cursor-pointer w-80 h-30"
        alt="logo"
        src="../../assets/img/logos.svg"
      />
    </div>
  </div>
</template>

<style>
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
