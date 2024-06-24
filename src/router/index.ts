import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TimeTableView from "@/views/Demo/TimeTableView.vue";
import GettingStarted from "@/views/GettingStarted.vue";
import DocLayout from "@/layouts/DocLayout.vue";
import DemoLayout from "@/layouts/DemoLayout.vue";
import {RouteNames} from "@/types/RouteNames";
import DocEnpointsView from "@/views/Docs/DocEnpointsView.vue";
import IntroductionView from "@/views/IntroductionView.vue";
import {useI18n} from "vue-i18n";
import i18n from "@/plugins/i18n";

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
                name: RouteNames.demoTimeTable,
                component: TimeTableView
            },
        ]
    },
    {
        path: '/doc',
        component: DocLayout,
        children: [
            {
                path: 'introduction',
                alias: [''],
                name: RouteNames.docsIntroduction,
                component: IntroductionView,
                meta: {
                    title: i18n.global.t('page.docs.introduction'),
                }
            },
            {
                path: 'gettingstarted',
                name: RouteNames.docsGettingStarted,
                component: GettingStarted,
                meta: {
                    title: i18n.global.t('page.docs.gettingStarted'),
                }
            },
            {
                path: 'endpoints',
                name: RouteNames.docsEndpoints,
                component: DocEnpointsView,
                meta: {
                    title: i18n.global.t('page.docs.endpoints'),
                    hashFragments: true
                }
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
