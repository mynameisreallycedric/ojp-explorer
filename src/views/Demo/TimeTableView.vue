<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
import DemoTimeTableConnections from "@/components/Demo/TimeTable/DemoTimeTableConnectionTable.vue";
import DevModeToggle from "@/components/Demo/DevMode/DevModeToggle.vue";
import DemoLayout from "@/components/Demo/Layout/DemoLayout.vue";
import DemoTimeTableSelect from "@/components/Demo/TimeTable/DemoTimeTableSelect.vue";
import DevModeStep from "@/components/Demo/DevMode/DevModeStep.vue";
import type {StationBoard} from "@/types/StationBoard";
import useStationBoardService from "@/composables/services/stationBoard";
import {useDemoPageStore} from "@/stores/demo";
import {storeToRefs} from "pinia";
import DevModeLIRRequest from "@/components/Demo/DevMode/DevModeLIRRequest.vue";
import DevModeStationBoardRequest from "@/components/Demo/DevMode/DevModeStationBoardRequest.vue";
import DemoLayoutButton from "@/components/Demo/Layout/DemoLayoutButton.vue";
import Endpoint from "@/components/Endpoint.vue";
import type {SwaggerEndpoint} from "@/types/SwaggerModels";
import {useSwaggerStore} from "@/stores/swagger";

const stationBoardService = useStationBoardService();
const swaggerStore = useSwaggerStore();

const loading = ref<boolean>(false);
const stationBoard = ref<StationBoard>();
const errorMessage = ref<string | null>(null);

const selectedStation = ref("");

const showDevMode = ref(false);

const selectedLIR = ref<string>();

const demoStore = useDemoPageStore();

watch(() => selectedLIR.value, async (value) => {
    if (errorMessage.value !== null) errorMessage.value = null;

    if (value) {
        loading.value = true;
        stationBoardService.getStationBoardForLocation(value)
            .then((res) => stationBoard.value = res)
            .finally(() => loading.value = false)
        demoStore.setParameterValueForEndpoint('/api/stationBoard', 'id', value)
        demoStore.setParameterValueForEndpoint('/api/stationBoard', 'limit', 8)
    }
});

watch(() => selectedStation.value, async (value) => {
    demoStore.setParameterValueForEndpoint('/api/locationInformation', 'locationName', value)
    demoStore.setParameterValueForEndpoint('/api/stationBoard', 'station', value)
});

onMounted(() => {
    demoStore.initializeSwaggerDoc();
})

function getEndpoint(endpointPath: string): SwaggerEndpoint | null {
    return swaggerStore.swaggerJSON?.find(endpoint => endpoint.path === endpointPath) ?? null;
}

</script>

<template>
    <DemoLayout :showDevMode>
        <template #main>
            <div class="flex flex-col items-center">
                <DevModeToggle :checked="showDevMode" toggleLabel="Developer Mode"
                               @checked="showDevMode = !showDevMode"/>
                <DevModeStep :dev-mode=false :step-nr=1>
                    <div class="p-[1rem]">
                        <DemoTimeTableSelect v-model:lir="selectedLIR"
                                             v-model:station="selectedStation"></DemoTimeTableSelect>
                    </div>
                </DevModeStep>
                <DevModeStep :dev-mode=false :step-nr=2>
                    <div v-if="loading" class="flex content-center justify-center">
                        <p class="italic">loading Station Board...</p>
                    </div>
                    <div v-else>
                        <div v-if="stationBoard" class="p-[1rem]">
                            <DemoTimeTableConnections v-if="stationBoard.stationBoard.length > 0"
                                                      :connections="stationBoard?.stationBoard"/>
                            <div v-else>
                                <p>No Station Board for this Destination</p>
                            </div>
                        </div>
                    </div>
                </DevModeStep>
            </div>
        </template>
        <template #devMode>
            <DevModeToggle id="devMode_toggle" :checked="showDevMode" toggleLabel="Developer Mode"
                           @checked="showDevMode = !showDevMode"/>
            <div class="flex flex-col gap-6">
                <h3 class="font-bold ml-[1rem]">Developer Mode</h3>
                <DemoLayoutButton class="demo_layout-button" @click="showDevMode = !showDevMode"/>
                <DevModeStep :devMode=true :stepNr=1>
                    <Endpoint v-if="getEndpoint('/api/locationInformation') !== null"
                              :endpoint="getEndpoint('/api/locationInformation')!"/>
                </DevModeStep>
                <DevModeStep :devMode=true :stepNr=2>
                    <Endpoint v-if="getEndpoint('/api/stationBoard') !== null"
                              :endpoint="getEndpoint('/api/stationBoard')!"/>
                </DevModeStep>
            </div>
        </template>
    </DemoLayout>
</template>

<style scoped lang="scss">
@import "src/assets/scss/variables";

#devMode_toggle {
    display: none;
}

.demo_layout-button {
    position: absolute;
    z-index: 1000;
    top: 50%;
    left: -25px;
    cursor: pointer;
}

@media #{$media-query-l} {
    .demo_layout-button {
        display: none;
    }

    #devMode_toggle {
        display: flex;
    }
}

</style>