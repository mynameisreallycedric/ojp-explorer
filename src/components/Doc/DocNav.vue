<script setup lang="ts">
import {RouteNames} from "@/types/RouteNames";
import {useSwaggerStore} from "@/stores/swagger";

const swaggerStore = useSwaggerStore();
</script>

<template>
    <nav class="sticky top-4 py-10 px-8 flex flex-col gap-2 doc__sidebar">
        <RouterLink :to="{name: RouteNames.docsIntroduction}">Introduction</RouterLink>
        <RouterLink :to="{name: RouteNames.docsGettingStarted}">Getting Started</RouterLink>
        <span class="sidebar__section-title">Endpoints</span>
        <template v-for="endpoint in swaggerStore.swaggerJSON" :key="endpoint.path">
            <RouterLink :to="{name: RouteNames.docsEndpoints, hash: '#' + endpoint.path}">{{ endpoint.path }}</RouterLink>
        </template>
        <span class="sidebar__section-title">Background</span>
        <RouterLink to="#">Open journey platform</RouterLink>
        <RouterLink to="#">Transport Proxy</RouterLink>
    </nav>
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