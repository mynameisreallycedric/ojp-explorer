
import {useAxios} from "@/composables/services/axios";
import type {DiDok} from "@/types/old/DiDok";
import type {LIR} from "@/types/LIR";

export class LIRService {

    public async getLIRForLocation(locationName: string, limit?: number): Promise<LIR> {
        console.log("used lir service");
        try {
            return (await useAxios().get<LIR>(`/locationInformation`, {
                params: {
                    locationName: locationName,
                    limit: limit
                }
            })).data;
            //return response.data;
        } catch (error) {
            console.error('Error fetching lir:', error);
            Promise.reject(error);
            throw new Error('Failed to fetch lir for ' + locationName);
        }
    }
}

const instance = new LIRService();

export default function useLIRService(): LIRService {
    return instance;
}