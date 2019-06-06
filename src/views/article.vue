<template>
  <el-container class="article-container">
    <el-header style="padding:0;">
      <head-er></head-er>
    </el-header>

    <el-main v-loading="loading">
      <div class="article-wrapper">
        <page-title :title="article.articleTitle"/>

        <div>
          <div class="article-header">
            <h1 class="article-title">{{ article.articleTitle }}</h1>
            <div class="article-meta">
              <span><i class="el-icon-date"></i> published on {{ article.publishDate }} | </span>
              <span><i class="el-icon-edit-outline"></i> modified on {{ article.updateDate }} | </span>
              <span><i class="el-icon-folder-opened"></i> In {{ article.updateDate }} | </span>
              <span><i class="el-icon-view"></i> Visitors {{ article.readers }} </span>
            </div>
          </div>
          <!-- article header -->

          <md-view :content="compiledMd()"/>
          <!-- markdown view -->

          <div class="footnote">© 著作权归作者所有</div>
          <!-- article footnote -->
        </div>
        <!-- article -->

        <div style="margin:0 20px;">
          <comment-area
            :articleId="article.id"/>
        </div>
        <!-- comment area -->
      </div>
      <!-- article wrapper -->
    </el-main>
  </el-container>
</template>

<script>
import headEr from '@/components/header';
import pageTitle from '@/components/pageTitle';
import mdView from '@/components/mdView';
import commentArea from '@/components/commentArea';
import marked from 'marked';
import { article_findByArticleTitle } from '@/api/article';
import { user_findById } from '@/api/user';

export default {
  components: {
    headEr,
    pageTitle,
    mdView,
    commentArea
  },
  data() {
    return {
      article: {},
      defaultArtical: {
        articleTitle: 'default',
        articleContent: '啥也没有'
      },
      loading: false
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
      console.log('=====getArticle()======');
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
          console.log('article --->', this.article);
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

.footnote {
  display: block;
  padding-right: 20px;
  margin-bottom: 80px;
  font-size: 3px;
  font-family: 'Microsoft Yahei';
  color: grey;
  text-align: right;
}

@media (min-width: 980px) {
  .article-wrapper {
    width: 1000px;
    margin: 0 auto;
    padding-bottom: 100px;
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
  .article-wrapper {
    padding-bottom: 100px;
  }

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
