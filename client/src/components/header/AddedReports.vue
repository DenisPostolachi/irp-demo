<template>
  <div>
    <div
      v-click-outside="onClickOutside"
      class="flex items-center justify-between flex-col cursor-pointer"
    >
      <div
        v-if="dropdown"
        class="bg-[#393939] z-10 absolute top-[62px] w-[600px] p-0.2 overflow-y-auto max-h-[200px]"
      >
        <div
          class="shadow-md p-2 text-[#808080] flex justify-between items-center h-[50px] hover:text-[#fff]"
          v-for="item in infoReports"
          :key="item.id"
        >
          <div v-for="(value, key, index) in getFormattedKeys(item)" :key="key">
            <template v-if="index < 3">
              <p class="inline-block">{{ key }}: {{ value }}</p>
            </template>
          </div>
          <div>
            <img
              @click="removeReportItem(item)"
              alt="cross"
              src="../../assets/img/cross.svg"
            />
          </div>
        </div>
      </div>
      <div
        @click="toggleDropdown"
        class="flex items-center justify-between mr-10"
        @mouseover="hovered = true"
        @mouseleave="hovered = false"
      >
        <img
          :class="{ 'filter brightness-150': hovered }"
          class="mr-2 transition duration-300 ease-in-out"
          alt="support"
          src="../../assets/img/add.svg"
        />
        <p
          :class="{ 'text-[#808080]': !hovered, 'text-white': hovered }"
          class="mr-2 transition duration-300 ease-in-out"
        >
          Added
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
</template>

<script>
import vClickOutside from 'v-click-outside';
import { getFormattedKeys } from '@/helpers/helpers';

export default {
  computed: {
    infoReports() {
      return this.$store.getters.getInfoReports;
    },
  },
  data() {
    return {
      dropdown: false,
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
    removeReportItem(item) {
      this.$store.commit('removeReportItem', item);
    },
    getFormattedKeys(item) {
      return getFormattedKeys(item);
    },
  },
};
</script>
