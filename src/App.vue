<script setup lang="ts">
    import {computed} from "vue";
    import {useAuthStore} from "@/stores/auth";
    import {useUiStore} from "@/stores/ui";
    import MainNavBar from "@/components/Main/Layout/MainNavBar.vue";
</script>

<template>
 <div class="wrapper flex flex-col">
        <MainNavBar />
        <main class="grow flex">
            <RouterView/>
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
