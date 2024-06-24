<script setup lang="ts">

import EndpointRequestButton from "@/components/EndpointRequestButton.vue";
import {computed, type PropType, ref, watch} from "vue";
import {useI18n} from "vue-i18n";
import {useAuthStore} from "@/stores/auth";
import type {SwaggerParams} from "@/types/SwaggerModels";

const {t} = useI18n();
const authStore = useAuthStore();

const props = defineProps({
    methodName: {type: String, required: true},
    message: {type: String as PropType<string | null>, default: null},
    loading: {type: Boolean, default: false}
})

const modelValue = defineModel<string>();
const emits = defineEmits(['sent'])

const messageInternal = ref<string | null>(null);

function send(): void {

    if (paramMissing.value.length > 0) {
        if (paramMissing.value.length === 1) {
            validationError.value = 'Param "' + paramMissing.value[0].name + '" is required!';
        } else {
            validationError.value = 'Following params are required: ' + paramMissing.value.map(param => param.name);
        }
        return;
    }

    const targetX = methodBlock.value.getBoundingClientRect().x;
    console.log(targetX)
    const startX = paperPlane.value.getBoundingClientRect().x;
    const deltaX = startX - targetX;

    loading.value = true;
    paperPlane.value.style.display = 'flex';
    paperPlane.value.style.transform = 'rotate(-180deg)';
    paperPlane.value.style.transition = 'right 3s linear';


    setTimeout(() => {
        paperPlane.value.style.right = '35em'
    }, 100);

    axios.get(props.endpoint, {
        params: userInputParameterValues
    })
        .then(res => {
            console.log('res', res);
            response.value = res.data;
        })
        .catch(err => {
            console.log('err', err);
        })
        .finally(() => {
            paperPlane.value.style.transition = 'right 1s linear';
            setTimeout(() => {
                paperPlane.value.style.right = '57em'
            }, 100);
            setTimeout(() => {
                paperPlane.value.style.display = 'none'
                paperPlane.value.style.right = '2.8em'
                methodBlockPop();
                loading.value = false;
            }, 1100);
        });
}

const paramMissing = computed<SwaggerParams[]>(() => {
    const result = [] as SwaggerParams[];
    const requiredParams = relevantParameters.value.filter(param => param.required);
    requiredParams.forEach(param => {
        if (modelValue.value[param.name] === null || userInputParameterValues[param.name].replace(/\s/g, '') === '') result.push(param);
    })
    return result;
})

async function copyToClipBoard(): Promise<void> {
    const curlCmd = `curl --location '${modelValue.value}' --header 'Authorization: Bearer ${authStore.ojpToken}'`;

    await navigator.clipboard.writeText(curlCmd);
    messageInternal.value = curlCmd;
    setTimeout(() => {
        messageInternal.value = null;
    }, 2000);
}

watch(() => props.message, (value) => {
    if (value !== null) messageInternal.value = value;
})
</script>

<template>
    <div class="flex flex-row gap-1.5 w-full rounded-t items-center border-b border-black p-1.5 bg-white relative">

        <div ref="paperPlane" class="align-middle absolute">
            <img src="/src/assets/icons/paperplane.svg" width="21" height="21">
        </div>

        <div ref="methodBlock" class="flex-grow-0 p-1 bg-black text-white rounded">
            <span class="text-center font-bold px-2">{{ methodName.toUpperCase() }}</span>
        </div>
        <div class="flex-grow max-w-full text-nowrap overflow-x-auto">
            <span class="italic" v-if="messageInternal !== null">{{ messageInternal }}</span>
            <span v-else>{{ modelValue }}</span>
        </div>
        <div class="flex-grow-0 flex flex-row items-center gap-3 mr-1.5">

            <Transition>
                <EndpointRequestButton v-if="!loading" :tooltip-msg="t('action.send')"
                                       icon-path="/src/assets/icons/paperplane.svg" @click="send"/>
            </Transition>
            <EndpointRequestButton :tooltip-msg="t('action.curlToClipBoard')" icon-path="/src/assets/icons/copy.svg"
                                   @click="copyToClipBoard"/>

        </div>
    </div>
</template>

<style scoped lang="scss">

</style>