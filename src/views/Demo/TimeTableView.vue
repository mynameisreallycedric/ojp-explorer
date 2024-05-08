<script setup lang="ts">
import useStopEvent from "@/composables/services/stopEvent";
import {ref, watch} from "vue";
import type {StopEvent} from "@/types/StopEvent";
import type {Connection} from "@/types/Connection";
import DemoTimeTableConnections from "@/components/Demo/TimeTable/DemoTimeTableConnections.vue";
import DevModeToggle from "@/components/Demo/DevMode/DevModeToggle.vue";
import DemoLayout from "@/components/Demo/Layout/DemoLayout.vue";
import DemoTimeTableSelect from "@/components/Demo/TimeTable/DemoTimeTableSelect.vue";
import DevModeAPIRequest from "@/components/Demo/DevMode/DevModeAPIRequest.vue";
import {APIMethods} from "@/types/DevMode/APIMethods";
import DevModeStep from "@/components/Demo/DevMode/DevModeStep.vue";
import type {StationBoard} from "@/types/StationBoard";
import useStationBoardService from "@/composables/services/stationBoard";

const stationBoard = ref<StationBoard>();

const selectedStation = ref("");

const showDevMode = ref(false);

const selectedLIR = ref<string>();

watch(() => selectedLIR.value, async (value) => {
  if (value) {
    stationBoard.value = await useStationBoardService().getStationBoardForLocation(value);
  }
})
</script>

<template>
  <DemoLayout :showDevMode>
    <template #main>
      <div class="flex flex-col items-center p-[1rem]">
        <DevModeToggle toggleLabel="Developer Mode" @checked="showDevMode = !showDevMode" />
        <DevModeStep :dev-mode=false :step-nr=1>
          <DemoTimeTableSelect v-model:lir="selectedLIR" v-model:station="selectedStation"></DemoTimeTableSelect>
        </DevModeStep>

            <DemoTimeTableConnections v-if="stationBoard?.stationBoard" :connections="stationBoard?.stationBoard" />
      </div>
    </template>
    <template #devMode>
      <DevModeStep :devMode=true :stepNr=1>
        <div class="flex flex-col items-center p-[1rem]">
          <DemoTimeTableSelect v-model:lir="selectedLIR" v-model:station="selectedStation"></DemoTimeTableSelect>
          <DevModeAPIRequest :method="APIMethods.GET" endpointUrl="locationInformation/" params="locationName" :station="selectedStation"></DevModeAPIRequest>
        </div>
      </DevModeStep>
    </template>
  </DemoLayout>
</template>

<style scoped>

</style>