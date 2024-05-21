<script setup lang="ts">

import useLIRService from "@/composables/services/lir";
import DevModeGeneralAPIRequest from "@/components/Demo/DevMode/DevModeGeneralAPIRequest.vue";
import {APIMethods} from "@/types/DevMode/APIMethods";
import type {APIParameters} from "@/types/DevMode/APIParameters";
import {useDemoPageStore} from "@/stores/demo";
import {storeToRefs} from "pinia";
import {computed, type Ref, ref, watch} from "vue";

const demoStore = useDemoPageStore();
const { getQueryParametersForEndpoint } = storeToRefs(demoStore);

const response = ref();

function getLIR(): void {
  console.log(inputValue.value)
  useLIRService().getLIRForLocation(inputValue.value['locationName'].value)
      .then(res => {
        response.value = res;
      })
};


const params = computed(() => demoStore.getQueryParametersForEndpoint('/api/locationInformation'));
const inputValue = ref<APIParameters | undefined>({
  locationName: {
    value: '',
    mandatory: false,
    type: ''
  },
  Authorization: {
    value: '',
    mandatory: false,
    type: ''
  },
  limit: {
    value: '',
    mandatory: false,
    type: ''
  }
});


/*watch(() => params.value, (newParameters) => {
  console.log("new parameters: " + newParameters)
  if (newParameters) {
    inputValue.value = JSON.parse(JSON.stringify(newParameters));
  }
}, { immediate: true });*/


</script>

<template>
  <DevModeGeneralAPIRequest
      v-model="inputValue"
      @send="getLIR"
      :method="APIMethods.GET"
      endpoint="/locationInformation"
      :parameters="params"
      placeholder="test"
      :response="response">
  </DevModeGeneralAPIRequest>

</template>

<style scoped lang="scss">

</style>