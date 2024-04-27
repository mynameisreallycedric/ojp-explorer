<script setup lang="ts">
import useStopEvent from "@/compopsables/services/stopEvent";
import {computed, type ComputedRef, onMounted, type Ref, ref, watch} from "vue";
import type {StopEvent} from "@/types/StopEvent";
import type {Connection} from "@/types/Connection";
import DemoTimeTableInput from "@/components/Demo/TimeTable/DemoTimeTableInput.vue";
import DemoTimeTableConnection from "@/components/Demo/TimeTable/DemoTimeTableConnection.vue";
import DevModeToggle from "@/components/Demo/DevMode/DevModeToggle.vue";
import DemoLayout from "@/components/Demo/Layout/DemoLayout.vue";
import type {DiDok} from "@/types/DiDok";
import useDiDokEvent from "@/compopsables/services/didok";

const stopEvents = ref<StopEvent>();

const station = ref("");

const showDevMode = ref(false);

const diDok = ref<DiDok>();

function getDiDok(inputString: string): void {
    useDiDokEvent().getDiDokForLocation(inputString)
        .then(res => {
            diDok.value = res;
        })
}

onMounted(async () => {
  stopEvents.value = await useStopEvent().getStopEventForLocation(8502001);
})

watch(() => station.value, (value) => {
    console.log(value)
    if (value.length > 2) {
        getDiDok(value);
    }
})
</script>

<template>
  <DemoLayout :showDevMode>
    <template #main>
      <div class="flex flex-col items-center mt-3">
        <DevModeToggle toggleLabel="Developer Mode" @checked="showDevMode = !showDevMode" />
        <DemoTimeTableInput v-model="station" @update:model-value="getDiDok"></DemoTimeTableInput>
          {{ diDok }}
        <div v-for="connection in stopEvents?.connections as Connection[]">
          <DemoTimeTableConnection :connection="connection" />
        </div>
      </div>
    </template>
    <template #devMode>
      <DemoTimeTableInput v-model="station"></DemoTimeTableInput>
    </template>
  </DemoLayout>
</template>

<style scoped>

</style>