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
      <div class="flex flex-col text-center mb-10">
        <h1>Your One Way stop to get all relevant data for swiss public transport</h1>
        <div class="flex justify-center mt-4">
          <PrimaryButton @click="$router.push('/gettingstarted')" text="get started"></PrimaryButton>
        </div>
      </div>
      <div class="flex flex-col text-center">
        <h3>features</h3>
      </div>
      <div class="flex flex-col justify-center gap-4">
        <MainFeatureCard title="location information"
                         icon-url="/src/assets/icons/gps.svg"
                         text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                         link="/doc/locationInformation"/>
        <MainFeatureCard title="station board"
                         icon-url="/src/assets/icons/timetable.svg"
                         text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                         link="/doc/stationBoard"/>
      </div>
      <div class="mt-6">
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        </p>
      </div>
    </div>
</template>
