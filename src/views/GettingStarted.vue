<script setup lang="ts">
import APITokenButton from "@/components/Main/APITokenButton.vue";
import GettingStartedStep from "@/components/GettingStartedStep.vue";

</script>

<template>
    <p>
        Welcome to the OJP-Explorer documentation!<br>
        This guide will help you get started with accessing and using the API to retrieve data about Swiss
        public transport.
    </p>

    <GettingStartedStep :step="1" title="Get your Key">
        <p>To authenticate your requests, you need an API key. You can obtain an API key by signing up on the
            official OJP-Developer portal.<br>
            You can find the developer portal under the following link:
            <a style="text-decoration: underline" href="https://opentransportdata.swiss/en/dev-dashboard/">OJP-Developer Portal</a>
            <br>
            <br>
            This API key needs to be included in the Authorization header of your HTTP requests.<br>
            <br>
            For all demos on the OJP-Explorer, you can set your API key using the option at the top-right of the
            page. The option is indicated like the following button.
        </p>
        <APITokenButton/>
    </GettingStartedStep>

    <GettingStartedStep :step="2" title="Retrieve StationRef identifier" endpoint-path="/api/locationInformation">
        <p>TBD</p>
    </GettingStartedStep>

    <GettingStartedStep :step="3" title="Fetch the Stationboard" endpoint-path="/api/stationBoard">
        <p>TBD</p>
    </GettingStartedStep>

    <GettingStartedStep :step="4" title="Do a TripRequest" endpoint-path="/api/tripRequest">
        <p>TBD</p>
    </GettingStartedStep>
</template>

<style scoped lang="scss">

section {
    margin-bottom: 5rem;
    display: flex;
    flex-direction: column;
}

h3 {
    margin-top: 2rem;
}
</style>