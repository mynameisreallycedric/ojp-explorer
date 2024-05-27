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

const stationBoardService = useStationBoardService();

const loading = ref<boolean>(false);
const stationBoard = ref<StationBoard>();
const errorMessage = ref<string | null>(null);

const selectedStation = ref("");

const showDevMode = ref(false);

const selectedLIR = ref<string>();

const demoStore = useDemoPageStore();
const { getParametersForEndpoint } = storeToRefs(demoStore);

const paramsLIR = computed(() => demoStore.getQueryParametersForEndpoint('/api/locationInformation'));
const paramsSB = computed(() => demoStore.getQueryParametersForEndpoint('/api/stationBoard'));

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
                <DevModeToggle :checked="showDevMode" toggleLabel="Developer Mode" @checked="showDevMode = !showDevMode"/>
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
          <DevModeToggle id="devMode_toggle" :checked="showDevMode" toggleLabel="Developer Mode" @checked="showDevMode = !showDevMode"/>
          <h3 class="font-bold pl-[2rem]">Developer Mode</h3>
          <DemoLayoutButton class="demo_layout-button" @click="showDevMode = !showDevMode"/>
            <DevModeStep :devMode=true :stepNr=1>
                <div class="flex flex-col items-center p-[2rem]">
                    <DemoTimeTableSelect v-model:lir="selectedLIR"
                                         v-model:station="selectedStation"></DemoTimeTableSelect>
                  <DevModeLIRRequest :parameters="paramsLIR"/>
                </div>
            </DevModeStep>
            <DevModeStep :devMode=true :stepNr=2>
                <div class="flex flex-col items-center p-[2rem]">
                    <DevModeStationBoardRequest  :parameters="paramsSB"/>
                </div>
            </DevModeStep>
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