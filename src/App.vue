<script setup lang="ts">
    import {computed} from "vue";
    import {useAuthStore} from "@/stores/auth";
    import {useUiStore} from "@/stores/ui";

    const authStore = useAuthStore();
    const uiStore = useUiStore();

    const swaggerUrl = computed<string>(() => {
        return import.meta.env.VITE_SWAGGER_BASEURL + '/index.html';
    })
</script>

<template>
    <div class="wrapper flex flex-col">
        <div v-if="uiStore.axiosError !== undefined && uiStore.axiosError !== null" class="bg-red-600 text-white">
            {{ uiStore.axiosError.canonicalErrorMsg }}
        </div>
        <main class="grow flex">
            <RouterView/>
        </main>
        <footer class="flex flex-row justify-between items-center">
            <a :href="swaggerUrl" target="_blank">Go To Swagger</a>
            <input class="token-input" type="text" v-model="authStore.ojpToken" placeholder="ojp-token" />
        </footer>
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
