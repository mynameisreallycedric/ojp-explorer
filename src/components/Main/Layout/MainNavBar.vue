<script setup lang="ts">
import APITokenButton from "@/components/Main/APITokenButton.vue";
import {computed} from "vue";

const swaggerUrl = computed<string>(() => {
  return import.meta.env.VITE_SWAGGER_BASEURL + '/index.html';
})

</script>

<template>
  <nav class="flex w-full justify-between my-2 main-nav">
    <RouterLink to="/"><h3>OJP Explorer 🚂</h3></RouterLink>
    <div class="inline-flex flex-row items-baseline gap-4">
      <a :href="swaggerUrl" target="_blank">Go To Swagger</a>
      <APITokenButton />
    </div>
  </nav>
</template>

<style scoped lang="scss">
@import "src/assets/scss/variables";

.main-nav {
  padding: 0.5rem 0 0.5rem 0;
  border-bottom: 2px solid $pt-main-light-gray;
}
</style>