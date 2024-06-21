import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TimeTableView from "@/views/Demo/TimeTableView.vue";
import GettingStarted from "@/views/GettingStarted.vue";
import DocLayout from "@/layouts/DocLayout.vue";
import DemoLayout from "@/layouts/DemoLayout.vue";
import DocView from "@/views/Doc/DocView.vue";
import {RouteNames} from "@/types/RouteNames";

const routes = [
    {
        path: '/',
        name: RouteNames.home,
        component: HomeView
    },
    {
        path: '/demo',
        component: DemoLayout,
        children: [
            {
                path: 'timetable',
                name: RouteNames.timeTable,
                component: TimeTableView
            },
        ]
    },
    {
        path: '/doc',
        component: DocLayout,
        children: [
            {
                path: '',
                name: RouteNames.doc,
                component: DocView,
                meta: {
                    hashFragments: true
                }
            },
            {
                path: 'gettingstarted',
                name: RouteNames.gettingStarted,
                component: GettingStarted
            }
        ]
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
    scrollBehavior(to, from, savedPosition) {
        if (!to.meta.hashFragments) return;

        if (savedPosition) {
            return savedPosition;
        }

        if (to.hash) {
            return {
                el: to.hash,
            }
        }
    },
})

export default router
