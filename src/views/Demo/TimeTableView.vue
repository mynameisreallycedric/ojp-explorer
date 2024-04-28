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
import DemoTimeTableSelect from "@/components/Demo/TimeTable/DemoTimeTableSelect.vue";

const stopEvents = ref<StopEvent>();

const station = ref("");

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
      <div class="flex flex-col items-center mt-3">
        <DevModeToggle toggleLabel="Developer Mode" @checked="showDevMode = !showDevMode" />
        <DemoTimeTableSelect v-model="selectedDiDok"></DemoTimeTableSelect>
        {{ selectedDiDok }}
        <div v-for="connection in stopEvents?.connections as Connection[]">
          <DemoTimeTableConnection v-if="connection.info" :connection="connection" />
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