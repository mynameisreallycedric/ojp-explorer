<script setup lang="ts">
import {ref} from "vue";
import {useTimeTableStore} from "@/stores/timetable";
import {storeToRefs} from "pinia";

interface Props {
  stepNr: number
  devMode: boolean
}

const isActive = ref<boolean>(false);

const timeTableStore = useTimeTableStore();
const { getCurrentActiveStep } = storeToRefs(timeTableStore);

function handleFocusIn(){
  if (props.devMode){
    timeTableStore.setCurrentActiveStep(props.stepNr)
  }
}

function handleFocusOut(){
  if (props.devMode) {
    timeTableStore.setCurrentActiveStep(0)
  }
}

const props = defineProps<Props>();
</script>

<template>
  <div class="step__container w-full" @focusin="handleFocusIn" @focusout="handleFocusOut" :class="{ active: stepNr === getCurrentActiveStep }">
    <p v-if="devMode">{{ "step " + stepNr }}</p>
    <slot />
  </div>
</template>

<style scoped lang="scss">
.step__container {
  box-sizing: border-box;
  margin: 0;

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
  //margin: calc(1rem - 1px) calc(1rem - 1px) calc(1rem - 1px) calc(1rem - 4px);;
  //border-radius: 5px;
  outline: 1px solid #59F;
  //border-inline: 1px solid #59F;
  //border-right: 1px solid #59F;
  //border-bottom: 1px solid #59F;
  //border-top: 1px solid #59F;
  border-left: 4px solid #59F;
  background: rgba(31, 120, 255, 0.20);

  p {
    padding-left: calc(1rem - 4px);
  }
}
</style>