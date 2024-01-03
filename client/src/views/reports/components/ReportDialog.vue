<template>
  <div>
    <p>Added this item</p>
    <div
      v-for="(value, key, index) in getFormattedKeys(clickedReportItem)"
      :key="key"
    >
      <template v-if="index < 2">
        <p class="inline-block">{{ key }}: {{ value }}</p>
      </template>
    </div>
  </div>
</template>

<script>
import { getFormattedKeys } from '@/helpers/helpers';

export default {
  methods: { getFormattedKeys },
  props: ['clickedReportItem'],
  mounted() {},
};
</script>
