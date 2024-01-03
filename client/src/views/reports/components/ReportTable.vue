<template>
  <div class="flex flex-col shadow-2xl">
    <div class="inline-block min-w-full">
      <div class="overflow-hidden">
        <table class="min-w-full text-left text-sm font-light">
          <thead class="border-b font-medium dark:border-neutral-500">
            <tr>
              <th
                v-for="(header, key) in formattedHeaders"
                :key="key"
                scope="col"
                class="px-6 py-4"
              >
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              :class="{
                'bg-white': index % 2 !== 0,
                'bg-gray-50': index % 2 === 0,
              }"
              v-for="(data, index) in report.data"
              :key="data.id"
              class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-[#fff2e5]"
            >
              <td
                v-for="(row, index) in Object.values(data)"
                :key="row.id"
                class="whitespace-nowrap px-6 py-4 font-medium last:flex items-center"
              >
                {{ rowFormer(row, data, index) }}
                <div class="ml-2">
                  <button
                    class="block"
                    v-if="Object.values(data).length - 1 === index"
                    @click="addReport(data)"
                  >
                    <img
                      alt="eye-open"
                      src="../../../assets/img/eye-open.svg"
                    />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store';

export default {
  props: {
    report: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      clickedReportItem: [],
      addedReportItem: store.getters.getInfoReports,
    };
  },
  computed: {
    formattedHeaders() {
      return this.report.headers.map((header) => {
        return header
          .replace(/_/g, ' ')
          .replace(/\b\w/g, (firstChar) => firstChar.toUpperCase());
      });
    },
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
      return date.toLocaleDateString('en-GB', options);
    },
    addReport(data) {
      store.commit('addReportItem', data);
    },

    rowFormer(row, data, index) {
      return Object.keys(data)[index] === 'created_at'
        ? this.formatDate(row)
        : row;
    },
  },
};
</script>
