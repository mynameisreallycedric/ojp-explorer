import {defineStore} from "pinia";
import type {APIParameters} from "@/types/DevMode/APIParameters";

interface Endpoint {
    endpoint: string
    parameters: APIParameters;
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
        getParametersForEndpoint(state) {
            return (endpoint: string): APIParameters | undefined => {
                const found = state.endpoints.find(e => e.endpoint === endpoint);
                return found ? found.parameters : undefined;
            };
        }
    },
    actions: {
        setCurrentActiveStep(stepNr: number): void{
            this.activeStep = stepNr;
        },
        setParameterValueForEndpoint(endpoint: string, parameterName: string, value: any){
            const existingEndpoint = this.endpoints.find(e => e.endpoint === endpoint);
            if (existingEndpoint) {
                existingEndpoint.parameters[parameterName].value = value
            } else {
                console.log("param existiert nicht")
            }
        } ,
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