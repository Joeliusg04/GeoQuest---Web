import {createWebHistory, createRouter} from 'vue-router';
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import MapView from "@/views/MapView.vue";
import Treasure from "@/views/TreasureView.vue";
import HomePage from "@/views/HomePage.vue";
import ErrorPage from "@/views/ErrorPage.vue";
import Profile from "@/views/Profile.vue";
import Management from "@/views/Management.vue";
import Review from "@/views/Review.vue";
import UserService from "@/services/user.service";


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
        path: "/treasure/:idTreasure/review/:idReview?",
        name: "Review",
        component: Review,
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


router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/', '/error']
    const managementPages = ['Management']

    const logged = localStorage.getItem('token')


    if (logged !== null && logged !== undefined) {
        UserService.getCurrentUsername().then((response) => {
            UserService.getByNickname(response.data).then((response) => {
                const role = response.data.userRole
                if (role !== "Admin" && managementPages.includes(to.name)) {
                    localStorage.setItem('error', JSON.stringify("You cannot enter this page"))
                    next('/error')
                } else {
                    next()
                }
            }).catch(() => {
            })
        }).catch(() => {
            localStorage.removeItem('token')
            next('/login')
        })
    } else {
        if (publicPages.includes(to.path)) {
            next()
        } else {
            next("/login")
        }
    }


})


export default router;
