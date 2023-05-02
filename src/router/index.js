import {createWebHistory, createRouter} from 'vue-router';
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import MapView from "@/views/MapView.vue";
import Treasure from "@/views/TreasureView.vue";
import HomePage from "@/views/HomePage.vue";
import ErrorPage from "@/views/ErrorPage.vue";


const routes = [
    {
        path: "/",
        name: "Home",
        component: HomePage
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/register",
        name: "Register",
        component: Register
    },
    {
      path: "/map",
        name: "Map",
        component: MapView
    },
    {
        path: "/treasure/:id",
        name: "TreasureView",
        component: Treasure,
        props: true
    },{
    path: "/error/:msg",
        name:"ErrorPage",
        component: ErrorPage,
        props: true
    },
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
