import {createWebHistory, createRouter} from 'vue-router';
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import MapView from "@/views/MapView.vue";
import Treasure from "@/views/TreasureView.vue";
import HomePage from "@/views/HomePage.vue";
import ErrorPage from "@/views/ErrorPage.vue";
import Profile from "@/views/Profile.vue";
import Management from "@/views/Management.vue";


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
    }, {
        path: "/profile",
        name: "Profile",
        component: Profile
    },
    {
        path: "/treasure/:idTreasure",
        name: "TreasureView",
        component: Treasure,
        props: true
    }, {
        path: "/error",
        name: "ErrorPage",
        component: ErrorPage,
    }, {
        path: "/management/:idTreasure?",
        name: "Management",
        component: Management,
        props: true
    },
    {
        path: "/:catchAll(.*)",
        component: ErrorPage,
    },
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});


/*
router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/', '/error'];
    const authRequired = routes.filter(x => !publicPages.includes(x.path)).map(x => x.path).includes(to.path);
    const loggedIn = localStorage.getItem('logged');
    const
    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && loggedIn !== "true") {
        next('/login');
    } else {
        next();
    }
});
*/

router.beforeEach((to, from, next) => {
    const publicPages = ['/login','/register','/','/error']
    const managementPages = ['/management']

    const role = JSON.parse(localStorage.getItem('role'));
    const logged = localStorage.getItem('user')
    console.log(role==="Admin")

    if ((logged===null || logged===undefined) && !publicPages.includes(to.path)){
        next('/login')
    } else if (role!=="Admin" && managementPages.includes(to.path)){
        localStorage.setItem('error',"You cannot enter this page")
        next('/error')
    } else {
        next()
    }
})


export default router;
