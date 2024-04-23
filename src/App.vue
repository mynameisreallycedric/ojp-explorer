<script setup lang="ts">
import useStopEvent from "@/compopsables/services/stopEvent";
import {ref} from "vue";

const stopEvents = ref(useStopEvent().getStopEventForLocation(8502001));

console.log(stopEvents)

</script>

<template>
  <div>
    {{ stopEvents }}
  </div>
</template>

<style scoped>

</style>
