<template>
  <div>
    <div class="flex justify-between">
      <input
        v-model="valueStartDate"
        class="border-2 border-[#e9e9e9] border-solid rounded-2xl h-[38px] p-2 mr-3 w-1/2 cursor-not-allowed"
        readonly
      />
      <input
        v-model="valueEndDate"
        class="border-2 border-[#e9e9e9] border-solid rounded-2xl h-[38px] p-2 w-1/2 cursor-not-allowed"
        readonly
      />
    </div>
    <div class="flex justify-center items-center mt-8 mb-8 w-[648px]">
      <div class="w-[50%] h-[284px]">
        <div class="flex items-center mb-4">
          <button
            class="mr-4 hover:bg-[#e9e9e9] p-1 rounded-lg"
            @click="updateCalendar(-1)"
          >
            <img
              class="rotate-[90deg] w-[15px] h-[15px]"
              alt="arrow"
              src="../../../../assets/img/down-arrow.svg"
            />
          </button>
          <h2 class="text-center text-lg text-[#808080] font-bold">
            {{ allMonthList[startMonthDate.getMonth()] }}
            {{ startMonthDate.getFullYear() }}
          </h2>
        </div>
        <div class="flex flex-wrap">
          <div
            v-for="(week, wIndex) in startMonthAry"
            :key="wIndex"
            class="week"
          >
            <div
              v-for="(startDay, dIndex) in week"
              :key="dIndex"
              class="day"
              :class="dayStatus(startDay)"
              @click="dayOnClick(startDay)"
            >
              <span class="day-cell" v-if="startDay">
                {{ startDay.getDate() }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="w-[50%] h-[284px]">
        <div class="flex items-center justify-end mb-4 pr-12">
          <h2 class="text-center text-lg text-[#808080] font-bold">
            {{ allMonthList[endMonthDate.getMonth()] }}
            {{ endMonthDate.getFullYear() }}
          </h2>
          <button
            class="ml-4 hover:bg-[#e9e9e9] p-1 rounded-lg"
            @click="updateCalendar(1)"
            :class="disabledPreviousArrow(endMonthDate)"
          >
            <img
              class="rotate-[-90deg] w-[15px] h-[15px]"
              alt="arrow"
              src="../../../../assets/img/down-arrow.svg"
            />
          </button>
        </div>
        <div class="flex flex-wrap">
          <div v-for="(week, wIndex) in endMonthAry" :key="wIndex" class="week">
            <div
              v-for="(endDay, dIndex) in week"
              :key="dIndex"
              :class="dayStatus(endDay)"
              class="day"
              @click="dayOnClick(endDay)"
            >
              <span class="day-cell" v-if="endDay">
                {{ endDay.getDate() }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { monthList } from '@/views/reports/components/reportFilter/config';

export default {
  props: {
    format: {
      type: String,
      default: 'YYYY/MM/DD',
    },
    minDate: {
      type: [String, Date],
      default: () =>
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          0,
          0,
          0,
        ),
    },
    value: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      valueStartDate: null,
      valueEndDate: null,
      startMonthDate: null,
      endMonthDate: null,
      selectMinDate: null,
      startMonthAry: [],
      endMonthAry: [],
      clickCount: 0,
      allMonthList: monthList,
    };
  },
  created() {
    if (this.minDate) {
      const minDateValue =
        typeof this.minDate === 'string'
          ? this.minDate
          : this.minDate.getTime();
      this.selectMinDate = new Date(minDateValue);
    }

    this.updateCalendar();
  },
  watch: {
    value: {
      immediate: true,
      handler(dates) {
        if (!dates) return;
        this.valueStartDate = dates.start;
        this.valueEndDate = dates.start;
        if (this.valueEndDate === dates.start) {
          this.valueEndDate = dates.end;
        }
      },
    },
  },
  methods: {
    generateCalendar(
      calculateYear = new Date().getFullYear(),
      calculateMonth = new Date().getMonth(),
      config = {
        showPreviousMonthDate: false,
        showNextMonthDate: false,
      },
    ) {
      const showPreviousMonthDate = config.showPreviousMonthDate || false;
      const showNextMonthDate = config.showNextMonthDate || false;
      const baseDateTime = new Date(calculateYear, calculateMonth, 1, 0, 0, 0);
      let countTime = new Date(calculateYear, calculateMonth, 1, 0, 0, 0);
      let tempMonthAry = [];
      let tempWeekAry = [];
      let nextMonth = false;
      let completed = false;
      while (!nextMonth || (nextMonth && !completed)) {
        let day = countTime.getDay();
        let date = countTime.getDate();
        let month = countTime.getMonth();
        if (month !== calculateMonth) {
          nextMonth = true;
          if (day === 6 || (date === 1 && day === 0)) {
            completed = true;
          }
        }
        if (!nextMonth) {
          tempWeekAry[day] = new Date(countTime.getTime());
        } else {
          tempWeekAry[day] = showNextMonthDate
            ? new Date(countTime.getTime())
            : false;
        }
        if (countTime.getTime() === baseDateTime.getTime() && day !== 0) {
          let previousDay = day;
          let previousCountTime = new Date(countTime.getTime());
          previousCountTime.setDate(previousCountTime.getDate());
          if (showPreviousMonthDate) {
            while (previousDay !== 0) {
              let previousDateTime = new Date(previousCountTime.getTime());
              previousDay = previousDateTime.getDay();
              tempWeekAry[previousDay] = previousDateTime;
              previousCountTime.setDate(previousCountTime.getDate() - 1);
            }
          }
        }
        if (
          (countTime.getTime() === baseDateTime.getTime() &&
            tempWeekAry.length === 7) ||
          (countTime.getTime() > baseDateTime && day === 6)
        ) {
          tempMonthAry.push(tempWeekAry);
          tempWeekAry = [];
        }
        countTime.setDate(countTime.getDate() + 1);
      }
      return tempMonthAry;
    },
    updateCalendar(offset = -1) {
      if (!this.startMonthDate) {
        this.startMonthDate = this.valueStartDate
          ? new Date(this.valueStartDate.getTime())
          : new Date(new Date().getFullYear(), new Date().getMonth());
      }
      this.startMonthDate.setMonth(this.startMonthDate.getMonth() + offset);
      this.endMonthDate = new Date(
        this.startMonthDate.getFullYear(),
        this.startMonthDate.getMonth() + 1,
      );
      this.startMonthAry = this.generateCalendar(
        this.startMonthDate.getFullYear(),
        this.startMonthDate.getMonth(),
      );
      this.endMonthAry = this.generateCalendar(
        this.endMonthDate.getFullYear(),
        this.endMonthDate.getMonth(),
      );
    },
    updateValue() {
      this.valueStartDate = `${this.valueStartDate}`;
      this.valueEndDate = `${this.valueEndDate}`;
    },
    disabledPreviousArrow(monthDatetime) {
      const now = new Date();
      const today = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0,
      );
      const selectForward = true;
      if (monthDatetime && selectForward) {
        if (
          monthDatetime.getFullYear() === today.getFullYear() &&
          monthDatetime.getMonth() === today.getMonth()
        ) {
          return 'disabled';
        }
      }
    },
    dayStatus(datetime) {
      const classList = [];
      const disabledDates = [];
      if (datetime) {
        if (this.selectMinDate.getTime() < datetime.getTime()) {
          classList.push('disabled');
        } else if (disabledDates.indexOf(datetime) > -1) {
          classList.push('disabled');
        } else if (
          this.valueStartDate &&
          this.valueStartDate.getTime() === datetime.getTime()
        ) {
          classList.push('start-date');
        } else if (
          this.valueEndDate &&
          this.valueEndDate.getTime() === datetime.getTime()
        ) {
          classList.push('end-date');
        } else if (
          this.valueStartDate &&
          this.valueEndDate &&
          datetime.getTime() > this.valueStartDate.getTime() &&
          datetime.getTime() < this.valueEndDate.getTime()
        ) {
          classList.push('in-date-range');
        }
      }
      return classList;
    },
    dayOnClick(datetime) {
      if (datetime) {
        if (!this.valueStartDate) {
          this.valueStartDate = datetime;
        } else if (!this.valueEndDate) {
          if (
            this.valueStartDate &&
            datetime.getTime() < this.valueStartDate.getTime()
          ) {
            this.valueEndDate = this.valueStartDate;

            this.valueStartDate = datetime;
          } else {
            this.valueEndDate = datetime;
          }
        } else if (datetime.getTime() < this.valueStartDate.getTime()) {
          this.valueStartDate = datetime;
        } else if (datetime.getTime() > this.valueEndDate.getTime()) {
          this.valueEndDate = datetime;
        } else if (
          datetime.getTime() > this.valueStartDate.getTime() &&
          datetime.getTime() < this.valueEndDate.getTime()
        ) {
          if (this.clickCount % 2 === 0) {
            this.valueStartDate = datetime;
          } else {
            this.valueEndDate = datetime;
          }

          this.clickCount++;
        }
        const dateResult = {
          start: this.valueStartDate,
          end: this.valueEndDate,
        };
        this.$emit('click', dateResult);
        if (this.valueStartDate && this.valueEndDate) {
          this.updateValue();
        }
      }
    },
  },
};
</script>

<style scoped>
.day-cell:hover {
  background-color: #e9e9e9;
  width: 40px;
  height: 40px;
}
.week {
  display: block;
  width: 100%;
  height: 40px;
}
.day {
  float: left;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: 16px;
  font-weight: 500;
  line-height: 40px;
  color: #505050;
  background-color: transparent;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.start-date {
  background-color: #ff8400;
  color: white;
}

.end-date {
  background-color: #ff8400;
  color: white;
}

.in-date-range {
  background-color: #ffa50026;
}
.disabled {
  color: #ececec;
  pointer-events: none;
}
</style>
