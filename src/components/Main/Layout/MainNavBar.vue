<script setup lang="ts">
import APITokenButton from "@/components/Main/APITokenButton.vue";
import {computed} from "vue";

const swaggerUrl = computed<string>(() => {
  return import.meta.env.VITE_SWAGGER_BASEURL + '/index.html';
})

</script>

<template>
  <nav class="flex w-full justify-between my-2 main-nav">
    <div class="flex flex-row gap-6">
      <RouterLink class="nav__primary-links" to="/"><p>OJP Explorer 🚂</p></RouterLink>
      <RouterLink class="nav__secondary-links" to="/gettingstarted"><p>Getting Started</p></RouterLink>
      <RouterLink class="nav__secondary-links" to="/doc/locationInformation"><p>Doc</p></RouterLink>
      <RouterLink class="nav__secondary-links" to="/demo/timetable"><p>Demo</p></RouterLink>
    </div>
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

.nav__secondary-links {
  font-size: 1.5rem;
}

.nav__primary-links {
  font-size: 1.5rem;
  font-family: "Inter Bold";
}

</style>