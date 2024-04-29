<script setup lang="ts">
import type {Connection} from "@/types/Connection";

interface Props {
  connection: Connection
}

const props = defineProps<Props>();
</script>

<template>
  <div class="grid grid-cols-[40px_40px_1fr_1fr_95px] gap-3 w-full timetable_connection items-center">
    <div>
      <p class="border-solid border border-black p-1 w-[3rem] text-center rounded" >{{ connection.info.lineName }}</p>
    </div>
    <p>{{ new Date(connection.thisStop.departureTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}}</p>
    <p>{{ connection.info.destination }}</p>
    <p>{{ connection.info.origin }}</p>
    <p class="text-center">{{ connection.thisStop.quay }}</p>
  </div>
</template>

<style scoped lang="scss">
@import "src/assets/scss/variables";

.timetable_connection {
  border: 1px solid $pt-main-black;
  border-radius: 5px;
  padding: 5px 10px 5px 5px;
  margin: 0.5rem 0 0.5rem 0;

  p {
    margin: 0;
  }

}

</style>