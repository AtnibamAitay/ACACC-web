<template>
  <div class="container" @click="hideTabControl">
    <div class="text-box">
      <p class="greet" v-text="greet"></p>
      <p class="remind-sentence" v-text="remindSentence"></p>
    </div>

    <img :src="avatar" class="avatar" alt="avatar" @click.stop="toggleTabControl">
    <SearchEngine @empty-engine-list="handleEmptyEngineList" />
    <TabControl v-if="showTabControl"/>
    <TipBox v-if="showModal" :title="modalTitle" :content="modalContent" @closeModal="showModal = false"/>

    <Notification ref="notificationRef" extra-class="notification-container"/>
  </div>
</template>

<script setup lang="js">
import {ref, onMounted} from 'vue'
import axios from 'axios'
import TipBox from '@/components/common/ConfirmationPopup.vue'
import SearchEngine from '@/components/search/SearchEngine.vue'
import TabControl from '@/components/common/TabControl.vue'
import Notification from '@/components/common/Notification.vue';

// 定义响应式变量
const greet = ref('请先登录')
const remindSentence = ref('您还未登录 Cardinal')
const avatar = ref('https://picx.zhimg.com/v2-369a1e701063ab013872633b1a7ea7c2_xl.jpg?source=32738c0c')
const apiUrl = import.meta.env.VITE_API_LOCALHOST_BASE_PATH

// 控制提示框的显示和内容
const showModal = ref(false)
const modalTitle = ref('')
const modalContent = ref('')
const showTabControl = ref(false)
const notificationRef = ref(null);

// 页面加载时获取数据
onMounted(async () => {
  try {
    const res = await axios.get(`${apiUrl}/user/greet`)
    if (res.data.code === 200) {
      // 更新页面中的文字和图片
      greet.value = '"' + res.data.data.greet + '"'
      remindSentence.value = res.data.data.remindSentence
      avatar.value = res.data.data.avatar
    } else if (res.data.code === 2001) {
      showModal.value = true
      modalTitle.value = "请先登录"
      modalContent.value = res.data.message
    }
  } catch (error) {
    console.error(error.message)
  }
})

// 添加头像点击事件的处理函数
const toggleTabControl = () => {
  // 检查用户是否已经登录
  if (!localStorage.getItem('accessToken')) {
    showModal.value = true
    modalTitle.value = "提醒"
    modalContent.value = "请先登录。"
    return
  }

  showTabControl.value = !showTabControl.value
}

// 添加全局点击事件的处理函数
const hideTabControl = () => {
  showTabControl.value = false
}

const handleEmptyEngineList = () => {
  notificationRef.value.displayNotification('搜索引擎为空', '请先增添搜索引擎');
};
</script>

<style scoped lang="scss">
@import '@/styles/main.scss';

:deep(.notification-container) {
  bottom: 3.5rem;
}

.container {
  background: $gradient-color;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  flex-direction: column;
}

.text-box {
  text-align: right;
}

.greet {
  position: relative;
  font-size: 3rem;
  font-family: 'YouSheBiaoTiHei';
  top: 5rem;
  right: 7rem;
  margin-bottom: 0;
}

.remind-sentence {
  position: relative;
  top: 5rem;
  right: 7rem;
  font-size: 1.35rem;
  font-family: 'YouSheBiaoTiHei';
  margin-top: 0.5rem;
}

.avatar {
  position: relative;
  top: 1rem;
  left: 23.4rem;
  border: 0.1875rem solid white;
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 50%;
  cursor: pointer;
}
</style>
