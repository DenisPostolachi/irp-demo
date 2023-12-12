<template>
  <div>
    <div class="flex justify-between">
      <div class="flex justify-between w-fit items-center">
        <p>Reports</p>
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
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div class="overflow-hidden">
            <table class="min-w-full text-left text-sm font-light">
              <thead class="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" class="px-6 py-4">#</th>
                  <th scope="col" class="px-6 py-4">First</th>
                  <th scope="col" class="px-6 py-4">Last</th>
                  <th scope="col" class="px-6 py-4">Handle</th>
                  <th scope="col" class="px-6 py-4">#</th>
                  <th scope="col" class="px-6 py-4">First</th>
                  <th scope="col" class="px-6 py-4">Last</th>
                  <th scope="col" class="px-6 py-4">Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-[#fff2e5]"
                >
                  <td class="whitespace-nowrap px-6 py-4 font-medium">1</td>
                  <td class="whitespace-nowrap px-6 py-4">Mark</td>
                  <td class="whitespace-nowrap px-6 py-4">Otto</td>
                  <td class="whitespace-nowrap px-6 py-4">@mdo</td>
                  <td class="whitespace-nowrap px-6 py-4 font-medium">1</td>
                  <td class="whitespace-nowrap px-6 py-4">Mark</td>
                  <td class="whitespace-nowrap px-6 py-4">Otto</td>
                  <td class="whitespace-nowrap px-6 py-4">@mdo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div v-for="item in data" :key="item.id">
      {{ item.headers }}
    </div>
  </div>
</template>

<script>
// import axios from 'axios';

export default {
  data() {
    return {
      showDetails: false,
      data: [],
    };
  },
  methods: {
    toggleDetails() {
      this.showDetails = !this.showDetails;
    },
  },
  // mounted() {
  //   axios
  //     .get('http://localhost:3000/reports/asnumber?page=1&pageSize=50')
  //     .then((response) => {
  //       console.log(response.data);
  //     });
  // },
};
</script>

<style></style>
