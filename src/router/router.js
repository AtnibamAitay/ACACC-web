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

// 全局前置守卫
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('accessToken'); // 获取localStorage中的Authorization

    if (isAuthenticated && to.name === 'Login') {
        // 如果已认证且目标路由是登录页，则跳转到搜索页
        next({name: 'Search'});
    } else if (!isAuthenticated && to.name !== 'Login' && to.name !== 'Index') {
        // 如果未认证且目标路由既不是登录页也不是首页，则跳转到登录页
        next({name: 'Login'});
    } else {
        // 在其他情况下，正常导航
        next();
    }
});

export default router
