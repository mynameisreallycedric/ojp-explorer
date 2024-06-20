<script setup lang="ts">
import {onMounted, ref} from "vue";
import useSwaggerService from "@/composables/services/swagger";
import type {SwaggerEndpoint} from "@/types/SwaggerModels";
import APITokenButton from "@/components/Main/APITokenButton.vue";
import MainHeroBubble from "@/components/Main/Layout/MainHeroBubble.vue";
import PrimaryButton from "@/components/Main/Controls/PrimaryButton.vue";
import MainFeatureCard from "@/components/Main/Layout/MainFeatureCard.vue";

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
    <div class="wrapper content-wrapper">
      <div class="flex flex-col content-center justify-center text-center">
        <h1>Your One Way stop to get all relevant data for swiss public transport</h1>
        <PrimaryButton text="get started"></PrimaryButton>
      </div>
      <div class="flex flex-col text-center content-center">
        <h3>features</h3>
        <MainFeatureCard title="location information" icon-url="/src/assets/icons/gps.svg" text="sdfsdf" />
      </div>



    </div>
</template>
