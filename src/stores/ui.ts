import {defineStore} from "pinia";
import type {AxiosCustomError} from "@/composables/services/axios";

export const useUiStore = defineStore('auth', {
    state: () => ({
    axiosError: null as AxiosCustomError | null
}),
    getters: {

    },
    actions: {

    }
})