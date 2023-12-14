<template>
  <div>
    <div
      class="filter-component fixed block top-[-100px] right-[-20px] bottom-0 bg-white drop-shadow-2xl z-30 w-[640px] pt-20 pl-3 pr-3"
    >
      <h4 class="text-lg font-medium">Filters</h4>
      <div class="grid-cols-2 grid gap-4 mt-10">
        <div>
          <p class="pl-2 mb-3">AS name</p>
          <input
            v-model="filters.asName"
            placeholder="Any As name"
            type="text"
            class="hoverSlow border-2 border-[#e9e9e9] border-solid rounded-2xl h-[38px] p-2 min-w-full"
          />
        </div>
        <div>
          <p class="pl-2 mb-3">Page</p>
          <input
            v-model="filters.page"
            placeholder="Page"
            type="text"
            class="hoverSlow border-2 border-[#e9e9e9] border-solid rounded-2xl h-[38px] p-2 min-w-full"
          />
        </div>
        <div>
          <p class="pl-2 mb-3">Number of records</p>
          <input
            v-model="filters.pageSize"
            type="text"
            class="hoverSlow border-2 border-[#e9e9e9] border-solid rounded-2xl h-[38px] p-2 min-w-full"
          />
        </div>
      </div>
      <div class="absolute right-[20px] bottom-[10px] left-0">
        <div class="flex justify-end">
          <button
            @click="resetFilter"
            class="bg-[#c2c2c2] hover:bg-[#9c9c9c] mr-4 p-2 rounded-2xl color-[#515151] font-bold text-xs w-[80px] uppercase"
          >
            RESET
          </button>
          <button
            @click="submit"
            class="bg-[#ff8400] hover:bg-[#e67700] p-2 rounded-2xl text-white font-bold text-xs w-[80px] uppercase"
          >
            apply
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['showFilter'],
  data() {
    return {
      filters: {
        page: 1,
        pageSize: 10,
      },
    };
  },
  methods: {
    submit() {
      this.$store.commit('applyFilters', this.filters);
    },
    resetFilter() {
      this.$store.commit(
        'applyFilters',
        (this.filters.page = 1),
        (this.filters.pageSize = 10),
        (this.filters.asName = ''),
      );
    },
  },
};
</script>
<style scoped>
.filter-component {
  opacity: 0;
  animation: fadeIn 0.7s forwards;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes slowHover {
  0% {
    border-color: #e9e9e9;
  }
  100% {
    border-color: #000;
  }
}
.hoverSlow:hover,
.hoverSlow:focus {
  animation: slowHover 1s linear forwards;
  outline: none;
}
</style>
