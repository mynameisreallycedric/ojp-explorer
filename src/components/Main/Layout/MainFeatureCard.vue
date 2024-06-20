<script setup lang="ts">
interface Props {
  iconUrl: string
  title: string
  text: string
}

const props = defineProps<Props>();
</script>

<template>
  <div class="flex flex-row">
    <img :src="iconUrl" height="45px" width="45px">
    <div class="flex flex-col">
      <h3>{{ title }}</h3>
      <p>{{ text }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>