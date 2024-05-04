export interface SwaggerEndpoint {
    path: string;
    methods: SwaggerMethod[];
}

export interface SwaggerMethod {
    name: string;
    parameters: SwaggerParams[];
    responses: SwaggerResponse[];
}

export interface SwaggerParams {
    name: string;
    in: string;
    style: string;
    schema: SwaggerSchema;
}

export interface SwaggerSchema {
    type: string;
    format: string | null;
}

export interface SwaggerResponse {
    code: number;
    description: string;
}