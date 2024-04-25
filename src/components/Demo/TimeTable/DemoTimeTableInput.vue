<script setup lang="ts">

interface Props {
  modelValue: string
}

const props = defineProps<Props>();

const emit = defineEmits(['update:modelValue'])

</script>

<template>
  <input class="timetable_input p-1"
         type="text"
         :value="modelValue"
         @input="$emit('update:modelValue', $event.target.value)"
         placeholder="Ausgangspunkt">
</template>

<style scoped lang="scss">
@import "src/assets/scss/variables";

.timetable_input {
  width: 600px;
  margin: 1rem;
  border: 1px solid $pt-main-black;
  border-radius: 5px;
  padding: 9px;
}

</style>