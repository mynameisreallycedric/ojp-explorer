import {defineStore} from "pinia";
import {type AxiosCustomError, useAxios} from "@/composables/services/axios";
import useSwaggerHelper from "@/composables/helpers/swagger";
import type {SwaggerEndpoint} from "@/types/SwaggerModels";
import useSwaggerService, {SwaggerService} from "@/composables/services/swagger";

const swaggerService = useSwaggerService();

export const useSwaggerStore = defineStore('swagger', {
    state: () => ({
        swaggerJSON: null as SwaggerEndpoint[] | null
    }),
    getters: {

    },
    actions: {
        async fetchSwaggerJSON(){
            await swaggerService.getSwaggerJson()
                .then(res => this.swaggerJSON = res)
        }
    }
})