<script setup lang="ts">
import type {APIMethods} from "@/types/DevMode/APIMethods";

interface Props {
  title: string
  link: string
}

const props = defineProps<Props>();
</script>

<template>
  <RouterLink :to="link">
    <div class="hero-bubble_container">
      <span class="hero-bubble_title">
          <h2>{{ title }}</h2>
          <img src="/src/assets/icons/arrow_right.svg" height="40" width="40" />
        </span>
    </div>
  </RouterLink>
</template>

<style scoped lang="scss">
@import "src/assets/scss/variables";

  .hero-bubble_container {
    width: 1000px;
    height: 500px;
    background: $pt-main-gray;
    border-radius: 25px;
    margin: 2rem;
    display: flex;
  }

  .hero-bubble_title {
    margin: auto 0 0 1.5rem;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }
</style>