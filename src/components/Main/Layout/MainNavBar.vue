<script setup lang="ts">
import APITokenButton from "@/components/Main/APITokenButton.vue";
import {computed} from "vue";
import {RouteNames} from "@/types/RouteNames";

const swaggerUrl = computed<string>(() => {
    return import.meta.env.VITE_SWAGGER_BASEURL + '/index.html';
})

</script>

<template>
    <nav class="flex w-full justify-between py-2 mb-6 main-nav sticky">
        <div class="flex items-center flex-row gap-6">
            <RouterLink class="nav__primary-links" :to="{name: RouteNames.home}"><p>OJP Explorer 🚂</p></RouterLink>
            <RouterLink class="nav__secondary-links" :to="{name: RouteNames.gettingStarted}">Getting Started
            </RouterLink>
            <RouterLink class="nav__secondary-links" :to="{name: RouteNames.doc}">Doc</RouterLink>
            <RouterLink class="nav__secondary-links" :to="{name: RouteNames.timeTable}">Demo</RouterLink>
        </div>
        <div class="inline-flex flex-row items-center gap-4">
            <a :href="swaggerUrl" target="_blank">Go To Swagger</a>
            <APITokenButton/>
        </div>
    </nav>
</template>

<style scoped lang="scss">
@import "src/assets/scss/variables";

.main-nav {
    border-bottom: 2px solid $pt-main-light-gray;

    p {
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