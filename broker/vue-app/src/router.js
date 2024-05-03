import { createRouter, createWebHashHistory } from "vue-router";
import Admin from "./views/Admin.vue";
import Login from './views/Login.vue'
import Home from './views/Home.vue'


const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/admin', name: 'Admin', component: Admin},
    { path: '/login', name: 'Login', component: Login}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.name === 'Login' && localStorage.getItem('user'))
        next({ name: 'Home' });
    else if (to.name !== 'Login' && !localStorage.getItem("user"))
        next({ name: 'Login' });
    else
        next();
});

export default router