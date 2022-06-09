import { createRouter, createWebHashHistory } from 'vue-router';


const development = { path: '/information', name: 'Information', component: () => import('@/views/main/components/Information.vue') };

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: () => import('@/views/main/components/Information.vue')
    },
    
];

routes.push(development);

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
