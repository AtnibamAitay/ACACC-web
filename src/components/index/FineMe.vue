<template>
  <div class="icon-wrapper">
    <div class="icon-button" @click="openFeishu">
      <img src="@/assets/icon/Index/FeiShu.svg" alt="feishu icon"/>
    </div>
    <div class="icon-button" @click="openGithub">
      <img src="@/assets/icon/Index/Github.svg" alt="github icon"/>
    </div>
    <div class="icon-button">
      <img src="@/assets/icon/Index/WeChat.svg" alt="wechat icon"/>
    </div>
  </div>
</template>

<script setup lang="js">
const openFeishu = () => {
  window.open('https://nanfangshaonian.feishu.cn/wiki/QCaQwWrDjiZoImkVhXkckWYTndc', '_blank');
};

const openGithub = () => {
  window.open('https://github.com/AtnibamAitay', '_blank');
};
</script>


<style scoped lang="scss">
.icon-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 3rem;
  bottom: 2.5rem;
  z-index: 2;

  .icon-button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    border-radius: 50%;
    width: 2.7rem;
    height: 2.7rem;
    margin-bottom: 2.35rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    img {
      width: 55%;
      height: 55%;
    }

    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      background-color: #DCDCDC;
    }
  }
}
</style>
