<template>
  <div class="card">
    <button class="btn btn-top" @mouseover="hover = true" @mouseleave="hover = false">
      设置
    </button>
    <button class="btn btn-bottom" @click="logout" @mouseover="hover = true" @mouseleave="hover = false">
      退出登录
    </button>
  </div>
</template>

<script setup lang="js">
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import axios from 'axios'

const hover = ref(false)

const router = useRouter()
const showButtons = ref(false);
const apiBaseUrl = import.meta.env.VITE_API_LOCALHOST_BASE_PATH;

// 退出登录函数
const logout = async () => {
  try {
    await axios.post(`${apiBaseUrl}/user/logout`);
    localStorage.clear();
    router.push('/acacc/login');
  } catch (error) {
    console.error('Logout failed:', error);
  }
}
</script>

<style scoped>
.card {
  background-color: #ffffff;
  border-radius: 1.25rem;
  box-shadow: 0 0 0.3125rem rgba(113, 113, 113, 0.35);
  display: flex;
  flex-direction: column;
  padding: 0.1875rem 0.1875rem 0.1875rem 0.1875rem;
  bottom: 5rem;
  left: 31.5rem;
  position: relative;
}

.btn {
  color: black;
  font-size: 0.9rem;
  font-family: 'Noto Serif SC Regular', sans-serif;
  padding-left: 1.25rem;
  background-color: #ffffff;
  border: none;
  height: 2.4rem;
  width: 11rem;
  text-align: left;
  cursor: pointer;
}

.btn:hover {
  background-color: #F6F6F6;
}

.btn-top {
  border-top-right-radius: 1.25rem;
  border-top-left-radius: 1.25rem;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  position: relative;
}

.btn-bottom {
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  border-bottom-right-radius: 1.25rem;
  border-bottom-left-radius: 1.25rem;
  margin-top: 0.1875rem;
}
</style>
