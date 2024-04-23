<script setup lang="ts">
import useStopEvent from "@/compopsables/services/stopEvent";
import {onMounted, type Ref, ref} from "vue";
import type {StopEvent} from "@/types/StopEvent";

const stopEvents = ref<StopEvent | undefined>(undefined);

onMounted(async () => {
  // Fetch the stop event and assign the result to stopEvents
  stopEvents.value = await useStopEvent().getStopEventForLocation(8502001);

  // Now stopEvents.value will be updated with the fetched data
  console.log(stopEvents.value);
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
