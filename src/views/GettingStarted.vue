<script setup lang="ts">

import APITokenButton from "@/components/Main/APITokenButton.vue";
import DevModeLIRRequest from "@/components/Demo/DevMode/DevModeLIRRequest.vue";
import DevModeStationBoardRequest from "@/components/Demo/DevMode/DevModeStationBoardRequest.vue";
import {useDemoPageStore} from "@/stores/demo";
import {storeToRefs} from "pinia";
import {computed, onMounted} from "vue";
import {useSwaggerStore} from "@/stores/swagger";

const swaggerStore = useSwaggerStore();
const { getQueryParametersForEndpoint } = storeToRefs(swaggerStore);

const paramsLIR = computed(() => swaggerStore.getQueryParametersForEndpoint('/api/locationInformation'));
const paramsSB = computed(() => swaggerStore.getQueryParametersForEndpoint('/api/stationBoard'));

onMounted(() => {
  swaggerStore.fetchSwaggerJSON();
})

</script>

<template>
  <div class="wrapper">
    <section>
      <h1>GettingStarted</h1>
    </section>

    <section>
      <h2>Get your Key</h2>
      <APITokenButton />
    </section>

    <section>
      <h2>Query Endpoints</h2>
      <h3>/locationInformation</h3>
      <div class="getting_started--endpoints_container">
        <DevModeLIRRequest  :parameters="paramsLIR"/>
      </div>


      <h3>/stationBoard</h3>
      <div class="getting_started--endpoints_container">
        <DevModeStationBoardRequest  :parameters="paramsSB"/>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">

section {
  margin-bottom: 5rem;
}

.getting_started--endpoints_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 700px;
}

</style>