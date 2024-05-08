<script setup lang="ts">
import useStopEvent from "@/compopsables/services/stopEvent";
import {ref, watch} from "vue";
import type {StopEvent} from "@/types/StopEvent";
import type {Connection} from "@/types/Connection";
import DemoTimeTableConnection from "@/components/Demo/TimeTable/DemoTimeTableConnection.vue";
import DevModeToggle from "@/components/Demo/DevMode/DevModeToggle.vue";
import DemoLayout from "@/components/Demo/Layout/DemoLayout.vue";
import DemoTimeTableSelect from "@/components/Demo/TimeTable/DemoTimeTableSelect.vue";
import DevModeAPIRequest from "@/components/Demo/DevMode/DevModeAPIRequest.vue";
import {APIMethods} from "@/types/DevMode/APIMethods";
import DevModeStep from "@/components/Demo/DevMode/DevModeStep.vue";

const stopEvents = ref<StopEvent>();

const selectedStation = ref("");

const showDevMode = ref(false);

const selectedDiDok = ref<number>();

watch(() => selectedDiDok.value, async (value) => {
  if (value) {
    stopEvents.value = await useStopEvent().getStopEventForLocation(value);
  }
})
</script>

<template>
  <DemoLayout :showDevMode>
    <template #main>
      <div class="flex flex-col items-center p-[1rem]">
        <DevModeToggle toggleLabel="Developer Mode" @checked="showDevMode = !showDevMode" />
        <DevModeStep :dev-mode=false :step-nr=1>
          <DemoTimeTableSelect v-model:didok="selectedDiDok" v-model:station="selectedStation"></DemoTimeTableSelect>
        </DevModeStep>
        <div class="grid grid-cols-[40px_40px_1fr_1fr_95px] gap-3 w-full font-bold mt-1 [&_p]:m-0">
          <p>Linie</p>
          <p>Zeit</p>
          <p>Von</p>
          <p>Nach</p>
          <p>Gleis / Kante</p>
        </div>
        <div v-for="connection in stopEvents?.connections as Connection[]" class="w-full">
          <DemoTimeTableConnection v-if="connection.info" :connection="connection" />
        </div>
      </div>
    </template>
    <template #devMode>
      <DevModeStep :devMode=true :stepNr=1>
        <div class="flex flex-col items-center w-full p-[1rem]">
          <DemoTimeTableSelect v-model:didok="selectedDiDok" v-model:station="selectedStation"></DemoTimeTableSelect>
          <DevModeAPIRequest :method="APIMethods.GET" endpointUrl="didok/" :station="selectedStation"></DevModeAPIRequest>
        </div>
      </DevModeStep>
    </template>
  </DemoLayout>
</template>

<style scoped>

</style>