<template>
  <div>
    <!--    {{ this.value }}-->
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
            {{ monthList[startMonthDate.getMonth()] }}
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
            {{ monthList[endMonthDate.getMonth()] }}
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

    monthList: {
      type: Array,
      default: () => [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    },
  },
  data() {
    let currentDate = new Date();
    let yesterdayDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);

    return {
      valueStartDate: new Date().toUTCString(),
      valueEndDate: yesterdayDate.toUTCString(),
      active: false,
      startMonthDate: null,
      endMonthDate: null,
      selectStartDate: null,
      selectEndDate: null,
      selectMinDate: null,
      selectMaxDate: null,
      startMonthAry: [],
      endMonthAry: [],
      clickCount: 0,
      hoveredDay: null,
      selectForward: true,
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

  computed: {},
  watch: {
    // value: {
    // immediate: true,
    // handler(dates) {
    // if (!dates) return;
    // this.valueStartDate = dates.start;
    // this.valueEndDate = dates.end;
    // },
    // },
  },

  methods: {
    // reset() {
    //   this.selectStartDate = null;
    //   this.selectEndDate = null;
    //   this.valueStartDate = '';
    //   this.valueEndDate = '';
    //   this.$emit('reset');
    // },
    displayDateText(datetime) {
      if (datetime) {
        datetime = typeof datetime === 'string' ? new Date(datetime) : datetime;

        const yyyy = datetime.getFullYear();
        const mm =
          datetime.getMonth() + 1 > 9
            ? datetime.getMonth() + 1
            : `0${datetime.getMonth() + 1}`;
        const dd =
          datetime.getDate() > 9
            ? datetime.getDate()
            : `0${datetime.getDate()}`;
        return (this.format || 'YYYY/MM/DD')
          .replace('YYYY', yyyy)
          .replace('MM', mm)
          .replace('DD', dd);
      }
    },
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
        // check next month
        if (month !== calculateMonth) {
          nextMonth = true;
          if (day === 6 || (date === 1 && day === 0)) {
            completed = true;
          }
        }
        // Set date
        if (!nextMonth) {
          tempWeekAry[day] = new Date(countTime.getTime()); // date obj
        } else {
          tempWeekAry[day] = showNextMonthDate
            ? new Date(countTime.getTime())
            : false;
        }
        // check previous
        if (countTime.getTime() === baseDateTime.getTime() && day !== 0) {
          // Fill previous
          let previousDay = day;
          let previousCountTime = new Date(countTime.getTime());
          previousCountTime.setDate(previousCountTime.getDate());
          if (showPreviousMonthDate) {
            while (previousDay !== 0) {
              let previousDateTime = new Date(previousCountTime.getTime());
              previousDay = previousDateTime.getDay();
              tempWeekAry[previousDay] = previousDateTime; // date obj
              previousCountTime.setDate(previousCountTime.getDate() - 1);
            }
          }
        }
        // check new week
        if (
          (countTime.getTime() === baseDateTime.getTime() &&
            tempWeekAry.length === 7) ||
          (countTime.getTime() > baseDateTime && day === 6)
        ) {
          // Next week
          tempMonthAry.push(tempWeekAry);
          tempWeekAry = [];
        }
        // calculate next day
        countTime.setDate(countTime.getDate() + 1);
      }

      return tempMonthAry;
    },
    updateCalendar(offset = -1) {
      if (!this.startMonthDate) {
        this.startMonthDate = this.selectStartDate
          ? new Date(this.selectStartDate.getTime())
          : new Date(new Date().getFullYear(), new Date().getMonth()); // now
      }

      this.startMonthDate.setMonth(this.startMonthDate.getMonth() + offset);
      this.endMonthDate = new Date(
        this.startMonthDate.getFullYear(),
        this.startMonthDate.getMonth() + 1,
      );

      this.startMonthAry = [];
      this.endMonthAry = [];
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
      this.valueStartDate = `${this.displayDateText(this.selectStartDate)}`;
      this.valueEndDate = `${this.displayDateText(this.selectEndDate)}`;
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
      if (monthDatetime && this.selectForward) {
        if (this.selectMaxDate) {
          if (monthDatetime.getFullYear() < this.selectMaxDate.getFullYear()) {
            return 'disabled';
          }
          if (
            monthDatetime.getFullYear() === this.selectMaxDate.getFullYear() &&
            monthDatetime.getMonth() <= this.selectMaxDate.getMonth()
          ) {
            return 'disabled';
          }
        } else {
          if (
            monthDatetime.getFullYear() === today.getFullYear() &&
            monthDatetime.getMonth() === today.getMonth()
          ) {
            return 'disabled';
          }
        }
      }
    },
    dayStatus(datetime) {
      const classList = [];
      const disabledDates = [];
      if (datetime) {
        // check status
        if (this.selectMinDate.getTime() < datetime.getTime()) {
          classList.push('disabled');
        } else if (
          this.selectMaxDate &&
          this.selectMaxDate.getTime() < datetime.getTime()
        ) {
          classList.push('disabled');
        } else if (disabledDates.indexOf(this.displayDateText(datetime)) > -1) {
          classList.push('disabled');
        } else if (
          this.selectStartDate &&
          this.selectStartDate.getTime() === datetime.getTime()
        ) {
          classList.push('start-date');
        } else if (
          this.selectEndDate &&
          this.selectEndDate.getTime() === datetime.getTime()
        ) {
          classList.push('end-date');
        } else if (
          this.selectStartDate &&
          this.selectEndDate &&
          datetime.getTime() > this.selectStartDate.getTime() &&
          datetime.getTime() < this.selectEndDate.getTime()
        ) {
          classList.push('in-date-range');
        }
      }
      return classList;
    },
    dayOnClick(datetime) {
      if (datetime) {
        if (!this.selectStartDate) {
          this.selectStartDate = datetime;
        } else if (!this.selectEndDate) {
          if (
            this.selectStartDate &&
            datetime.getTime() < this.selectStartDate.getTime()
          ) {
            this.selectEndDate = this.selectStartDate;

            this.selectStartDate = datetime;
          } else {
            this.selectEndDate = datetime;
          }
        } else if (datetime.getTime() < this.selectStartDate.getTime()) {
          this.selectStartDate = datetime;
        } else if (datetime.getTime() > this.selectEndDate.getTime()) {
          this.selectEndDate = datetime;
        } else if (
          datetime.getTime() > this.selectStartDate.getTime() &&
          datetime.getTime() < this.selectEndDate.getTime()
        ) {
          if (this.clickCount % 2 === 0) {
            this.selectStartDate = datetime;
          } else {
            this.selectEndDate = datetime;
          }

          this.clickCount++;
        }

        let maxNight = null;
        if (this.selectStartDate && this.selectEndDate && maxNight) {
          const limitDate =
            this.selectStartDate.getTime() + maxNight * 1000 * 60 * 60 * 24;
          if (this.selectEndDate.getTime() > limitDate) {
            this.selectEndDate = new Date(limitDate);
          }
        }
        let minNight = null;
        if (this.selectStartDate && this.selectEndDate && minNight) {
          const limitDate =
            this.selectStartDate.getTime() + minNight * 1000 * 60 * 60 * 24;
          if (this.selectEndDate.getTime() < limitDate) {
            this.selectEndDate = new Date(limitDate);
          }
        }
        const dateResult = {
          start: this.displayDateText(this.selectStartDate),
          end: this.displayDateText(this.selectEndDate),
        };

        this.$emit('click', dateResult);

        if (this.selectStartDate && this.selectEndDate) {
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
