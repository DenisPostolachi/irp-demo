<template>
  <div
    class="mt-[20px] mb-[40px] bg-[#e1ebf4] max-w-full flex justify-between items-center p-2 cursor-pointer rounded-lg"
    @click="toggleDetails"
  >
    <div class="flex items-center">
      <img class="mr-4" alt="message" src="../../../assets/img/message.svg" />
      <div>
        <p class="font-middle show-details" v-if="!showDetails">
          Show Report Details
        </p>
        <p class="font-middle" v-else>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
          dolores eum nulla odio sequi tempore voluptatem. Deleniti, dolores, ea
          esse illo iusto laborum officia praesentium quaerat, quas quod rerum
          velit?
        </p>
      </div>
    </div>
    <div class="flex justify-end">
      <img
        alt="arrow"
        src="../../../assets/img/down-arrow.svg"
        class="rotate-[180deg] w-3 mr-1 ml-1"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDetails: false,
    };
  },
  methods: {
    toggleDetails() {
      this.showDetails = !this.showDetails;
    },
  },
};
</script>

<style scoped></style>
