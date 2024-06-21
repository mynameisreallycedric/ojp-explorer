<script setup lang="ts">

import DocNav from "@/components/Doc/DocNav.vue";
import {useRouter} from "vue-router";

const router = useRouter();
</script>

<template>
    <div class="flex flex-col md:flex-row">
        <aside class="mb-10">
            <DocNav />
        </aside>
        <div class="flex flex-col gap-20 mx-6 md:mr-0">
            <h1>{{ router.currentRoute.value.name }}</h1>
            <RouterView />
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>