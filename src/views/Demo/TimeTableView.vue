<script setup lang="ts">
import useStopEvent from "@/compopsables/services/stopEvent";
import {onMounted, type Ref, ref} from "vue";
import type {StopEvent} from "@/types/StopEvent";
import type {Connection} from "@/types/Connection";

const stopEvents = ref<StopEvent>();

onMounted(async () => {
  stopEvents.value = await useStopEvent().getStopEventForLocation(8502001);
})
</script>

<template>
  <div v-for="connection in stopEvents?.connections as Connection[]">
    <h1>{{ connection.info.day }}</h1>
    <p>{{ connection.info.destination }}</p>
    <p>{{ connection.info.origin }}</p>
    <p>{{ connection.info.connectionType }}</p>
  </div>
</template>

<style scoped>

</style>