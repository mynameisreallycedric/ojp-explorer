<script setup lang="ts">
import {ref} from "vue";

interface Props {
  stepNr: number
}

const isActive = ref<boolean>(false);

const props = defineProps<Props>();
</script>

<template>
  <div class="step__container" @focusin="isActive = true" @focusout="isActive = false" :class="{ active: isActive }">
    <p>{{ "step " + stepNr }}</p>
    <slot />
  </div>
</template>

<style scoped lang="scss">
.step__container {
  box-sizing: border-box;
  margin: 1rem;

  p {
    margin: 0;
    padding-left: 1rem;
    padding-top: 1rem;
    font-weight: 700;
    letter-spacing: 2.1px;
    text-transform: uppercase;
  }
}

.active {
  margin: calc(1rem - 1px) calc(1rem - 1px) calc(1rem - 1px) calc(1rem - 4px);;
  border-radius: 5px;
  border-inline: 1px solid #59F;
  border-right: 1px solid #59F;
  border-bottom: 1px solid #59F;
  border-top: 1px solid #59F;
  border-left: 4px solid #59F;
  background: rgba(31, 120, 255, 0.20);
}
</style>