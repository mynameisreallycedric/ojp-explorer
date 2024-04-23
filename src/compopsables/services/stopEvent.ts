import {useAxios} from "@/compopsables/services/axios";

export class StopEventService{

    public async getStopEventForLocation(didok: number): Promise<any>{
        console.log("used get stop event")
        return useAxios().get('/stopEvent', {
            params: {
                stopRef: didok
            }
        })
            .then(res => {
                console.log(res.data)
                res.data;
            })
    }

}

const instance = new StopEventService();

export default function useStopEvent(): StopEventService {
    return instance;
}