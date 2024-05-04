<script setup lang="ts">
    import {computed} from "vue";

    const swaggerUrl = computed<string>(() => {
        return import.meta.env.VITE_SWAGGER_BASEURL + '/index.html';
    })
</script>

<template>
    <div class="wrapper flex flex-col">
        <main class="grow flex">
            <RouterView/>
        </main>
        <footer>
            <a :href="swaggerUrl" target="_blank">Go To Swagger</a>
        </footer>
    </div>
</template>

<style scoped>


</style>
