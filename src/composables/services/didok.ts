import {useAxios} from "@/composables/services/axios";
import type {DiDok} from "@/types/DiDok";

export class DiDokService {

    public async getDiDokForLocation(location: string): Promise<DiDok> {
        console.log("used di dok event");
        try {
            return (await useAxios().get<DiDok>(`/didok/${location}`)).data;
            //return response.data;
        } catch (error) {
            console.error('Error fetching didok event:', error);
            Promise.reject(error);
            throw new Error('Failed to fetch didok event');
        }
    }
}

const instance = new DiDokService();

export default function useDiDokEvent(): DiDokService {
    return instance;
}