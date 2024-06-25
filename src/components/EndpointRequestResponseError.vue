<script setup lang="ts">
import {type PropType, ref} from "vue";
import type {AxiosCustomError} from "@/composables/services/axios";
import {Button} from "@/components/ui/button";
import {useI18n} from "vue-i18n";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

const {t} = useI18n();

const props = defineProps({
    error: {type: Object as PropType<AxiosCustomError>, required: true}
})

const showDetails = ref<boolean>(false);

function openContact(): void {
    window.open('https://opentransportdata.swiss/en/contact/', '_blank');
}
</script>

<template>
    <div class="flex flex-row items-center gap-3">
        <div class="flex flex-col items-center border border-red-500 rounded py-1 px-3">
            <span>{{ error.httpStatus }}</span>
            <span class="font-light text-xs">{{ error.httpStatusText }}</span>
        </div>
        <div class="flex flex-col">
            <span>{{ error.canonicalErrorMsg }}</span>
            <span class="font-light text-xs">{{ error.errorMessage }}</span>
        </div>
        <div class="flex-grow flex justify-end">
            <Button @click="showDetails = true" variant="link" class="text-red-500">{{ t('action.details') }}</Button>
        </div>
    </div>

    <Dialog v-model:open="showDetails">
        <DialogContent class="min-w-fit">
            <DialogHeader>
                <DialogTitle>{{ error.httpStatusText }}: {{ error.errorMessage }}</DialogTitle>
                <DialogDescription v-if="error.response !== null">
                    <span class="code-block">{{ error.response }}</span>
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button @click="openContact" variant="ghost">{{ t('action.contactSki') }}</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<style scoped lang="scss">

</style>