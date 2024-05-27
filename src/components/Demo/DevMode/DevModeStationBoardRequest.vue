<script setup lang="ts">

import useLIRService from "@/composables/services/lir";
import DevModeGeneralAPIRequest from "@/components/Demo/DevMode/DevModeGeneralAPIRequest.vue";
import {APIMethods} from "@/types/DevMode/APIMethods";
import type {APIParameters} from "@/types/DevMode/APIParameters";
import {useDemoPageStore} from "@/stores/demo";
import {storeToRefs} from "pinia";
import {computed, type Ref, ref, watch} from "vue";
import useStationBoardService from "@/composables/services/stationBoard";
import type {SwaggerParams} from "@/types/SwaggerModels";

interface Props {
  parameters: SwaggerParams[] | undefined;
}

const props = defineProps<Props>();

const demoStore = useDemoPageStore();
const { getQueryParametersForEndpoint } = storeToRefs(demoStore);

const response = ref();

function getStationBoard(): void {
  useStationBoardService().getStationBoardForLocation(inputValue.value['station'].value,
      inputValue.value['id'].value,
      inputValue.value['datetime'].value,
      inputValue.value['limit'].value)
      .then(res => {
        response.value = res;
      })
}

const inputValue = ref({
  station: {
    value: '',
  },
  id: {
    value: null,
  },
  datetime  : {
    value: '',
  },
  limit: {
    value: null,
  }
});
</script>

<template>
  <DevModeGeneralAPIRequest
      v-model="inputValue"
      @send="getStationBoard"
      :method="APIMethods.GET"
      endpoint="/stationBoard"
      :parameters="parameters"
      placeholder="test"
      :response="response">
  </DevModeGeneralAPIRequest>

</template>

<style scoped lang="scss">

</style>