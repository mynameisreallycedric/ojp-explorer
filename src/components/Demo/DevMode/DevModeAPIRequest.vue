<script setup lang="ts">
import type {Connection} from "@/types/Connection";
import type {APIMethods} from "@/types/DevMode/APIMethods";
import useDiDokEvent from "@/compopsables/services/didok";
import {ref, watch} from "vue";
import type {DiDok} from "@/types/DiDok";

interface Props {
  station: string
  method: APIMethods
  endpointUrl: string
}

const baseUrl = import.meta.env.VITE_API_BASEURL as string;

const inputStation = ref<string>();

const response = ref<DiDok>();

function getDiDok(inputString: string): void {
  useDiDokEvent().getDiDokForLocation(inputString)
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
      <div class="mr-2 api-request__method">
        <p class="text-center rounded m-0 font-bold px-2" >
          {{ method }}
        </p>
      </div>
      <p class="m-0 p-0">{{ baseUrl + '/' }}</p>
      <input type="text" :placeholder="station" v-model="inputStation" @change="getDiDok(inputStation)">
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