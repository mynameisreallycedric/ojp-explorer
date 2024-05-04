<script setup lang="ts">
import DemoTimeTableInput from "@/components/Demo/TimeTable/DemoTimeTableInput.vue";
import {ref, watch} from "vue";
import useDiDokEvent from "@/composables/services/didok";
import type {DiDok} from "@/types/DiDok";

const selectedDiDok = defineModel<number>('didok');
const selectedStation = defineModel<string>('station');

const showDropDown = ref<boolean>(false);

const station = ref<string>("");

const diDokList = ref<DiDok>();

function getDiDok(inputString: string): void {
  useDiDokEvent().getDiDokForLocation(inputString)
      .then(res => {
        diDokList.value = res;
      })
}

watch(() => selectedStation.value, (value) => {
  console.log(value);
  if (value.length > 2) {
    getDiDok(value);
  }
});

function updateLocation(diDok: number, stationName: string){
  selectedDiDok.value = diDok;
  selectedStation.value = stationName;
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
    <DemoTimeTableInput @focus="handleFocusIn" @focusout="handleFocusOut" v-model="selectedStation"></DemoTimeTableInput>
    <div class="relative">
      <div v-if="showDropDown" class="flex flex-col absolute z-10 w-full select__dropdown">
        <div v-for="option in diDokList?.results" :key="option.number" class="select__option">
          <label @click="updateLocation(option.number, option.designationofficial)" >
            <span>{{ option.designationofficial }}</span>
          </label>
        </div>
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
  background: $pt-main-white;
}

.select__dropdown {
  max-height: 400px;
  overflow-y: scroll;
}

.select__dropdown > div:first-of-type {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.select__dropdown > div:last-of-type {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

</style>