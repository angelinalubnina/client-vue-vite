import {
    ADMIN_ROUTE,
    BASKET_ROUTE,
    DEVICE_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE,

} from '../utils/consts';
import { createRouter, createWebHashHistory } from 'vue-router';
import Admin from '../pages/Admin.vue';
import Basket from '../pages/Basket.vue';
import Auth from '../pages/Auth.vue';
import DevicePage from '../pages/DevicePage.vue';
import Shop from '../pages/Shop.vue';
// import Test from '../pages/Test.vue';
import Test2 from '../pages/Test2.vue';

import Personal from "../pages/ordering/Personal.vue";
import Address from "../pages/ordering/Address.vue";
import Payment from "../pages/ordering/Payment.vue";
import Confirmation from "../pages/ordering/Confirmation.vue";

const routes = [
    {
        path: ADMIN_ROUTE,
        component: Admin,
    },
    {
        path: BASKET_ROUTE,
        component: Basket,
    },
    {
        path: SHOP_ROUTE,
        component: Shop,
    },
    {
        path: LOGIN_ROUTE,
        component: Auth,
    },
    {
        path: REGISTRATION_ROUTE,
        component: Auth,
    },
    // {
    //     path: DEVICE_ROUTE + '/:id',
    //     component: DevicePage,
    // },
    {
        path: DEVICE_ROUTE + '/:name',
        component: DevicePage,
    },
    {
        path: '/personal',
        component: Personal,
    },
    {
        path: '/address',
        component: Address,
    },
    {
        path: '/payment',
        component: Payment,
    },
    {
        path: '/confirmation',
        component: Confirmation,
    },
    {
        path: '/test2',
        component: Test2,
    },

];

// const router = createRouter({
//     routes,
//     history: createWebHashHistory(process.env.BASE_URL),
// });
const router = createRouter({
    routes,
    history: createWebHashHistory()
});

export default router;
