<template>
  <div class="top-bar">
    <div class="logo-container">
      <div class="logo"></div>
      <p class="title">AtnibamAitay's Blog</p>
    </div>
    <nav>
      <ul class="nav-items">
        <li v-for="item in navItems" :key="item.text"
            :class="{ active: item.route === route.path }"
            @click="navigateTo(item)">
          {{ item.text }}
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="js">
import {ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';

const router = useRouter();
const route = useRoute();

const navItems = ref([
  {text: "首页", route: "/"},
  {text: "笔记", route: "https://note.atnibam.space", isExternal: true}
]);

const navigateTo = (item) => {
  if (item.isExternal) {
    window.location.href = item.route;
  } else if (item.route !== route.path) {
    router.push(item.route);
  }
};
</script>

<style scoped lang="scss">
.top-bar {
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.75rem 0;
  width: 1380px;
  max-width: 1380px;

  .logo-container {
    display: flex;
    align-items: center;

    .logo {
      width: 1.25rem;
      height: 1.25rem;
      background-color: #63065F;
      margin-right: 0.9375rem;
    }

    .title {
      font-family: 'Smiley Sans Oblique';
      font-size: 1.4rem;
      color: #000000;
    }
  }

  nav {
    ul.nav-items {
      list-style: none;
      padding: 0;
      display: flex;
      align-items: center;
      gap: 5rem;

      li {
        font-size: 1rem;
        color: #A3A3A3;
        font-family: 'NotoSerifSC-Regular';
        cursor: pointer;

        &.active {
          color: #000000;
          font-family: 'NotoSerifSC-SemiBold';
          cursor: default;
        }
      }
    }
  }
}
</style>
