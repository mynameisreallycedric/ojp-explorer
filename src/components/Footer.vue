<script setup lang="ts">
import {Separator} from "@/components/ui/separator";
import {useI18n} from "vue-i18n";
import {useUiStore} from "@/stores/ui";

const i18n = useI18n();

</script>

<template>
    <div class="py-3">
        <div class="flex h-5 items-center space-x-3 text-sm">

            <template v-for="(locale, index) in i18n.availableLocales" :key="index">
                <div class="uppercase cursor-pointer hover:underline"
                     :class="{'font-bold underline': locale == i18n.locale.value}" @click="changeLocale(locale)">
                    {{ locale.slice(0, locale.indexOf('-')) }}
                </div>
                <Separator v-if="index < i18n.availableLocales.length - 1" orientation="vertical"/>
            </template>

        </div>
    </div>
</template>

<style scoped lang="scss">

</style>