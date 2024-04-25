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
    <div v-if="showDevMode" class="demo_layot--devMode_container">
      <slot name="devMode"></slot>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "src/assets/scss/variables";

.demo_layot--devMode_container {
  background: $pt-main-gray;
}
</style>