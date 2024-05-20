import {defineStore} from "pinia";

interface Endpoint {
    endpoint: string
    parameters: { [key: string]: any };
}

interface State {
    activeStep: number
    endpoints: Endpoint[];
}


export const useDemoPageStore = defineStore('demo', {
    state: (): State => ({
        activeStep: 0,
        endpoints: []
    }),
    getters: {
        getCurrentActiveStep(state): number{
            return state.activeStep;
        },
        getParametersForEndpoint(state): { [key: string]: any } | undefined {
            return (endpoint: string) => {
                const found = state.endpoints.find(e => e.endpoint === endpoint);
                return found ? found.parameters : undefined;
            };
        }
    },
    actions: {
        setCurrentActiveStep(stepNr: number): void{
            this.activeStep = stepNr;
        },
        setParametersForEndpoint(endpoint: string, params: { [key: string]: any }): void {
            const existingEndpoint = this.endpoints.find(e => e.endpoint === endpoint);
            if (existingEndpoint) {
                existingEndpoint.parameters = { ...existingEndpoint.parameters, ...params };
            } else {
                this.endpoints.push({ endpoint, parameters: params });
            }
        }
    }
});