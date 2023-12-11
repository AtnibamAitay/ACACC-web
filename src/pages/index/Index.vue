<template>
  <div class="container">
    <TopBar/>
    <FineMe/>
    <div class="desme-article-container">
      <DesMe/>
      <div class="aricle-card-list">
        <div v-for="(article, index) in articles" :key="index">
          <ArticleCard :title="article.title" :intro="article.intro" :imageLink="article.imageLink"
                       :articleLink="article.articleLink"/>
        </div>
      </div>
    </div>
    <div class="icp-info">
      <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" class="no-underline">粤 ICP 备
        2023068654 号</a>
    </div>
  </div>
</template>


<script setup lang="js">
import {onMounted, ref} from 'vue';
import TopBar from '@/components/index/TopBar.vue';
import FineMe from '@/components/index/FineMe.vue';
import DesMe from '@/components/index/DesMe.vue';
import ArticleCard from '@/components/index/ArticleCard.vue';

const articles = ref([
  {
    title: "多通道支付：桥接模式与工厂模式的结合",
    intro: "一种多通道支付系统设计方案，通过实现策略模式和工厂模式或桥接模式和工厂模式，" +
        "以便更灵活地支持各类支付方式及其子类型，并为其扩展提供可能。",
    imageLink: "https://i.postimg.cc/Wzbm8GMV/UML-1211.png",
    articleLink: "https://nanfangshaonian.feishu.cn/wiki/NbIrwczXTia6dFkqo4BcRcfvn7d",
  },
  {
    title: "RabbitMQ TTL + DLQ 实现超时关单",
    intro: "解释了如何利用 RabbitMQ 的 TTL 和 DLX 特性处理无法在规定时间内被消费的消息，" +
        "实现订单超时自动取消的方法，提供了详细的概念解析、方案比较及具体的代码实现。",
    imageLink: "https://i.postimg.cc/wvxYWtvH/111.png",
    articleLink: "https://nanfangshaonian.feishu.cn/wiki/Oiddw2Obgi8bIPkPneicHCnAnpd",
  },
  {
    title: "利用深度优先搜索（DFS）算法递归构建树形评论数据结构",
    intro: "通过实际应用场景分析树状的评论结构，演示如何使用深度优先搜索算法递归地构建" +
        "树形评论数据。",
    imageLink: "https://i.postimg.cc/J0wHwtr2/1.png",
    articleLink: "https://nanfangshaonian.feishu.cn/wiki/HjnwwnBLPiraRAkeIE4chWDGnkd",
  }
]);

onMounted(() => {
  document.title = "AtnibamAitay's Blog";
});
</script>

<style scoped lang="scss">
.container {
  background-color: #f0eef0;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
}

.desme-article-container {
  display: flex;
  max-width: 2000px;
  margin: 0 auto;
  position: relative;
  top: 3rem;
}

.icp-info {
  font-size: 0.8rem;
  color: #ffffff;
  background-color: #63065f;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 0;
  width: 12rem;

  a.no-underline {
    color: #ffffff;
    text-decoration: none;
  }
}
</style>
