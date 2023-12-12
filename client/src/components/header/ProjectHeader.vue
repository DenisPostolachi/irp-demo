<template>
  <header
    class="bg-[#393939] shadow-md flex justify-between p-3 fixed w-full z-20 top-0 start-0"
  >
    <div>
      <img class="cursor-pointer" alt="logo" src="../../assets/img/logos.svg" />
    </div>
    <div
      class="flex justify-between"
      @mouseover="hovered = true"
      @mouseleave="hovered = false"
    >
      <div
        v-click-outside="onClickOutside"
        class="flex items-center justify-between cursor-pointer"
      >
        <div
          v-if="dropdown"
          class="bg-[#393939] z-10 absolute top-[70px] w-[150px] p-0.2"
        >
          <div
            class="shadow-md p-2 items-center"
            v-for="item in dropDownSupport"
            :key="item.id"
          >
            <p class="text-[#808080] mb-3 hover:text-[#fff]">
              {{ item.documentation }}
            </p>
            <p class="text-[#808080] mb-3 hover:text-[#fff]">
              {{ item.request }}
            </p>
            <p class="text-[#808080] mb-3 hover:text-[#fff]">{{ item.what }}</p>
            <p class="text-[#808080] hover:text-[#fff]">{{ item.about }}</p>
          </div>
        </div>
        <div
          @click="toggleDropdown"
          class="flex items-center justify-between mr-10"
        >
          <img
            :class="{ 'filter brightness-150': hovered }"
            class="mr-2 transition duration-300 ease-in-out"
            alt="support"
            src="../../assets/img/support.svg"
          />
          <p
            :class="{ 'text-[#808080]': !hovered, 'text-white': hovered }"
            class="mr-2 transition duration-300 ease-in-out"
          >
            Support
          </p>
          <img
            :class="{ 'filter brightness-150': hovered }"
            class="transition duration-300 ease-in-out"
            alt="arrow-down"
            src="../../assets/img/down-arrow.svg"
          />
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import { support } from '@/components/header/config';
import vClickOutside from 'v-click-outside';

export default {
  data() {
    return {
      dropdown: false,
      dropDownSupport: support,
      hovered: false,
    };
  },

  directives: {
    clickOutside: vClickOutside.directive,
  },

  methods: {
    onClickOutside() {
      this.dropdown = false;
    },

    toggleDropdown() {
      this.dropdown = !this.dropdown;
    },
  },
};
</script>

<style>
.hover-effect:hover img,
.hover-effect:hover p {
  filter: brightness(150%);
}

.hover-effect:hover p {
  color: #fff;
}
</style>
