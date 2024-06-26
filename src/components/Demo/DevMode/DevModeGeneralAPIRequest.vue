<script setup lang="ts">
import type {APIMethods} from "@/types/DevMode/APIMethods";
import {computed, onMounted, type Ref, ref, watch} from "vue";
import type {SwaggerParams} from "@/types/SwaggerModels";
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import {InputType} from "@/types/DevMode/InputType";
import EndpointRequestParamInput from "@/components/EndpointRequestParamInput.vue";

interface Props {
    method: APIMethods
    placeholder: string | undefined
    parameters: SwaggerParams[] | undefined
    endpoint: string
    response: string | undefined
}

const baseUrl = import.meta.env.VITE_API_BASEURL as string;
const userInputParameterValues = defineModel();
const copiedToClipBoard = ref(false);

const fullURL = computed(() => {
    let paramChain = "";
    if (props.parameters) {
        for (let i = 0; i < props.parameters.length; i++) {
            const chainChar = paramChain.includes('?') ? '&' : '?';
            if (userInputParameterValues.value[props.parameters[i].name].value) {
                paramChain += chainChar + props.parameters[i].name + "=" + userInputParameterValues.value[props.parameters[i].name].value
            } else {
                if (props.parameters[i].value) {
                    paramChain += chainChar + props.parameters[i].name + "=" + props.parameters[i].value
                }
            }
        }
    }
    return baseUrl + props.endpoint + paramChain;
});

function getInputType(param: SwaggerParams): InputType {
    switch (param.schema.type) {
        case 'integer':
            return InputType.Number;
        case 'string':
            if (param.name === 'datetime') {
                return InputType.DateTime;
            } else {
                return InputType.String;
            }
        default:
            return InputType.String;
    }
}

async function copyToClipBoard() {
    await navigator.clipboard.writeText(fullURL.value);
    copiedToClipBoard.value = true;
    setTimeout(() => {
        copiedToClipBoard.value = false;
    }, 2000); // Restore URL after 2 seconds
}

defineEmits(['send']);
const props = defineProps<Props>();
</script>

<template>
    <div class="border border-black rounded">
        <!-- Request Bar -->
        <div class="flex flex-row gap-1.5 w-full items-center border-b border-black p-1.5">
            <div class="flex-grow-0 p-1 bg-black text-white rounded">
                <span class="text-center font-bold px-2">{{ method }}</span>
            </div>
            <p class="flex-grow m-0 p-0 max-w-full text-nowrap overflow-x-auto">
                <span class="italic" v-if="copiedToClipBoard">copied to Clipboard!</span>
                <span v-else>{{ fullURL }}</span>
            </p>
            <div class="flex-grow-0 flex flex-row items-center gap-1.5">
                <button title="send request" class="api-request__button"
                        @click="$emit('send', userInputParameterValues)">
                    <img src="/src/assets/icons/paperplane.svg" width="21" height="21">
                </button>
                <button title="copy full URL to clipboard" class="api-request__button" @click="copyToClipBoard">
                    <img src="/src/assets/icons/copy.svg" width="20" height="20">
                </button>
            </div>
        </div>
        <!-- Parameters -->
        <div class="flex flex-col w-full p-1.5">
            <p class="font-bold">Required Parameters</p>
            <div v-for="parameter in parameters" class="grid grid-cols-[1fr_1fr_1fr] ">
                <div class="flex flex-col">
                    <div>
                        <span class="font-bold">{{ parameter.name }}</span>
                        <span v-if="parameter.required !== undefined && parameter.required" class="text-red-500">*</span>
                        <span class="api-parameters__text-type ml-2">{{ parameter.schema.type }}</span>
                    </div>
                    <p v-if="parameter.description !== undefined">
                        {{ parameter.description }}
                    </p>
                </div>
                <EndpointRequestParamInput :type="getInputType(parameter)" :required="parameter.required"
                                   v-model="userInputParameterValues[parameter.name].value" />
            </div>
        </div>
    </div>

    <!-- Response -->
    <div v-if="response" class="api_response__container">
        <p class="font-bold mr-auto mb-0">Response</p>
        <div class="api_response__response">
            <vue-json-pretty :data="response"></vue-json-pretty>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "src/assets/scss/variables";

.api_response__container {
    width: 100%;
}

.api-request__button:hover {
    filter: brightness(3);
}

.api_response__response {
    border: 1px solid $pt-main-black;
    border-radius: 5px;
    background: $pt-main-light-gray;
    padding: 5px 10px 5px 5px;
    margin: 0.5rem 0 0.5rem 0;
    max-height: 200px;
    overflow-y: scroll;

    font-family: "Inter";
    tab-size: 3;
}


.api-parameters__text-type {
    color: $pt-purple;
}

</style>