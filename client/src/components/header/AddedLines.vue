<template>
  <div>
    <div
      v-click-outside="onClickOutside"
      class="flex items-center justify-between flex-col cursor-pointer"
    >
      <div
        v-if="dropdown"
        class="bg-[#393939] z-10 absolute top-[62px] w-[250px] p-0.2 overflow-y-auto max-h-[200px]"
      >
        <div
          class="shadow-md p-2 items-center flex text-[#808080] hover:text-[#fff]"
          v-for="item in this.$store.state.addedReport.infoReports"
          :key="item.id"
        >
          <p class="mr-1">Id: {{ item.id }}</p>
          <p>As name: {{ item.as_name }}</p>
          <p class="ml-1">Asn: {{ item.asn }}</p>
          <img
            @click="removeReportItem(item)"
            alt="cross"
            src="../../assets/img/cross.svg"
          />
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
import addedReport from '@/store/modules/addedReports';

export default {
  computed: {
    addedReport() {
      return addedReport;
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
  },
};
</script>
