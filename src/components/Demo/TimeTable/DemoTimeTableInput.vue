<script setup lang="ts">

import type {Connection} from "@/types/Connection";

interface Props {
  connection: Connection
}

const props = defineProps<Props>();


</script>

<template>
  <div class="flex flex-row border-solid justify-between timetable_connection">
    <p>{{ connection.info.lineName }}</p>
    <p>{{ new Date(connection.thisStop.departureTime).toLocaleTimeString() }}</p>
    <p>{{ connection.info.destination }}</p>
    <p>{{ connection.info.origin }}</p>
    <p>{{ connection.thisStop.quay }}</p>
  </div>
</template>

<style scoped>

.timetable_connection {
  width: 600px;
  margin: 2rem;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px ;
}

</style>