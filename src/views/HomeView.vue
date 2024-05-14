<script setup lang="ts">
import {onMounted, ref} from "vue";
import useSwaggerService from "@/composables/services/swagger";
import type {SwaggerEndpoint} from "@/types/SwaggerModels";
import APITokenButton from "@/components/Main/APITokenButton.vue";

const swaggerService = useSwaggerService();

const loading = ref<boolean>(false);
const endpoints = ref<SwaggerEndpoint[]>([]);

onMounted(() => {
    loading.value = true;
    swaggerService.getSwaggerJson()
        .then(res => endpoints.value = res)
        .finally(() => loading.value = false);
})

</script>

<template>
    <main class="wrapper">
        <h1>OJP Explorer 🚂</h1>
        <RouterLink to="/demo/timetable">TimeTable</RouterLink>

       <hr class="mt-3"/>
        <h3>Available endpoints (from swagger)</h3>
        <div v-if="!loading" class="flex flex-col gap-3">
            <div v-for="endpoint in endpoints" :key="endpoint.path">
                <div v-for="mehtod in endpoint.methods" :key="mehtod.name" class="flex flex-row items-center gap-2">
                    <div class="flex flex-row items-center gap-2">
                        <div class="py-1 px-3 border-2 uppercase">{{ mehtod.name }}</div>
                        <pre>{{ endpoint.path }}</pre>
                    </div>
                </div>
            </div>
        </div>
        <template v-else>
            <span>loading</span>
        </template>

    </main>
</template>
