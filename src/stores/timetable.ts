import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const useTimeTableStore = defineStore('timetable', {
    state: () => ({
    activeStep: 0
}),
    getters: {
        getCurrentActiveStep(): number{
            return this.activeStep;
        }
    },
    actions: {
        setCurrentActiveStep(stepNr: number){
            this.activeStep = stepNr;
        }
    }
})