<script setup lang="ts">

import APITokenButton from "@/components/Main/APITokenButton.vue";
</script>

<template>
  <div class="wrapper">
    <section>
      <h1>GettingStarted</h1>
    </section>

    <section>
      <h2>Get your Key</h2>
      <APITokenButton />
    </section>

    <section>
      <h2>Query Endpoints</h2>
    </section>
  </div>
</template>

<style scoped lang="scss">

section {
  margin-bottom: 5rem;
}

</style>