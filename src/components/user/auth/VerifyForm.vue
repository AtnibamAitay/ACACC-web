<template>
  <div class="verify-form">
    <input type="text" placeholder="请输入验证码" class="input-field" v-model="inputValue" maxlength="6"
           @focus="handleFocus" @blur="handleBlur">
    <button class="verify-btn" @click="verify" @mouseover="hover = true" @mouseleave="hover = false"
            @mousedown="active = true" @mouseup="active = false"
            :style="{ background: active ? '#580655' : hover ? '#8C0A87' : '#63065F' }">登录
    </button>
  </div>
</template>

<script setup lang="js">
import {ref, defineEmits} from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router';

// 注册emit事件
const emit = defineEmits(['displayNotification']);

const router = useRouter();
const inputValue = ref('');
const hover = ref(false);
const active = ref(false);

// 控制输入框的阴影效果
const focus = ref(false);

const handleFocus = () => {
  focus.value = true;
}

const handleBlur = () => {
  focus.value = false;
}

// API URL
const apiUrl = import.meta.env.VITE_API_LOCALHOST_BASE_PATH;

// 登录函数
// 登录函数
const verify = async () => {
  // 检查输入框是否为空
  if (!inputValue.value) {
    emit('displayNotification', "验证码不能为空", "请输入验证码。");
    return;
  }

  // 如果验证码不是6位数，则触发父组件的显示通知事件
  if (inputValue.value.length !== 6) {
    emit('displayNotification', "验证码错误", "请重新输入验证码。");
    return;
  }

  const accountNumber = localStorage.getItem('phoneNumber');
  const loginMethod = localStorage.getItem('loginMethod');

  try {
    // 调用接口，并设置超时时间为4000毫秒（4秒）
    const res = await axios.post(`${apiUrl}/user/login`, {
      accountNumber: accountNumber,
      loginMethod: loginMethod,
      verifyCode: inputValue.value,
    }, {timeout: 2000});

    // 根据返回结果处理
    if (res.data.code === 200) {
      // 保存数据到localStorage
      localStorage.setItem('userId', res.data.data.userId.toString());
      localStorage.setItem('userName', res.data.data.userName);
      localStorage.setItem('avatar', res.data.data.avatar);
      localStorage.setItem('accessToken', res.data.data.accessToken);
      localStorage.setItem('permission', res.data.data.permission.toString());

      router.push('/acacc/search');
    } else {
      emit('displayNotification', "登录失败", res.data.message);
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      emit('displayNotification', "服务器请求超时", "建议稍后重试。");
    } else {
      emit('displayNotification', "网络异常", error.message || "无法连接到服务器，请稍后再试。");
    }
  }
}
</script>

<style scoped>
.verify-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-field {
  width: 21.0625rem;
  height: 3.125rem;
  border-radius: 3.125rem;
  font-size: 16px;
  border: 0;
  font-family: 'Noto Serif SC Regular', serif;
  font-weight: normal;
  text-align: center;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
  background: #ffffff;
  outline: none;
  caret-color: #63065F;
  transition: box-shadow 0.35s ease;
}

.input-field:focus {
  box-shadow: 0 0 10px rgba(178, 167, 177, 0.25);
}

.verify-btn {
  width: 21.0625rem;
  height: 3.125rem;
  border-radius: 5.0625rem;
  border: 0;
  font-size: 16px;
  font-family: 'Noto Serif SC Regular', serif;
  font-weight: normal;
  color: #ffffff;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: background-color 0.35s ease;
}
</style>
