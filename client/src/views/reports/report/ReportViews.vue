<template>
  <div>
    <div class="flex justify-between">
      <div class="flex justify-between w-fit items-center">
        <p class="cursor-pointer" @click="backRoute">Reports</p>
        <img
          alt="arrow"
          src="../../../assets/img/down-arrow.svg"
          class="rotate-[-90deg] w-3 mr-1 ml-1"
        />
        <p>ASN Statistics</p>
      </div>
      <button
        class="flex bg-[#e9e9e9] rounded-[36px] h-[36px] p-3 cursor-pointer items-center text-l"
      >
        Last Month
        <img class="ml-1" alt="filter" src="../../../assets/img/filter.svg" />
      </button>
    </div>
    <div
      class="mt-[20px] mb-[40px] bg-[#e1ebf4] max-w-full flex justify-between items-center p-2 cursor-pointer rounded-lg"
      @click="toggleDetails"
    >
      <div class="flex items-center">
        <img class="mr-4" alt="message" src="../../../assets/img/message.svg" />
        <p class="font-middle" :class="{ 'show-details': showDetails }">
          {{ showDetails ? 'Hide Report Details' : 'Show Report Details' }}
        </p>
      </div>
      <div class="flex justify-end">
        <img
          alt="arrow"
          src="../../../assets/img/down-arrow.svg"
          class="rotate-[180deg] w-3 mr-1 ml-1"
        />
      </div>
    </div>
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
                v-for="(data, index) in dataTable.data"
                :key="data.id"
                class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-[#fff2e5]"
              >
                <td class="whitespace-nowrap px-6 py-4 font-medium">
                  {{ data.id }}
                </td>
                <td class="whitespace-nowrap px-6 py-4">
                  {{ data.as_name }}
                </td>
                <td class="whitespace-nowrap px-6 py-4">
                  {{ data.volume }}
                </td>
                <td class="whitespace-nowrap px-6 py-4">
                  {{ data.asn }}
                </td>
                <td class="whitespace-nowrap px-6 py-4">
                  {{ data.improvements }}
                </td>
                <td class="whitespace-nowrap px-6 py-4">
                  {{ data.inbound }}
                </td>
                <td class="whitespace-nowrap px-6 py-4">
                  {{ data.outbound }}
                </td>
                <td class="whitespace-nowrap px-6 py-4">
                  {{ data.created_at }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <nav class="flex justify-center mt-5">
      <ul class="list-style-none flex">
        <li>
          <a
            class="relative block rounded px-3 py-1.5 text-sm text-black hover:bg-[#e9e9e9]"
            >Previous</a
          >
        </li>
        <li>
          <a
            class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-black transition-all duration-300 hover:bg-[#e9e9e9] dark:hover:bg-[#e9e9e9]"
            >1</a
          >
        </li>
        <li aria-current="page">
          <a
            class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-black transition-all duration-300 hover:bg-[#e9e9e9] dark:hover:bg-[#e9e9e9]"
            >2
            <span
              class="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]"
              >(current)</span
            >
          </a>
        </li>
        <li>
          <a
            class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-black transition-all duration-300 hover:bg-[#e9e9e9] dark:hover:bg-[#e9e9e9]"
            >3</a
          >
        </li>
        <li>
          <a
            class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-black transition-all duration-300 hover:bg-[#e9e9e9] dark:hover:bg-[#e9e9e9]"
            >Next</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { getDataTable } from '@/service/reportServices/api';

export default {
  data() {
    return {
      showDetails: false,
      dataTable: { headers: [] },
    };
  },
  methods: {
    toggleDetails() {
      this.showDetails = !this.showDetails;
    },
    formatHeaders(headers) {
      return headers.map((header) => {
        return header
          .replace(/_/g, ' ')
          .replace(/\b\w/g, (firstChar) => firstChar.toUpperCase());
      });
    },
    backRoute() {
      this.$router.go(-1);
    },
  },

  computed: {
    formattedHeaders() {
      return this.dataTable.headers;
    },
  },

  mounted() {
    getDataTable
      .then((data) => {
        this.dataTable = data;
        this.dataTable.headers = this.formatHeaders(this.dataTable.headers);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  },
};
</script>

<style></style>
