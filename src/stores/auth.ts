import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const useAuthStore = defineStore('auth', {
    persist: {
        paths: ['ojpToken']
    },
    state: () => ({
    ojpToken: null
}),
    getters: {

    },
    actions: {

    }
})