<template>
  <transition-group name="fade-slide" tag="div">
    <div v-for="(notification) in notifications" :key="notification.id"
         :class="['notification-container', extraClass]">
      <img src="../../assets/icon/common/Info.svg" alt="Info Icon"/>
      <div class="content">
        <h3>{{ notification.title }}</h3>
        <p>{{ notification.message }}</p>
      </div>
    </div>
  </transition-group>
</template>

<script setup lang="js">
import {ref, defineProps} from 'vue';

const notifications = ref([]);
defineProps({
  extraClass: String
});
let notificationCounter = 0;

function displayNotification(title, message) {
  const id = ++notificationCounter;
  const timeout = 6000;

  notifications.value.push({id, title, message});

  setTimeout(() => {
    removeNotificationById(id);
  }, timeout);
}

function removeNotification(index) {
  notifications.value.splice(index, 1);
}

function removeNotificationById(id) {
  const index = notifications.value.findIndex(n => n.id === id);
  if (index !== -1) {
    removeNotification(index);
  }
}

defineExpose({
  displayNotification
});
</script>

<style scoped lang="scss">
.notification-container {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 0.5rem;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.5s ease-in-out;
  min-width: 25.5%;
  box-sizing: border-box;
  z-index: 100;

  img {
    margin-right: 1rem;
    margin-left: 0.875rem;
    width: 1.3rem;
    height: 1.3rem;
  }

  .content {
    font-family: 'PingFang SC', serif;
    color: #262626;

    h3, p {
      margin-top: 0.25rem;
      margin-bottom: 0.25rem;
    }

    h3 {
      font-size: 0.9rem;
      line-height: 1.7;
    }

    p {
      font-size: 0.8rem;
      line-height: 1.2;
      word-break: break-word;

    }
  }
}

// 进入和离开动画
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity .3s ease, visibility .3s ease, transform .3s ease;
}

.fade-slide-enter-from, .fade-slide-leave-to {
  transform: translateY(100%) translateX(-50%);
  opacity: 0;
  visibility: hidden;
}

.fade-slide-enter-to, .fade-slide-leave-from {
  transform: translateY(0) translateX(-50%);
  opacity: 1;
  visibility: visible;
}
</style>
