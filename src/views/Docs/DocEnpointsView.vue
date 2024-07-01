<script setup lang="ts">
import {useSwaggerStore} from "@/stores/swagger";
import Endpoint from "@/components/Endpoint.vue";

const swaggerStore = useSwaggerStore();

</script>

<template>
    <div v-for="endpoint in swaggerStore.swaggerJSON" :key="endpoint.path" :id="endpoint.path">
        <Endpoint :endpoint="endpoint" show-description show-name/>
    </div>
</template>

<style scoped lang="scss">

</style>