<script setup lang="ts">
import DemoTimeTableInput from "@/components/Demo/TimeTable/DemoTimeTableInput.vue";
import {ref, watch} from "vue";
import useDiDokEvent from "@/compopsables/services/didok";
import type {DiDok} from "@/types/DiDok";

const modelValue = defineModel<number>();

const station = ref<string>("");

const diDokList = ref<DiDok>();

function getDiDok(inputString: string): void {
  useDiDokEvent().getDiDokForLocation(inputString)
      .then(res => {
        diDokList.value = res;
      })
}

watch(() => station.value, (value) => {
  console.log(value);
  if (value.length > 2) {
    getDiDok(value);
  }
});
</script>

<template>
  <div class="flex flex-col">
    <DemoTimeTableInput v-model="station"></DemoTimeTableInput>
    <select v-if="diDokList" v-model="modelValue">
      <option v-for="diDok in diDokList.results" :key="diDok.number" :value="diDok.number">
        {{ diDok.designationofficial }}
      </option>
    </select>
  </div>

</template>

<style scoped lang="scss">

</style>