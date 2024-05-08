import {useAxios} from "@/composables/services/axios";
import type {StopEvent} from "@/types/StopEvent";
import type {DiDok} from "@/types/old/DiDok";
import type {StationBoard} from "@/types/StationBoard";

export class StationBoardService{

    public async getStationBoardForLocation(lir: string): Promise<StationBoard>{
        console.log("used get station-board service");
        try {
            const response = await useAxios().get<StationBoard>('/stationBoard', {
                params: {
                    station: lir
                }
            });
            return response.data; // Return the fetched data
        } catch (error) {
            console.error('Error fetching station board:', error);
            throw new Error('Failed to fetch station board');
        }
    }

}

const instance = new StationBoardService();

export default function useStationBoardService(): StationBoardService {
    return instance;
}