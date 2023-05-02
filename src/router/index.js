import {createWebHistory, createRouter} from 'vue-router';
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import MapView from "@/views/MapView.vue";
import Treasure from "@/views/TreasureView.vue";


const routes = [
    {
        path: "/home",
        name: "Home",
        component: Home
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
    },
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
