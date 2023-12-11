<template>
  <a :href="articleLink" target="_blank" class="article-card">
    <div class="article-item">
      <h2 class="article-title">{{ title }}</h2>
      <p class="article-intro">{{ intro }}</p>
    </div>
    <img :src="imageLink" alt="Article image" class="article-image"/>
  </a>
</template>

<script setup lang="js">
import {defineProps} from 'vue'

const props = defineProps({
  title: String,
  intro: String,
  imageLink: String,
  articleLink: String
})
</script>

<style lang="scss">
.article-card {
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  height: 10rem;
  text-decoration: none;
  margin-bottom: 1.3rem;
  transition: all 0.3s ease-in-out;
}

.article-card:hover {
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  transform: translateY(-3px);
}

.article-image {
  width: 14rem;
  height: 10rem;
}

.article-item {
  max-width: 29.75rem;
  text-align: left;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
}

.article-title {
  font-family: 'NotoSerifSC-SemiBold';
  color: black;
  font-size: 1.3rem;
  text-decoration: none;
  margin-bottom: 0.6rem;
}

.article-intro {
  font-family: 'NotoSerifSC-Regular';
  color: #767676;
  font-size: 0.86rem;
  margin-top: 0rem;
  line-height: 1.5rem;
}
</style>
