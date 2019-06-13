<template>
  <el-container style="background-color: #fdf6ec8f;">
    <el-header style="padding:0;">
      <head-er></head-er>
    </el-header>

    <el-main class="home-main">
      <el-carousel :interval="6000" :type="getType()" class="carousel">
        <el-carousel-item>
          <div class="img-container"><img src="../assets/fangao/星空_small.jpg"></img></div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="img-container"><img src="../assets/fangao/稻田中的乌鸦.jpg"></img></div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="img-container"><img src="../assets/fangao/罗纳河上的星空.jpg"></img></div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="img-container"><img src="../assets/fangao/黄房子.jpeg"></img></div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="img-container"><img src="../assets/fangao/梵高的卧室.jpeg"></img></div>
        </el-carousel-item>
      </el-carousel>

      <el-timeline v-loading="loading" class="card-list">
        <el-timeline-item v-for="article in articleList" :timestamp="article.publishDate" placement="top">
          <el-card shadow="hover">
            <div class="card-header">
              <div class="article-title">
                <router-link :to="{ path: '/article', query: { articleTitle: article.articleTitle }}">
                  <b style="color:black">{{ article.articleTitle }}</b>
                </router-link>
              </div>
              <el-tag size="mini">{{ article.articleCategories }}</el-tag>
            </div>

            <p style="color: #999;">{{ article.articleTabloid }}</p>

            <div style="color: #999;">
              <i class="el-icon-view"></i><span style="margin-left:5px;margin-right:10px">{{ article.readers }}</span>
              <i class="el-icon-chat-square"></i><span style="margin-left:5px">{{ article.comments }}</span>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-main>
  </el-container>
</template>

<script>
import headEr from '@/components/header';
import { article_listAll } from '@/api/article';

export default {
  components: {
    headEr
  },
  data() {
    return {
      loading: false,
      articleList: []
    }
  },
  methods: {
    // 获取文章列表
    getArticleList() {
      this.loading = true;
      article_listAll(1, 50).then((resp) => {
        this.articleList = resp.data.list;
        console.log(this.articleList);
        this.loading = false;
      }).catch((error) => {
        this.$message({
          showClose: true,
          type: 'error',
          message: '出现了一个网络请求错误'
        });
        console.log(error);
        this.loading = false;
      })
    },
    // 查看文章
    viewArticel(article) {
      console.log(article);
      this.$router.push({ path: '/article', query: { articleTitle: article.articleTitle }})
    },
    // 根据屏幕大小返回走马灯样式
    getType() {
      console.log(window.screen.width);
      return window.screen.width > 900 ? 'card' : '';
    }
  },
  created() {
    this.getArticleList();
  }
}
</script>

<style>
.img-container{
  display: flex;
  justify-content: center;
  align-items: center;
  height:100%;
  width:100%;
}

.img-container img {
  height: auto;
  width: auto;
  max-width:100%;
  max-height:100%;
}

.card-list {
  padding: 0;
  margin-top: 10px;
}

@media (min-width: 900px) {
  .home-main {
    width: 1000px;
    height: 100%;
    margin: 20px auto;
  }

  .carousel {
    height: 400px;
  }

  .card-header {
    display: flex;
    align-items: center;
  }

  .article-title {
    display: inline;
    font-size: 30px;
    margin-right: 10px;
    font-family: "Microsoft Yahei";
  }
}

@media (max-width: 900px) {
  .home-main {
    height: 100%;
  }

  .carousel {
    height: 300px;
  }

  .card-header {
    display: flex;
    align-items: center;
  }

  .article-title {
    display: inline;
    font-size: 15px;
    margin-right: 3px;
    font-family: "Microsoft Yahei";
  }
}
</style>
