<script setup lang="ts">
import type {Connection} from "@/types/Connection";
import type {APIMethods} from "@/types/DevMode/APIMethods";
import useDiDokEvent from "@/composables/services/didok";
import {computed, onMounted, type Ref, ref, watch} from "vue";
import type {DiDok} from "@/types/old/DiDok";
import {param} from "ts-interface-checker";
import type {LIR} from "@/types/LIR";
import useLIRService from "@/composables/services/lir";
import type {APIParameterDetail, APIParameters} from "@/types/DevMode/APIParameters";
import type {SwaggerParams} from "@/types/SwaggerModels";

interface Props {
  method: APIMethods
  placeholder: string | undefined
  parameters: SwaggerParams[] | undefined
  endpoint: string
  response: string | undefined
}

const baseUrl = import.meta.env.VITE_API_BASEURL as string;

const isUserInput = ref();

const userInputParameterValues = defineModel<APIParameters>();

const fullURL = computed(() =>{
  let paramChain = "";
    if( props.parameters ){
      for (let i = 0; i < props.parameters.length; i++) {
        if (userInputParameterValues.value[props.parameters[i].name].value){
            paramChain += "?" + props.parameters[i].name + "=" + userInputParameterValues.value[props.parameters[i].name].value
        } else {
          if (props.parameters[i].value){
            paramChain += "?" + props.parameters[i].name + "=" + props.parameters[i].value
          }
        }
      }
  }
  return baseUrl + props.endpoint + paramChain;
});

async function copyToClipBoard(){
  await navigator.clipboard.writeText(fullURL.value);
}

defineEmits(['send']);
const props = defineProps<Props>();
</script>

<template>
    <!-- Request Bar -->
    <div class="flex flex-row w-full items-center api-request__container">
      <div class="mr-2 p-1 api-request__method">
        <p class="text-center rounded m-0 font-bold px-2" >
            {{ method }}
        </p>
      </div>
      <p class="m-0 p-0 max-w-full text-nowrap overflow-x-scroll">{{ fullURL }}</p>
      <button class="ml-auto" @click="$emit('send', userInputParameterValues)">
        <img src="/src/assets/icons/paperplane.svg" width="21" height="21">
      </button>
      <button class="ml-4" @click="copyToClipBoard">
        <img src="/src/assets/icons/copy.svg" width="20" height="20">
      </button>
    </div>
    <!-- Parameters -->
    <div class="flex flex-col w-full api-parameters__container">
      <hp class="font-bold">Required Parameters</hp>
      <div v-for="parameter in parameters" class="grid grid-cols-[1fr_1fr_1fr] ">
        <div class="flex flex-col">
          <p class="api-parameters__text-name">{{ parameter.name }}</p>
          <p class="api-parameters__text-type">{{ parameter.schema.type }}</p>
        </div>
        <input  class="api-parameters__input"
                type="text"
               :placeholder="parameter.value"
               v-model="userInputParameterValues[parameter.name].value">
      </div>
    </div>
    <!-- Response -->
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
  margin: 0.5rem 0 0 0;
}

.api-request__method {
  border: 1px solid $pt-main-black;
  border-radius: 5px;
  background: $pt-main-black;
  color: $pt-main-white;
}

.api-parameters__container {
  border: 1px solid $pt-main-black;
  border-radius: 5px;
  padding: 5px;
  background: $pt-main-white;
}

.api-parameters__text-name {
  font-weight: bold;
  margin: 0;
}

.api-parameters__text-type {
  color: $pt-purple;
  margin: 0;
}

.api-parameters__input {
  padding: 7px;
  border: 1px solid $pt-main-black;
  background: $pt-main-white;
  border-radius: 5px;
  height: min-content;
}

</style>