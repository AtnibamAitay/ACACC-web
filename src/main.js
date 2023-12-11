import '@/styles/main.css'
import '@/assets/fonts/font.css'
import '@/assets/fonts/PingFangSC.css'
import '@/assets/fonts/SmileySansOblique.css'
import '@/assets/fonts/YouSheBiaoTiHei.css'

import {createApp} from 'vue'
import App from '@/App.vue'
import router from '@/router/router.js'
import axios from 'axios'

const app = createApp(App)

axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('accessToken')
        if (token) {
            config.headers['Authorization'] = token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

app.config.globalProperties.$http = axios

createApp(App).use(router).mount('#app')
