<script setup lang="ts">
import DemoTimeTableInput from "@/components/Demo/TimeTable/DemoTimeTableInput.vue";
import {ref, watch} from "vue";
import useDiDokEvent from "@/compopsables/services/didok";
import type {DiDok} from "@/types/DiDok";

const modelValue = defineModel<number>();

const showDropDown = ref(true);

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

function updateLocation(diDok: number, stationName: string){
  modelValue.value = diDok;
  station.value = stationName;
}

function handleFocusOut(){
    setTimeout(() => {
      showDropDown.value = false;
    }, 100);
}

function handleFocusIn(){
  showDropDown.value = true;
}
</script>

<template>
  <div class="flex flex-col w-full">
    <DemoTimeTableInput @focusin="handleFocusIn" @focusout="handleFocusOut" v-model="station"></DemoTimeTableInput>
    <div v-if="showDropDown">
      <div v-for="option in diDokList?.results" :key="option.number" class="select__option">
        <label @click="updateLocation(option.number, option.designationofficial)" >
          <span>{{ option.designationofficial }}</span>
        </label>
        </div>
      </div>
  </div>

</template>

<style scoped lang="scss">
@import "src/assets/scss/variables";

.select__option {
  width: 100%;
  padding: 9px;
  border: 1px solid $pt-main-black;
}

</style>