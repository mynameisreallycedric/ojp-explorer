import {defineStore} from "pinia";
import type {AxiosCustomError} from "@/composables/services/axios";
import i18n, {type SupportedLocale} from "@/plugins/i18n";

export const useUiStore = defineStore('ui', {
    persist: {
        paths: ['ui']
    },
    state: () => ({
        axiosError: null as AxiosCustomError | null,
        queriedEndpoint: null as string | null,
        locale: 'en-CH'
    }),
    getters: {},
    actions: {
        async changeLocale(l: string): Promise<void> {
            this.locale = l;
            i18n.global.locale.value = l as SupportedLocale;
        }
    }
})