<script setup lang="ts">
interface Props {
  activeLink: string
}

const props = defineProps<Props>();
</script>

<template>
  <div class="doc__container">
    <nav class="sticky top-4 py-10 px-8 flex flex-col doc__sidebar">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink :class="{ 'sidebar__active-link': props.activeLink === 'gettingStarted' }" to="/gettingstarted">Getting Started</RouterLink>
      <span class="sidebar__section-title">Endpoints</span>
        <RouterLink :class="{ 'sidebar__active-link': props.activeLink === 'locationInformation' }" to="/doc/locationInformation">/locationInformation</RouterLink>
        <RouterLink :class="{ 'sidebar__active-link': props.activeLink === 'stationBoard' }" to="/doc/stationBoard">/stationBoard</RouterLink>
      <span class="sidebar__section-title">Background</span>
      <RouterLink to="/doc/locationInformation">Open journey platform</RouterLink>
      <RouterLink to="/doc/stationBoard">Transport Proxy</RouterLink>
    </nav>
  </div>
  <slot />
</template>

<style scoped lang="scss">
@import "src/assets/scss/variables";

.doc__container{
  position: absolute;
  height: 100%;
  color: $pt-main-dark-gray;
}

.sidebar__section-title{
  color: $pt-main-black;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  font-family: "Inter Bold";
  letter-spacing: 2.5px;
}

.doc__sidebar {
  //border: 1px solid $pt-main-black;
  border-radius: 5px;
  background: $pt-main-light-gray ;
}

.sidebar__active-link {
  color: $pt-main-black;
}



</style>