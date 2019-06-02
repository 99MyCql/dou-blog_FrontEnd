<template>
  <el-container class="article-container">
    <el-header style="padding:0;">
      <head-er></head-er>
    </el-header>

    <el-main v-loading="loading">
      <div class="article-wrapper">
        <page-title :title="article.articleTitle"/>
        <div class="article-header">
          <h1 class="article-title">{{ article.articleTitle }}</h1>
          <div class="article-meta">
            <span><i class="el-icon-date"></i> published on {{ article.publishDate }} | </span>
            <span><i class="el-icon-edit-outline"></i> modified on {{ article.updateDate }} | </span>
            <span><i class="el-icon-folder-opened"></i> In {{ article.updateDate }} | </span>
            <span><i class="el-icon-view"></i> Visitors {{ article.readers }} </span>
          </div>
        </div>
        <md-view :content="compiledMd()"/>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import headEr from '@/components/header';
import pageTitle from '@/components/pageTitle';
import mdView from '@/components/mdView'
import marked from 'marked';
import { article_findByArticleTitle } from '@/api/article'

export default {
  components: {
    headEr,
    pageTitle,
    mdView
  },
  data() {
    return {
      loading: false,
      article: {},
      defaultArtical: {
        articleTitle: 'default',
        articleContent: '啥也没有'
      }
    }
  },
  methods: {
    // 字符串转换markdown
    compiledMd() {
      let article = this.article;
      if (this.article.articleTitle == undefined) article = this.defaultArtical;
      let md = marked(article.articleContent, { sanitize: true });
      return md;
    },
    // 通过文章标题获取文章
    getArticle(articleTitle) {
      this.loading = true;
      article_findByArticleTitle(articleTitle)
      .then(resp => {
        let data = resp.data;
        console.log(data);
        // 找寻失败
        if (data.code == 0) {
          this.$message({
            showClose: true,
            message: data.msg,
            type: 'error'
          });
        }
        // 找寻成功
        else {
          this.article = JSON.parse(data.data);
          console.log(this.article);
        }
        this.loading = false;
      })
      // 请求响应异常
      .catch(error => {
        this.$message({
          showClose: true,
          type: 'error',
          message: '出现了一个网络请求错误'
        });
        console.log(error);
        this.loading = false;
      });
    }
  },
  created() {
    let articleTitle = this.$router.currentRoute.query.articleTitle;
    console.log(articleTitle);
    if (articleTitle != undefined) {
      this.getArticle(articleTitle);
    }
  }
}
</script>

<style>
.article-container {
  background-color: #fdf6ec8f;
  position: absolute;
  height: 100%;
  width: 100%
}

@media (min-width: 980px) {
  .article-wrapper {
    width: 1000px;
    margin: 0 auto;
  }

  .article-header {
    text-align: center;
  }

  .article-title {
    font-size: 35px;
    font-weight: 500;
  }

  .article-meta {
    margin: 0 0 30px 0;
    color: #999;
    font-family: 'Microsoft Yahei', "PingFang SC", "Microsoft YaHei", sans-serif;
    font-size: 12px;
  }
}

@media (max-width: 980px) {
  .article-header {
    text-align: center;
  }

  .article-title {
    font-size: 26px;
    font-weight: 400;
  }

  .article-meta {
    margin: 0 0 20px 0;
    color: #999;
    font-family: 'Microsoft Yahei', "PingFang SC", "Microsoft YaHei", sans-serif;
    font-size: 12px;
  }
}
</style>
