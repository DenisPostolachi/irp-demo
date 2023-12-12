<template>
  <nav class="flex justify-center mt-5">
    <ul class="list-style-none flex items-center">
      <li>
        <img
          alt="arrow"
          src="../../assets/img/down-arrow.svg"
          class="relative block rounded px-2 py-2.5 text-sm text-black hover:bg-[#e9e9e9] rotate-[90deg]"
          @click="$emit('prevPage')"
        />
      </li>
      <li v-for="(i, key) in totalPages" :key="key">
        <a
          @click="$emit('change', i)"
          :class="{
            'font-bold bg-[#e9e9e9] dark:bg-[#e9e9e9]': page === i,
          }"
          class="relative cursor-pointer block rounded bg-transparent px-3 py-1.5 text-sm text-black transition-all duration-300 hover:bg-[#e9e9e9] dark:hover:bg-[#e9e9e9]"
          >{{ i }}</a
        >
      </li>
      <li>
        <img
          alt="arrow"
          src="../../assets/img/down-arrow.svg"
          class="relative block rounded px-2 py-2.5 text-sm text-black hover:bg-[#e9e9e9] rotate-[-90deg]"
          @click="$emit('nextPage')"
        />
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['page', 'totalPages'],
  data() {
    return {};
  },
};
</script>
<style></style>
