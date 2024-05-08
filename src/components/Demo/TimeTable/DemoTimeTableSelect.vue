<script setup lang="ts">
import DemoTimeTableInput from "@/components/Demo/TimeTable/DemoTimeTableInput.vue";
import {ref, watch} from "vue";
import useDiDokEvent from "@/composables/services/didok";
import type { LIR } from "@/types/LIR";
import useLIRService from "@/composables/services/lir";

const selectedLIR = defineModel<string>('lir');
const selectedStation = defineModel<string>('station');

const showDropDown = ref<boolean>(false);

const station = ref<string>("");

const lirList = ref<LIR>();

function getLIR(inputString: string): void {
  useLIRService().getLIRForLocation(inputString)
      .then(res => {
        lirList.value = res;
      })
}

watch(() => selectedStation.value, (value) => {
  console.log(value);
  if (value.length > 2) {
    getLIR(value);
  }
});

function updateLocation(lir: string, stationName: string){
  selectedLIR.value = lir;
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
        <div v-for="option in lirList?.locations" :key="option.id" class="select__option">
          <label @click="updateLocation(option.id, option.name)" >
            <span>{{ option.name }}</span>
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