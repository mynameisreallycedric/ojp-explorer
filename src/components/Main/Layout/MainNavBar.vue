<script setup lang="ts">
import APITokenButton from "@/components/Main/APITokenButton.vue";
import {computed} from "vue";

const swaggerUrl = computed<string>(() => {
  return import.meta.env.VITE_SWAGGER_BASEURL + '/index.html';
})

</script>

<template>
  <nav class="flex w-full justify-between my-2">
    <h3>OJP Explorer</h3>
    <div class="inline-flex flex-row items-baseline gap-4">
      <a :href="swaggerUrl" target="_blank">Go To Swagger</a>
      <APITokenButton />
    </div>
  </nav>
</template>

<style scoped lang="scss">

</style>