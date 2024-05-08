<script setup lang="ts">
import type {Connection} from "@/types/Connection";
import type {APIMethods} from "@/types/DevMode/APIMethods";
import useDiDokEvent from "@/composables/services/didok";
import {ref, watch} from "vue";
import type {DiDok} from "@/types/old/DiDok";
import {param} from "ts-interface-checker";
import type {LIR} from "@/types/LIR";
import useLIRService from "@/composables/services/lir";

interface Props {
  station: string
  method: APIMethods
  endpointUrl: string
  params: string
}

const baseUrl = import.meta.env.VITE_API_BASEURL as string;

const inputStation = ref<string>();

const response = ref<LIR>();

function getLIR(inputString: string): void {
  useLIRService().getLIRForLocation(inputString)
      .then(res => {
        response.value = res;
      })
}

/*
watch(() => inputStation.value, (value) => {
  console.log(value);
  if (value.length > 2) {
    getDiDok(value);
  }
});
*/

const props = defineProps<Props>();
</script>

<template>
    <div class="flex flex-row w-full items-center api-request__container">
      <div class="mr-2 p-1 api-request__method">
        <p class="text-center rounded m-0 font-bold px-2" >
          {{ method }}
        </p>
      </div>
      <p class="m-0 p-0">{{ '/' + endpointUrl + "?" + params + "="}}</p>
      <input type="text" :placeholder="station" v-model="inputStation" @change="getLIR(inputStation)">
      <button class="ml-auto">
        <img src="/src/assets/icons/paperplane.svg" width="21" height="21">
      </button>
    </div>
    <div v-if="response" class="api_response__container">
      <p class="font-bold mr-auto mb-0">Response</p>
      <div class="api_response__response">
        {{ response }}
      </div>
    </div>
</template>

<style scoped lang="scss">
@import "src/assets/scss/variables";

.api_response__response {
  border: 1px solid $pt-main-black;
  border-radius: 5px;
  background: $pt-main-gray;
  padding: 5px 10px 5px 5px;
  margin: 0.5rem 0 0.5rem 0;
  max-height: 200px;
  overflow-y: scroll;
}

.api-request__container {
  border: 1px solid $pt-main-black;
  border-radius: 5px;
  background: $pt-main-white;
  padding: 5px 10px 5px 5px;
  margin: 0.5rem 0 0.5rem 0;
}

.api-request__method {
  border: 1px solid $pt-main-black;
  border-radius: 5px;
  background: $pt-main-black;
  color: $pt-main-white;
}

</style>