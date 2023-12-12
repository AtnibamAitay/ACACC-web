<template>
  <div class="search-engine" @click.outside="closeEngineMenu">
    <div
        @click="toggleEngineMenu"
        :class="{ 'hovered': isHovered, 'clicked': showBackground }"
        @mouseover="isHovered = true"
        @mouseleave="isHovered = false"
        class="menu-icon"
    >
      <img src="@/assets/icon/search/SearchEngineMenu.png" alt="menu icon"/>
    </div>
    <transition name="fade">
      <div v-show="showEngineMenu" class="engine-menu">
        <button v-for="(engine, index) in engines" :key="index" @click="selectEngine(engine)"
                :class="{ 'active': engine.engineName === engineInput.value }">
          {{ engine.engineName }}
        </button>
      </div>
    </transition>
    <input v-model="engineInput" @blur="fillEngineName" @keyup.tab.prevent="moveFocus" class="engine-input"
           maxlength="8" ref="engineInputRef"/>
    <div class="line"></div>
    <input v-model="searchInput" @keyup.enter.prevent="handleSearch" class="search-input" ref="searchInputRef"/>
    <TipBox v-if="showModal" :title="modalTitle" :content="modalContent" @closeModal="showModal = false"/>
  </div>
</template>

<script setup lang="js">
import {ref, onMounted, onUnmounted} from 'vue';
import TipBox from '@/components/common/ConfirmationPopup.vue';
import axios from 'axios';
import {defineEmits} from 'vue';

const engineInputRef = ref(null);
const searchInputRef = ref(null);
const emit = defineEmits(['empty-engine-list']);
// 默认搜索引擎数据
const defaultEngine = {
  engineName: 'Google',
  shortcutWords: 'gg',
  urlFormat: 'https://www.google.com/search?q=%s'
};

const apiUrl = import.meta.env.VITE_API_LOCALHOST_BASE_PATH
// 输入的搜索引擎shortcutWords或engineName
const engineInput = ref('Google');
// 用户输入的搜索内容
const searchInput = ref('');
// 是否显示模态框
const showModal = ref(false);
// 模态框标题
const modalTitle = ref('');
// 模态框内容
const modalContent = ref('');
// 控制搜索引擎菜单的显示与隐藏
const showEngineMenu = ref(false);
// 控制搜索引擎按钮背景的显示与隐藏
const showBackground = ref(false);
// 搜索引擎数据
const engines = ref([defaultEngine]);
const isHovered = ref(false);

// 获取搜索引擎数据
onMounted(async () => {
  try {
    const response = await axios.get(`${apiUrl}/search-engines`);
    if (response.status === 200 && response.data.code === 200) {
      engines.value = response.data.data;
    } else {
      showModal.value = true;
      modalTitle.value = '服务器错误';
      modalContent.value = '搜索引擎请求失败。';
    }
  } catch (error) {
    showModal.value = true;
    modalTitle.value = '服务器错误';
    modalContent.value = '搜索引擎请求失败。';
  }
});

// 填充搜索引擎名字，并处理光标移动
const fillEngineName = () => {
  const foundEngine = engines.value.find(engine => engine.shortcutWords === engineInput.value || engine.engineName === engineInput.value);
  if (!foundEngine && engineInput.value !== defaultEngine.shortcutWords && engineInput.value !== defaultEngine.engineName) {
    showModal.value = true;
    modalTitle.value = '引擎不存在';
    modalContent.value = '请重新选择搜索引擎。';
    engineInputRef.value.focus();
  } else {
    engineInput.value = foundEngine ? foundEngine.engineName : defaultEngine.engineName;
  }
};

// 移动光标到searchInput
const moveFocus = () => {
  const foundEngine = engines.value.find(engine => engine.shortcutWords === engineInput.value || engine.engineName === engineInput.value);
  if (foundEngine) {
    engineInput.value = foundEngine.engineName;
    searchInputRef.value.focus();  // 当用户按tab键时，移动焦点到searchInput
  } else {
    showModal.value = true;
    modalTitle.value = '引擎不存在';
    modalContent.value = '请重新选择搜索引擎。';
  }
}

