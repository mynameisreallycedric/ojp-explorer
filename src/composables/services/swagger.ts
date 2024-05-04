import {useAxios} from "@/composables/services/axios";
import useSwaggerHelper from "@/composables/helpers/swagger";
import type {SwaggerEndpoint} from "@/types/SwaggerModels";

export class SwaggerService {
    private static swaggerJsonUrl = import.meta.env.VITE_SWAGGER_BASEURL + '/v1/swagger.json';

    public async getSwaggerJson(): Promise<SwaggerEndpoint[]> {
        try {
            const res = await useAxios().get('', {baseURL: SwaggerService.swaggerJsonUrl});
            return useSwaggerHelper().swaggerJsonToModel(res.data);
        } catch (error) {
            console.error('Error fetching Swagger JSON:', error);
            throw error;
        }
    }
}

const instance = new SwaggerService();

export default function useSwaggerService(): SwaggerService {
    return instance;
}