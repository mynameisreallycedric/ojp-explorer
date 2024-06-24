<script setup lang="ts">
import APITokenButton from "@/components/Main/APITokenButton.vue";
import GettingStartedStep from "@/components/GettingStartedStep.vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n();

</script>

<template>
    <p>
        This Guide will help you to make the first steps using the OJP-Service.
    </p>

    <GettingStartedStep :step="1" :title="t('docsGettingStarted.step1.title')">
        <p>
            <i18n-t keypath="docsGettingStarted.step1.description">
                <template v-slot:link>
                    <a style="text-decoration: underline" href="https://opentransportdata.swiss/en/dev-dashboard/">OJP-Developer Portal</a>
                </template>
            </i18n-t>
        </p>
        <APITokenButton/>
    </GettingStartedStep>

    <GettingStartedStep :step="2" :title="t('docsGettingStarted.step2.title')" endpoint-path="/api/locationInformation">
        <p>{{ t('docsGettingStarted.step2.description') }}</p>
    </GettingStartedStep>

    <GettingStartedStep :step="3" :title="t('docsGettingStarted.step3.title')" endpoint-path="/api/stationBoard">
        <p>{{ t('docsGettingStarted.step3.description') }}</p>
    </GettingStartedStep>

    <GettingStartedStep :step="4" :title="t('docsGettingStarted.step4.title')" endpoint-path="/api/tripRequest">
        <p>{{ t('docsGettingStarted.step4.description') }}</p>
    </GettingStartedStep>
</template>

<style scoped lang="scss">

</style>