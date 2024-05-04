import {useAxios} from "@/composables/services/axios";
import type {StopEvent} from "@/types/StopEvent";
import type {DiDok} from "@/types/DiDok";

export class StopEventService{

    public async getStopEventForLocation(didok: number): Promise<StopEvent>{
        console.log("used get stop event");
        try {
            const response = await useAxios().get<StopEvent>('/stopEvent', {
                params: {
                    stopRef: didok
                }
            });
            return response.data; // Return the fetched data
        } catch (error) {
            console.error('Error fetching stop event:', error);
            throw new Error('Failed to fetch stop event');
        }
    }

}

const instance = new StopEventService();

export default function useStopEvent(): StopEventService {
    return instance;
}