<script setup lang="ts">
interface Props {
  toggleLabel: string
}

defineProps<Props>();

const emit = defineEmits(['checked'])
</script>

<template>
  <div class="flex flex-col items-center devmode_toggle-container">
    <input type="checkbox" id="toggle" @change="$emit('checked')" />
    <label for="toggle"></label>
    <p>{{ toggleLabel }}</p>
  </div>
</template>

<style scoped lang="scss">
@import "src/assets/scss/variables";

#toggle {
  display: none;
}


label {
  display: inline-block;;
  width: 60px;
  height: 30px;
  background-color: $pt-main-white;
  border: 1px solid $pt-main-black;
  border-radius: 20px;
  position: relative;
  cursor: pointer;
}

label::before {
  content: "";
  position: absolute;
  top: 1px;
  left: 2px;
  width: 26px;
  height: 26px;
  background-color: $pt-main-black;
  border-radius: 50%;
  transition: transform 0.3s;
}

#toggle:checked + label {
  background-color: $pt-main-black;
}

#toggle:checked + label::before {
  transform: translateX(28px);
  background-color: $pt-main-white;
}
</style>