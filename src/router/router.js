import {createRouter, createWebHistory} from 'vue-router'
import Login from '@/pages/user/Login.vue'
import Index from '@/pages/index/Index.vue'
import Search from '@/pages/search/Search.vue'

const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index
    },
    {
        path: '/acacc/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/acacc/search',
        name: 'Search',
        component: Search
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
