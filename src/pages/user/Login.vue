<template>
  <div class="container">
    <Notification ref="notificationRef" extra-class="login-notification-container"/>
    <div class="square"></div>
    <div class="login-box">
      <transition name="slide-fade" mode="out-in">
        <LoginForm v-if="showLoginForm" key="login-form" @displayNotification="handleDisplayNotification"
                   @loginSuccess="handleLoginSuccess"/>
        <VerifyForm v-else key="verify-form" @displayNotification="handleDisplayNotification"/>
      </transition>
      <p class="tip">ACACC 不是公开的应用，非用户无法登录</p>
    </div>
  </div>
</template>

<script setup lang="js">
import LoginForm from '@/components/user/auth/LoginForm.vue'
import VerifyForm from '@/components/user/auth/VerifyForm.vue'
import Notification from '@/components/common/Notification.vue';
import {ref} from 'vue';

const notificationRef = ref(null);
const showLoginForm = ref(true);

const handleDisplayNotification = (title, message) => {
  notificationRef.value.displayNotification(title, message);
};

const handleLoginSuccess = () => {
  showLoginForm.value = false;
};
</script>

<style scoped lang="scss">
@import '@/styles/main';

:deep(.login-notification-container) {
  bottom: 14.5rem;
}

.container {
  background: $gradient-color;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
}

.square {
  width: 2rem;
  height: 2rem;
  background: $primary-color;
  position: absolute;
  top: 36px;
}

.login-box {
  width: 24rem;
  height: 13rem;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  position: relative;
  flex-direction: column;
  align-items: center;
  border-top-left-radius: 2.8125rem;
  border-top-right-radius: 2.8125rem;
  overflow: hidden;
}

.tip {
  color: #000;
  font-size: 12px;
  margin-bottom: 1.5rem;
  letter-spacing: 0.5px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
}

.slide-fade-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-fade-enter-active {
  transition: transform 0.25s ease-in-out, opacity 0.25s ease-in-out;
}

.slide-fade-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-fade-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.slide-fade-leave-active {
  transition: transform 0.25s ease-in-out, opacity 0.25s ease-in-out;
  position: absolute;
}

.slide-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
