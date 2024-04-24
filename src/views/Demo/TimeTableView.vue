<script setup lang="ts">
import useStopEvent from "@/compopsables/services/stopEvent";
import {onMounted, type Ref, ref} from "vue";
import type {StopEvent} from "@/types/StopEvent";
import type {Connection} from "@/types/Connection";
import DemoTimeTableInput from "@/components/Demo/TimeTable/DemoTimeTableInput.vue";

const stopEvents = ref<StopEvent>();

onMounted(async () => {
  stopEvents.value = await useStopEvent().getStopEventForLocation(8502001);
})
</script>

<template>
  <div v-for="connection in stopEvents?.connections as Connection[]">
    <DemoTimeTableInput :connection="connection" />
  </div>
</template>

<style scoped>

</style>