<template>
  <div class="login-form">
    <input type="text" placeholder="邮箱/手机号" class="input-field" v-model="inputValue" maxlength="25">
    <button class="login-btn" @click="sendVerifyCode" @mouseover="hover = true" @mouseleave="hover = false"
            @mousedown="active = true" @mouseup="active = false"
            :style="{ background: active ? '#580655' : hover ? '#8C0A87' : '#63065F' }">发送验证码
    </button>
  </div>
</template>

<script setup lang="js">
import {ref, defineEmits} from 'vue';
import axios from 'axios';

// 注册emit事件
const emit = defineEmits(['displayNotification', 'loginSuccess']);
const inputValue = ref('');
const hover = ref(false);
const active = ref(false);
const apiUrl = import.meta.env.VITE_API_LOCALHOST_BASE_PATH;

// 发送验证码函数
// 发送验证码函数
const sendVerifyCode = async () => {
  // 检查输入框是否为空
  if (!inputValue.value) {
    emit('displayNotification', "账号不能为空", "请输入邮箱或者手机号。");
    return;
  }

  // 判断是否为邮箱或手机号
  const isEmail = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/.test(inputValue.value);
  const isPhone = /^(\+?0?86\-?)?1[3456789]\d{9}$/.test(inputValue.value);

  let loginMethod;
  if (isEmail) {
    loginMethod = 0;
    localStorage.setItem('loginMethod', loginMethod);
  } else if (isPhone) {
    loginMethod = 1;
    localStorage.setItem('loginMethod', loginMethod);
  } else {
    emit('displayNotification', "格式错误", "请检查邮箱或手机号的格式。");
    return;
  }

  try {
    // 调用接口，并设置超时时间为4000毫秒（4秒）
    const res = await axios.post(`${apiUrl}/user/sendVerifyCode`, {
      accountNumber: inputValue.value,
      loginMethod: loginMethod
    }, {timeout: 2000});

    // 根据返回结果处理
    if (res.data.code === 200) {
      localStorage.setItem('phoneNumber', inputValue.value);
      emit('loginSuccess');
    } else if (res.data.code === 2003) {
      emit('displayNotification', "登录失败", res.data.message);
    }
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      emit('displayNotification', "服务器请求超时", "建议稍后重试。");
    } else {
      emit('displayNotification', "错误", error.message);
    }
  }
};
</script>

<style scoped>
.login-form {
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

.input-field::selection {
  background: #63065F;
  color: white;
}

.input-field::selection {
  background: #63065F;
  color: white;
}

.login-btn {
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
}
</style>
