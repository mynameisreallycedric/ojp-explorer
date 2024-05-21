<script setup lang="ts">
import useStopEvent from "@/composables/services/stopEvent";
import {onMounted, ref, watch} from "vue";
import type {StopEvent} from "@/types/StopEvent";
import type {Connection} from "@/types/Connection";
import DemoTimeTableConnections from "@/components/Demo/TimeTable/DemoTimeTableConnectionTable.vue";
import DevModeToggle from "@/components/Demo/DevMode/DevModeToggle.vue";
import DemoLayout from "@/components/Demo/Layout/DemoLayout.vue";
import DemoTimeTableSelect from "@/components/Demo/TimeTable/DemoTimeTableSelect.vue";
import DevModeAPIRequest from "@/components/Demo/DevMode/DevModeAPIRequest.vue";
import {APIMethods} from "@/types/DevMode/APIMethods";
import DevModeStep from "@/components/Demo/DevMode/DevModeStep.vue";
import type {StationBoard} from "@/types/StationBoard";
import useStationBoardService from "@/composables/services/stationBoard";
import {useDemoPageStore} from "@/stores/demo";
import {storeToRefs} from "pinia";
import DevModeLIRRequest from "@/components/Demo/DevMode/DevModeLIRRequest.vue";
import DevModeStationBoardRequest from "@/components/Demo/DevMode/DevModeStationBoardRequest.vue";

const stationBoardService = useStationBoardService();

const loading = ref<boolean>(false);
const stationBoard = ref<StationBoard>();
const errorMessage = ref<string | null>(null);

const selectedStation = ref("");

const showDevMode = ref(false);

const selectedLIR = ref<string>();

const demoStore = useDemoPageStore();
const { getParametersForEndpoint } = storeToRefs(demoStore);

watch(() => selectedLIR.value, async (value) => {
    if (errorMessage.value !== null) errorMessage.value = null;

    if (value) {
        loading.value = true;
        stationBoardService.getStationBoardForLocation(value)
            .then(res => stationBoard.value = res)
            .catch(err => errorMessage.value = err)
            .finally(() => loading.value = false);
        demoStore.setParameterValueForEndpoint('/api/stationBoard', 'id', value)
    }
});

watch(() => selectedStation.value, async (value) => {
  demoStore.setParameterValueForEndpoint('/api/locationInformation', 'locationName', value)
  demoStore.setParameterValueForEndpoint('/api/stationBoard', 'station', value)
});

onMounted(() => {
  demoStore.initializeSwaggerDoc();
})

</script>

<template>
    <DemoLayout :showDevMode>
        <template #main>
            <div class="flex flex-col items-center">
                <DevModeToggle toggleLabel="Developer Mode" @checked="showDevMode = !showDevMode"/>
                <DevModeStep :dev-mode=false :step-nr=1>
                    <div class="p-[1rem]">
                        <DemoTimeTableSelect v-model:lir="selectedLIR"
                                             v-model:station="selectedStation"></DemoTimeTableSelect>
                    </div>
                </DevModeStep>
                <DevModeStep :dev-mode=false :step-nr=2>
                    <div class="p-[1rem]">
                        <DemoTimeTableConnections v-if="stationBoard?.stationBoard"
                                                  :connections="stationBoard?.stationBoard"/>
                    </div>
                </DevModeStep>
            </div>
        </template>
        <template #devMode>
          <h3 class="font-bold pl-[1rem]">Developer Mode 👾</h3>
            <DevModeStep :devMode=true :stepNr=1>
                <div class="flex flex-col items-center p-[1rem]">
                    <DemoTimeTableSelect v-model:lir="selectedLIR"
                                         v-model:station="selectedStation"></DemoTimeTableSelect>
                  <DevModeLIRRequest />
                </div>
            </DevModeStep>
            <DevModeStep :devMode=true :stepNr=2>
                <div class="flex flex-col items-center p-[1rem]">
                    <DevModeStationBoardRequest />
                </div>
            </DevModeStep>
        </template>
    </DemoLayout>
</template>

<style scoped>

</style>