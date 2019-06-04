<template>
  <el-container style="background-color: #fdf6ec8f;">
    <el-header style="padding:0;">
      <head-er></head-er>
    </el-header>

    <el-main class="home-main">
      <el-carousel :interval="2000" type="card" class="carousel">
        <el-carousel-item>
          <el-image src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"></el-image>
        </el-carousel-item>
        <el-carousel-item>
          <el-image src="https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg"></el-image>
        </el-carousel-item>
        <el-carousel-item>
          <el-image src="https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg"></el-image>
        </el-carousel-item>
        <el-carousel-item>
          <el-image src="https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg"></el-image>
        </el-carousel-item>
      </el-carousel>

      <el-timeline v-loading="loading">
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
              <i class="el-icon-view"></i><span style="margin-left:5px">{{ article.readers }}</span>
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
    viewArticel(article) {
      console.log(article);
      this.$router.push({ path: '/article', query: { articleTitle: article.articleTitle }})
    }
  },
  created() {
    this.getArticleList();
  }
}
</script>

<style>
@media (min-width: 980px) {
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

@media (max-width: 980px) {
  .home-main {
    height: 100%;
  }

  .carousel {
    height: 160px;
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
