import { createRouter, createWebHashHistory } from 'vue-router';


const development = { path: '/information', name: 'Information', component: () => import('@/views/main/components/Information.vue') };

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: () => import('@/views/main/components/Information.vue')
    },
    {
        path: '/userInfomation',
        component: () => import('@/views/mypro/infomation/UserInfomation.vue'),
        children:[
            {
                path:'/userInfomation/detail',
                name:'detail',
                component: () => import('@/views/mypro/infomation/info/UserDetail.vue'),
            },
            {
                path:'/userInfomation/address',
                name:'address',
                component: () => import('@/views/mypro/infomation/info/UserAddress.vue'),
            },
            {
                path:'/userInfomation/card',
                name:'card',
                component: () => import('@/views/mypro/infomation/info/UserCard.vue'),
            }
        ]
    },
    // {
    //     path:'/userInfomation/detail',
    //     component: () => import('@/views/mypro/infomation/info/UserDetail.vue'),
    // },
    // {
    //     path:'/userInfomation/address',
    //     component: () => import('@/views/mypro/infomation/info/UserAddress.vue'),
    // },
    // {
    //     path:'/userInfomation/card',
    //     component: () => import('@/views/mypro/infomation/info/UserCard.vue'),
    // }
    
];

routes.push(development);

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