// 处理搜索
const handleSearch = () => {
  const foundEngine = engines.value.find(engine => engine.shortcutWords === engineInput.value || engine.engineName === engineInput.value);
  const searchUrl = (foundEngine || defaultEngine).urlFormat.replace('%s', encodeURIComponent(searchInput.value));
  window.open(searchUrl, '_blank');
};

// 点击菜单按钮切换搜索引擎菜单显示状态
const toggleEngineMenu = (event) => {
  event.stopPropagation(); // 阻止事件冒泡
  if (engines.value.length === 0) {
    // 如果 engines 数组是空的，我们触发一个事件告诉父组件显示通知
    emit('empty-engine-list');
  } else {
    showEngineMenu.value = !showEngineMenu.value;
    showBackground.value = !showBackground.value;
  }
};

// 用户选择搜索引擎
const selectEngine = (engine) => {
  engineInput.value = engine.engineName;
  // 选择完成后隐藏白色的背景
  showBackground.value = false;
  // 选择完成后隐藏搜索引擎菜单
  showEngineMenu.value = false;
};

// 关闭搜索引擎菜单的函数
const closeEngineMenu = (event) => {
  if (!event.target.closest('.engine-menu') && showEngineMenu.value) {
    showEngineMenu.value = false;
    showBackground.value = false;
  }
};

// 监听点击事件，用于处理点击外部区域关闭菜单
document.addEventListener('click', closeEngineMenu);

// 在组件卸载时移除事件监听
onUnmounted(() => {
  document.removeEventListener('click', closeEngineMenu);
});
</script>

<style scoped lang="scss">
.menu-icon {
  position: absolute;
  top: 0.65rem;
  left: 9.5rem;
  cursor: pointer;
  padding: 0.188rem;
  border-radius: 20%;
  background-color: transparent;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &.hovered {
    background-color: #f1f1f1; // 悬停时的背景色
  }

  &.clicked {
    background-color: white; // 点击后的背景色
  }
}

.menu-icon img {
  max-width: 90%;
  max-height: 90%;
}

.engine-menu {
  position: absolute;
  top: 3.6rem;
  left: 0;
  background-color: white;
  border-radius: 1rem;
  padding: 0.5rem;
  //display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
  display: grid;
  grid-template-columns: repeat(4, 160px); // 创建四个相同宽度的列
  grid-gap: 10px; // 设置列与列之间的间隔
}

.engine-menu button {
  width: 160px;
  height: 40px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-family: 'Noto Serif SC Regular', 'Noto Serif SC Regular', serif;
  font-size: 15px;
  border-radius: 1rem;
  transition: background-color .2s ease-in-out;
}

.engine-menu button:hover {
  background-color: #f1f1f1;
}

.engine-menu button.active {
  background-color: #f1f1f1;
}

.search-engine {
  display: flex;
  position: relative;
  top: 2rem;
}

.line {
  position: absolute;
  top: 0.85rem;
  left: 11.5rem;
  width: 0.11rem;
  height: 1.4rem;
  background: #000;
}

.engine-input {
  border-radius: 1rem 0 0 1rem;
  border-width: 0.188rem;
  border-style: solid;
  border-color: #000;
  border-right: none;
  width: 10.5rem;
  height: 2.5rem;
  background: none;
  outline: none;
  text-align: left;
  font-size: 16px;
  font-family: 'YouSheTitleBlack', 'Noto Serif SC Regular', serif;
  padding: 0 0 2px 25px;
}

.search-input {
  border-radius: 0 1rem 1rem 0;
  border-width: 0.188rem;
  border-style: solid;
  border-color: #000;
  border-left: none;
  width: 37rem;
  height: 2.5rem;
  background: none;
  outline: none;
  font-size: 16px;
  font-family: 'Noto Serif SC Regular', 'Noto Serif SC Regular', serif;
}

// 添加过渡效果的样式
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

// 当点击外部区域时关闭engine-menu
.search-engine {
  &:deep(.click-outside) {
    display: none;
  }
}
</style>
