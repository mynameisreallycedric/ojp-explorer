import type {SwaggerEndpoint, SwaggerMethod, SwaggerResponse} from "@/types/SwaggerModels";

export class SwaggerHelper {
    public swaggerJsonToModel(response: any): SwaggerEndpoint[] {
        return Object.keys(response.paths).map(path => {
            const methods = Object.keys(response.paths[path]).map(method => ({
                name: method,
                parameters: response.paths[path][method].parameters || [],
                responses: Object.entries(response.paths[path][method].responses || {}).map(([code, res]) => ({
                    code: Number(code),
                    description: res.description
                }))
            } as SwaggerMethod));

            return {
                path,
                methods
            } as SwaggerEndpoint;
        });
    }
}

const instance = new SwaggerHelper();

export default function useSwaggerHelper(): SwaggerHelper {
    return instance;
}