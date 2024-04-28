<script setup lang="ts">
const modelValue = defineModel<string>();

</script>

<template>
  <input class="timetable_input p-1 w-full"
         type="text"
         v-model="modelValue"
         placeholder="Ausgangspunkt">
</template>

<style scoped lang="scss">
@import "src/assets/scss/variables";

.timetable_input {
  border: 1px solid $pt-main-black;
  border-radius: 5px;
  padding: 9px;
}

</style>