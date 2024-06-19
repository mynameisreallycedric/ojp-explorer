import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TimeTableView from "@/views/Demo/TimeTableView.vue";
import GettingStarted from "@/views/GettingStarted.vue";
import LocationInformationDocView from '@/views/Doc/locationInformationDocView.vue';
import StationBoardDocView from "@/views/Doc/stationBoardDocView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/gettingstarted',
      name: 'GettingStarted',
      component: GettingStarted
    },
    {
      path: '/demo/timetable',
      name: 'timetable',
      component: TimeTableView
    },
    {
      path: '/doc/locationInformation',
      name: 'locationInformation',
      component: LocationInformationDocView
    },
    {
      path: '/doc/stationBoard',
      name: 'stationBoard',
      component: StationBoardDocView
    }
  ]
})

export default router
