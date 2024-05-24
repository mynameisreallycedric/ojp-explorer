
import {useAxios} from "@/composables/services/axios";
import type {DiDok} from "@/types/old/DiDok";
import type {LIR} from "@/types/LIR";

export class LIRService {

    public async getLIRForLocation(location: string): Promise<LIR> {
        console.log("used lir service");
        try {
            return (await useAxios().get<LIR>(`/locationInformation`, {
                params: {
                    locationName: location
                }
            })).data;
            //return response.data;
        } catch (error) {
            console.error('Error fetching lir:', error);
            Promise.reject(error);
            throw new Error('Failed to fetch lir for ' + location);
        }
    }
}

const instance = new LIRService();

export default function useLIRService(): LIRService {
    return instance;
}