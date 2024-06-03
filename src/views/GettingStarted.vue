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
      <p>Welcome to the OJP-Explorer documentation!<br>
        This guide will help you get started with accessing and using the API to retrieve data about Swiss public transport.</p>
    </section>

    <section>
      <h2>Get your Key</h2>
      <p>To authenticate your requests, you need an API key. You can obtain an API key by signing up on the official OJP-Developer portal.<br>
        You can find the developer portal under the following link: <a style="text-decoration: underline" href="https://opentransportdata.swiss/en/dev-dashboard/">OJP-Developer Portal</a><br>
        <br>
        This API key needs to be included in the Authorization header of your HTTP requests.<br>
        <br>
        For all demos on the OJP-Explorer, you can set your API key using the option at the top-right of the page. The option is indicated like the following button.
      </p>
      <APITokenButton />
    </section>

    <section>
      <h2>Query Endpoints</h2>
      <p>Next you can start querying the different available endpoints.</p>
      <h3>/locationInformation</h3>
      <p>This endpoint provides you with a list of locations matching your parameter.<br>
        You can use this for receiving a list of locations for easy selection as well as the location id needed for other endpoints.
      </p>
      <div class="getting_started--endpoints_container">
        <DevModeLIRRequest  :parameters="paramsLIR"/>
      </div>

      <h3>/stationBoard</h3>
      <p>The "stationBoard" endpoint provides a list of outgoing connections from a specified location.
        This information can be used for creating a station-board for a specific location.</p>
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

h3 {
  margin-top: 2rem;
}

</style>