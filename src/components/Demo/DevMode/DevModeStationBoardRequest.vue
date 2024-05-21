<script setup lang="ts">

import useLIRService from "@/composables/services/lir";
import DevModeGeneralAPIRequest from "@/components/Demo/DevMode/DevModeGeneralAPIRequest.vue";
import {APIMethods} from "@/types/DevMode/APIMethods";
import type {APIParameters} from "@/types/DevMode/APIParameters";
import {useDemoPageStore} from "@/stores/demo";
import {storeToRefs} from "pinia";
import {computed, type Ref, ref, watch} from "vue";
import useStationBoardService from "@/composables/services/stationBoard";

const demoStore = useDemoPageStore();
const { getQueryParametersForEndpoint } = storeToRefs(demoStore);

const response = ref();

function getStationBoard(): void {
  useStationBoardService().getStationBoardForLocation(inputValue.value['station'].value)
      .then(res => {
        response.value = res;
      })
}


const params = computed(() => demoStore.getQueryParametersForEndpoint('/api/stationBoard'));
const inputValue = ref<APIParameters | undefined>({
  locationName: {
    value: '',
    mandatory: false,
    type: ''
  },
  station: {
    value: '',
    mandatory: false,
    type: ''
  },
  id: {
    value: '',
    mandatory: false,
    type: ''
  },
  datetime  : {
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
</script>

<template>
  <DevModeGeneralAPIRequest
      v-model="inputValue"
      @send="getStationBoard"
      :method="APIMethods.GET"
      endpoint="/stationBoard"
      :parameters="params"
      placeholder="test"
      :response="response">
  </DevModeGeneralAPIRequest>

</template>

<style scoped lang="scss">

</style>