<script setup lang="ts">
import type {Connection} from "@/types/Connection";

interface Props {
  connection: Connection
}

const props = defineProps<Props>();
</script>

<template>
    <td>
      <div class="timetable_connection__line">
        {{ connection.name }}
      </div>
    </td>
    <td>{{ new Date(connection.stop.departure).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}}</td>
    <td>{{ connection.to }}</td>
    <td>{{ connection.stop.platform}}</td>
</template>

<style scoped lang="scss">
@import "src/assets/scss/variables";

.timetable_connection__line {
  border: 1px $pt-main-black solid;
  border-radius: 5px;
  display: inline-flex;
  padding: 5px 10px 5px 10px;
}

td {
  padding: 0.5rem;
}


</style>