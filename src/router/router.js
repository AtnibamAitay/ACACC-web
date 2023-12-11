import {createRouter, createWebHistory} from 'vue-router'
import Index from '@/pages/index/Index.vue'

const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router