<template>
  <div class="overlay" v-if="showModal" @keyup.enter="closeModal">
    <div class="modal">
      <div class="text-container">
        <h1 class="title">{{ title }}</h1>
        <p class="content">{{ content }}</p>
      </div>
      <button class="confirm" @click="closeModal">确定</button>
    </div>
  </div>
</template>

<script setup lang="js">
import {ref, onMounted, onBeforeUnmount, defineProps, defineEmits} from 'vue';

const emits = defineEmits(['closeModal']);
const showModal = ref(true);

function closeModal() {
  showModal.value = false;
  emits('closeModal');
}

function keyListener(e) {
  if (e.key === 'Enter') {
    closeModal();
  }
}

defineProps(['title', 'content']);

onMounted(() => {
  window.addEventListener('keyup', keyListener);
});

onBeforeUnmount(() => {
  window.removeEventListener('keyup', keyListener);
});
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(148, 148, 148, 0.55);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: #FFFFFF;
  border-radius: 18px;
  padding: 22px;
  display: flex;
  flex-direction: column;

}

.text-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 14vw;
}

.title {
  font-family: 'Noto Serif SC Bold', 'Noto Serif SC Regular', serif;
  font-weight: 700;
  font-style: normal;
  font-size: 17px;
  letter-spacing: 1px;
  line-height: 22px;
  margin-bottom: 10px;
  margin-top: 0;
}

.content {
  font-weight: 400;
  font-style: normal;
  font-size: 13px;
  letter-spacing: normal;
  color: #737373;
  margin-bottom: 15px;
  margin-top: 0;
}

.confirm {
  background-color: #0F1419;
  border-radius: 145px;
  width: 14vw;
  height: 5.3vh;
  font-size: 14px;
  color: #FFFFFF;
  border: none;
  cursor: pointer;
}

.confirm:hover {
  background-color: #2D2D2D;
}

.confirm:active {
  background-color: #06080A;
}
</style>
