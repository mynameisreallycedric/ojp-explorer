import {useAxios} from "@/compopsables/services/axios";
import type {DiDok} from "@/types/DiDok";

export class DiDokService{

    public async getDiDokForLocation(location: string): Promise<DiDok>{
        console.log("used di dok event");
            try {
                const response = await useAxios().get<DiDok>(`/didok/${location}`);
                return response.data;
            } catch (error) {
                console.error('Error fetching didok event:', error);
                throw new Error('Failed to fetch didok event');
            }
    }
}

const instance = new DiDokService();

export default function useDiDokEvent(): DiDokService {
    return instance;
}