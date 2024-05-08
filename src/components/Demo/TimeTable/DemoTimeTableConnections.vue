<script setup lang="ts">
import type {Connection} from "@/types/Connection";
import type {StationBoard} from "@/types/StationBoard";

interface Props {
  connections: Connection[]
}

const props = defineProps<Props>();
</script>

<template>
  <table class="w-full text-left">
    <thead>
    <tr>
      <th>Linie</th>
      <th>Zeit</th>
      <th>Von</th>
      <th class="text-right">Gleis/Kante</th>
    </tr>
    </thead>
  <tbody>
    <tr v-for="connection in connections">
      <td>
        <div class="timetable_connection__line">
          {{ connection.name }}
        </div>
      </td>
      <td>{{ new Date(connection.stop.departure).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}}</td>
      <td>{{ connection.to }}</td>
      <td class="text-right">{{ connection.stop.platform}}</td>
    </tr>
  </tbody>
  </table>
</template>

<style scoped lang="scss">
@import "src/assets/scss/variables";

.timetable_connection__line {
  border: 1px $pt-main-black solid;
  border-radius: 5px;
  display: inline-flex;
  padding: 5px 10px 5px 10px;
}

table {
  border-collapse: separate;
  border-spacing: 0 1rem;
}

tbody tr {
  border-radius: 5px;
  border-spacing: 1rem;
  outline: 1px $pt-main-black solid;
}

td:first-child {
  border-radius: 5px 0 0 5px;
}

td:last-child {
  border-radius: 0 5px 5px 0;
}

td {
  padding: 0.5rem;
}

th {
  padding-left: 0.5rem;
}

</style>