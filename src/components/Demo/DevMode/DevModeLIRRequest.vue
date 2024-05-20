<script setup lang="ts">

import useLIRService from "@/composables/services/lir";
import DevModeGeneralAPIRequest from "@/components/Demo/DevMode/DevModeGeneralAPIRequest.vue";
import {APIMethods} from "@/types/DevMode/APIMethods";
import type {APIParameters} from "@/types/DevMode/APIParameters";
import {useDemoPageStore} from "@/stores/demo";
import {storeToRefs} from "pinia";
import {computed} from "vue";

const demoStore = useDemoPageStore();
const { getParametersForEndpoint } = storeToRefs(demoStore);


function getLIR(inputString: string): void {
  useLIRService().getLIRForLocation(inputString)
      .then(res => {
        response.value = res;
      })
};


const params = computed(() => demoStore.getParametersForEndpoint('locationInformation'));

</script>

<template>
  <DevModeGeneralAPIRequest @send="(n) => console.log(n)" @copy="console.log('copy')" :method="APIMethods.GET" endpoint="/locationInformation" :parameters="params" placeholder="test" response="test">
  </DevModeGeneralAPIRequest>

</template>

<style scoped lang="scss">

</style>