<script setup lang="ts">
import APITokenButton from "@/components/Main/APITokenButton.vue";
import {computed} from "vue";

const swaggerUrl = computed<string>(() => {
  return import.meta.env.VITE_SWAGGER_BASEURL + '/index.html';
})

</script>

<template>
  <nav class="flex w-full justify-between py-2 mb-6 main-nav">
    <div class="flex items-center flex-row gap-6">
      <RouterLink class="nav__primary-links" to="/"><p>OJP Explorer 🚂</p></RouterLink>
      <RouterLink class="nav__secondary-links" to="/gettingstarted"><p>Getting Started</p></RouterLink>
      <RouterLink class="nav__secondary-links" to="/doc/locationInformation"><p>Doc</p></RouterLink>
      <RouterLink class="nav__secondary-links" to="/demo/timetable"><p>Demo</p></RouterLink>
    </div>
    <div class="inline-flex flex-row items-center gap-4">
      <a :href="swaggerUrl" target="_blank">Go To Swagger</a>
      <APITokenButton />
    </div>
  </nav>
</template>

<style scoped lang="scss">
@import "src/assets/scss/variables";

.main-nav {
  border-bottom: 2px solid $pt-main-light-gray;

  p{
    margin: 0;
  }
}

.nav__secondary-links {
  font-size: 1rem;
}

.nav__primary-links {
  font-size: 1rem;
  font-family: "Inter Bold";
}

</style>