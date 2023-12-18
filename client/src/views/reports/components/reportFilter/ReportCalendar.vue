<template>
  <div class="flex justify-center items-center mt-8 mb-8">
    <div class="mr-8">
      <div class="flex items-center mb-4">
        <button
          class="mr-4 hover:bg-[#e9e9e9] p-1 rounded-lg"
          @click="navigate('prev')"
        >
          <img
            class="rotate-[90deg] w-[15px] h-[15px]"
            alt="arrow"
            src="../../../../assets/img/down-arrow.svg"
          />
        </button>
        <h2 class="text-center text-lg text-[#808080] font-bold">
          {{ formattedPrevMonth }}
        </h2>
      </div>
      <div class="flex flex-wrap">
        <div
          v-for="(day, index) in prevMonthDays"
          :key="index"
          class="w-6 h-6 flex items-center justify-center m-1 hover:bg-[#e9e9e9] rounded-xl cursor-pointer"
        >
          {{ day }}
        </div>
      </div>
    </div>
    <div>
      <div class="flex items-center justify-end mb-4">
        <h2 class="text-center text-lg text-[#808080] font-bold">
          {{ formattedCurrentMonth }}
        </h2>
        <button
          class="ml-4 hover:bg-[#e9e9e9] p-1 rounded-lg"
          @click="navigate('next')"
        >
          <img
            class="rotate-[-90deg] w-[15px] h-[15px]"
            alt="arrow"
            src="../../../../assets/img/down-arrow.svg"
          />
        </button>
      </div>
      <div class="flex flex-wrap">
        <div
          v-for="(day, index) in currentMonthDays"
          :key="index"
          class="w-6 h-6 flex items-center justify-center m-1 hover:bg-[#e9e9e9] rounded-xl cursor-pointer"
        >
          {{ day }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date(),
    };
  },
  computed: {
    formattedPrevMonth() {
      const prevMonth = this.getPreviousMonth(this.currentDate);
      return this.formatMonth(prevMonth);
    },
    formattedCurrentMonth() {
      return this.formatMonth(this.currentDate);
    },
    prevMonthDays() {
      const prevMonth = this.getPreviousMonth(this.currentDate);
      return this.getDaysArray(prevMonth);
    },
    currentMonthDays() {
      return this.getDaysArray(this.currentDate);
    },
  },
  methods: {
    getPreviousMonth(date) {
      const prevMonth = new Date(date);
      prevMonth.setMonth(date.getMonth() - 1);
      return prevMonth;
    },
    formatMonth(date) {
      const options = { year: 'numeric', month: 'long' };
      return date.toLocaleDateString('en-US', options);
    },
    getDaysArray(date) {
      const daysInMonth = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0,
      ).getDate();
      return Array.from({ length: daysInMonth }, (_, i) => i + 1);
    },
    navigate(direction) {
      const modifier = direction === 'prev' ? -1 : 1;
      const newDate = new Date(this.currentDate);
      newDate.setMonth(newDate.getMonth() + modifier);
      this.currentDate = newDate;
    },
  },
};
</script>
