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

interface Props {
  method: APIMethods
  placeholder: string | undefined
  parameters: APIParameters | undefined
  endpoint: string
  response: string | undefined
}

const baseUrl = import.meta.env.VITE_API_BASEURL as string;

const fullURL = computed(() =>{
  let paramChain = "";
  if( props.parameters ){
    for (let i = 0; i < Object.keys(props.parameters).length; i++) {
      paramChain += "?" + Object.keys(props.parameters)[i] + "=" + Object.values(props.parameters)[i].value
    }
  }
  return baseUrl + props.endpoint + paramChain;
});

async function copyToClipBoard(){
  await navigator.clipboard.writeText(fullURL.value);
}

defineEmits(['send']);

const props = defineProps<Props>();

// Create a reactive reference for inputValuesParameter and a flag to track user modification
const inputValuesParameter = ref<APIParameters | undefined>(undefined);
const userHasModified = ref(false);

watch(() => props.parameters, (newParameters) => {
  if (newParameters && !userHasModified.value) {
    inputValuesParameter.value = JSON.parse(JSON.stringify(newParameters));
  }
}, { immediate: true });

// Method to handle input change and set the userHasModified flag
function handleInputChange() {
  userHasModified.value = true;
}
</script>

<template>
    <!-- Request Bar -->
    <div class="flex flex-row w-full items-center api-request__container">
      <div class="mr-2 p-1 api-request__method">
        <p class="text-center rounded m-0 font-bold px-2" >
            {{ method }}
        </p>
      </div>
      <p class="m-0 p-0">{{ fullURL }}</p>
      <button class="ml-auto" @click="$emit('send', inputValuesParameter)">
        <img src="/src/assets/icons/paperplane.svg" width="21" height="21">
      </button>
      <button class="ml-4" @click="copyToClipBoard">
        <img src="/src/assets/icons/copy.svg" width="20" height="20">
      </button>
    </div>
    <!-- Parameters -->
    <div>
      <div v-for="(parameterDetail, parameterName) in parameters" :key="parameterName">
        {{ parameterName }}
        {{ parameterDetail.type }}
        <input type="text"
               :placeholder="parameterDetail.value"
               v-model="inputValuesParameter[parameterName].value"
               @input="handleInputChange">


      </div>
      {{ inputValuesParameter }}
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
  margin: 0.5rem 0 0.5rem 0;
}

.api-request__method {
  border: 1px solid $pt-main-black;
  border-radius: 5px;
  background: $pt-main-black;
  color: $pt-main-white;
}

</style>