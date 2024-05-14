<script setup lang="ts">
interface Props {
  iconURL: string
  text: string
}

const props = defineProps<Props>();
</script>

<template>
  <button class="inline-flex button_container" >
    <img :src="iconURL">
    <span>{{ text }}</span>
  </button>
</template>

<style scoped lang="scss">
@import "src/assets/scss/variables";

.button_container {
  border: 1px solid $pt-main-black;
  border-radius: 5px;
  background: $pt-main-white;
  padding: 8px;
  gap: 10px;
  font-family: 'Inter Bold';
}
</style>