<script setup lang="ts">
import MainNavBar from "@/components/Main/Layout/MainNavBar.vue";
import {useSwaggerStore} from "@/stores/swagger";
import {onMounted} from "vue";

const swaggerStore = useSwaggerStore();

onMounted(() => {
    swaggerStore.fetchSwaggerJSON();
})
</script>

<template>
    <div class="flex flex-col items-center">
        <main class="w-full 2xl:w-2/3 max-w-7xl">
            <MainNavBar />
            <RouterView />
        </main>
    </div>
</template>

<style scoped lang="scss">
@import "src/assets/scss/variables";

.token-input {
    border: 1px solid $pt-main-black;
    border-radius: 5px;
    padding: 9px;
}
</style>
