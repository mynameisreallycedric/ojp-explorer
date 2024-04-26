<script setup lang="ts">
interface Props {
  showDevMode: boolean
}

const props = defineProps<Props>();
</script>

<template>
  <div class="grid grid-flow-col">
    <div>
      <slot name="main"></slot>
    </div>
    <Transition name="transition-devmode">
    <div v-if="showDevMode" class="demo_layot--devMode_container">
      <slot name="devMode"></slot>
    </div>
    </Transition>
  </div>
</template>
<style scoped lang="scss">
@import "src/assets/scss/variables";

.demo_layot--devMode_container {
  background: $pt-main-gray;
}

.transition-devmode-enter-active {
  transition: all 0.1s ease-in;
}

.transition-devmode-leave-active {
  transition: all 0.1s ease-out;
}

.transition-devmode-enter-to {
  opacity: 1;
}

.transition-devmode-enter-from,
.transition-devmode-leave-to {
  transform: translateX(100px);
  opacity: 0;
}
</style>