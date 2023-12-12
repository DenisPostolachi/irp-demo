<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ReportTable',
  props: {
    report: {
      type: Object,
      required: true,
    },
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
  },
});
</script>

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
                class="whitespace-nowrap px-6 py-4 font-medium"
              >
                {{
                  Object.keys(data)[index] === 'created_at'
                    ? formatDate(row)
                    : row
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
