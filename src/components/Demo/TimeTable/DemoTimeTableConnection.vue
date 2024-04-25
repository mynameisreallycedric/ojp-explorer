<script setup lang="ts">
import type {Connection} from "@/types/Connection";

interface Props {
  connection: Connection
}

const props = defineProps<Props>();
</script>

<template>
  <div class="grid grid-cols-[80px_80px_1fr_1fr_50px] timetable_connection items-center">
    <div>
      <p class="border-solid border border-black p-1 w-min rounded" >{{ connection.info.lineName }}</p>
    </div>
    <p>{{ new Date(connection.thisStop.departureTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}}</p>
    <p>{{ connection.info.destination }}</p>
    <p>{{ connection.info.origin }}</p>
    <p>{{ connection.thisStop.quay }}</p>
  </div>
</template>

<style scoped lang="scss">
@import "src/assets/scss/variables";

.timetable_connection {
  width: 600px;
  margin: 1rem;
  border: 1px solid $pt-main-black;
  border-radius: 5px;
  padding: 5px ;

  p {
    margin: 0;
  }

}

</style>