import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from './stores/user'

import Home from './view/home.vue'
import login from './view/login.vue'
import register from './view/register.vue'
import editar from './view/editar.vue'

const requireAuth = async (to, from, next) =>{
    
    const userStore = useUserStore();
    userStore.loadingSession=true;
    const user = await userStore.currentUser();
    if(user){
        next()
    }else {
        next("/login")
    }
    userStore.loadingSession=false;
}


const routes = [
    {path: '/', component: Home, beforeEnter: requireAuth, name:"home"},
    {path: '/editar/:id', component: editar, beforeEnter: requireAuth },
    {path: '/login', component: login, name:"login"},
    {path: '/register', component: register, name:"register"}
]
const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router;