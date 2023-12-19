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
          class="day-cell"
          @click="selectPrevDay(day)"
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
          :disabled="!!isCurrentMonth()"
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
          :class="[
            'day-cell',
            { 'text-gray-400 cursor-not-allowed': isDisabled(day) },
          ]"
          @click="selectCurrentDay(day)"
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
    isDisabled(day) {
      const today = new Date();
      return (
        this.currentDate.getMonth() === today.getMonth() &&
        day > today.getDate()
      );
    },
    selectPrevDay(day) {
      this.handlePrevDaySelection(day);
    },
    selectCurrentDay(day) {
      if (!this.isDisabled(day)) {
        this.handleCurrentDaySelection(day);
      }
    },
    handlePrevDaySelection(day) {
      if (!this.startDatePrevMonth) {
        this.startDatePrevMonth = day;
        this.endDatePrevMonth = null;
      } else if (!this.endDatePrevMonth) {
        if (day > this.startDatePrevMonth) {
          this.endDatePrevMonth = day;
          console.log(
            `Selected range 1 : ${this.startDatePrevMonth} to ${this.endDatePrevMonth}`,
          );
        } else {
          this.endDatePrevMonth = this.startDatePrevMonth;
          this.startDatePrevMonth = day;
          console.log(
            `Selected range 2: ${this.startDatePrevMonth} to ${this.endDatePrevMonth}`,
          );
        }
      } else {
        this.startDatePrevMonth = day;
        console.log(
          `Selected range 3: ${this.startDatePrevMonth} to ${this.endDatePrevMonth}`,
        );
      }
    },
    handleCurrentDaySelection(day) {
      if (!this.startDateCurrMonth) {
        this.startDateCurrMonth = day;
        this.endDateCurrMonth = null;
      } else if (!this.endDateCurrMonth) {
        if (day > this.startDateCurrMonth) {
          this.selectedEndDate = day;
          console.log(
            `Selected range 1 : ${this.startDateCurrMonth} to ${this.selectedEndDate}`,
          );
        } else {
          this.selectedEndDate = this.startDateCurrMonth;
          this.startDateCurrMonth = day;
          console.log(
            `Selected range 2: ${this.startDateCurrMonth} to ${this.selectedEndDate}`,
          );
        }
      } else {
        this.startDateCurrMonth = day;
        console.log(
          `Selected range 3: ${this.startDateCurrMonth} to ${this.selectedEndDate}`,
        );
      }
    },
    isCurrentMonth() {
      const today = new Date();
      return (
        this.currentDate.getMonth() === today.getMonth() &&
        this.currentDate.getFullYear() === today.getFullYear()
      );
    },
  },
};
</script>

<style scoped>
.day-cell {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4px;
  cursor: pointer;
  border-radius: 12px;
}
.day-cell:hover {
  background-color: #e9e9e9;
}
</style>
