<template>
  <header
    class="bg-[#393939] shadow-md flex justify-between p-3 fixed w-full z-20 top-0 start-0"
  >
    <div>
      <img class="cursor-pointer" alt="logo" src="../../assets/img/logos.svg" />
    </div>
    <div class="flex justify-between items-center">
      <added-reports class="mr-20" />
      <drop-down-menu />
    </div>
  </header>
</template>
<script>
import dropDownMenu from '@/components/header/DropDownMenu.vue';
import addedReports from '@/components/header/AddedReports.vue';

export default {
  components: {
    dropDownMenu,
    addedReports,
  },
};
</script>
