<script setup lang="ts">

import useLIRService from "@/composables/services/lir";
import DevModeGeneralAPIRequest from "@/components/Demo/DevMode/DevModeGeneralAPIRequest.vue";
import {APIMethods} from "@/types/DevMode/APIMethods";
import type {APIParameters} from "@/types/DevMode/APIParameters";
import {useDemoPageStore} from "@/stores/demo";
import {storeToRefs} from "pinia";
import {computed, type Ref, ref, watch} from "vue";
import type {SwaggerParams} from "@/types/SwaggerModels";

interface Props {
  parameters: SwaggerParams[] | undefined;
}

const props = defineProps<Props>();

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



const inputValue = ref({
  locationName: {
    value: ''
  },
  limit: {
    value: '',
  }
});
</script>

<template>
  <DevModeGeneralAPIRequest
      v-model="inputValue"
      @send="getLIR"
      :method="APIMethods.GET"
      endpoint="/locationInformation"
      :parameters="parameters"
      placeholder="test"
      :response="response">
  </DevModeGeneralAPIRequest>

</template>

<style scoped lang="scss">

</style>