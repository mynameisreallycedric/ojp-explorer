<script setup lang="ts">
import useStopEvent from "@/compopsables/services/stopEvent";
import {onMounted, type Ref, ref} from "vue";
import type {StopEvent} from "@/types/StopEvent";

const stopEvents = ref<StopEvent>();

onMounted(async () => {
  stopEvents.value = await useStopEvent().getStopEventForLocation(8502001);
})

console.log(stopEvents)

</script>

<template>
  <div>
    {{ stopEvents }}
  </div>
</template>

<style scoped>

</style>
