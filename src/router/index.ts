import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TimeTableView from "@/views/Demo/TimeTableView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/demo/timetable',
      name: 'timetable',
      component: TimeTableView
    }
  ]
})

export default router
