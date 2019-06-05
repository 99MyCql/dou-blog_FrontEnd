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

        <div>
          <div class="comment-write">
            <div class="comment-username">
              {{ username }} :
            </div>
            <!-- comment user -->

            <el-input
              type="textarea"
              :rows="4"
              placeholder="写下你的评论..."
              maxlength="200"
              show-word-limit
              v-model="comment.commentContent">
            </el-input>
            <!-- comment content -->
            
            <div class="comment-button">
              <el-button @click="comment = ''" round>取消</el-button>
              <el-button type="primary" @click="submitComment" round>发表</el-button>
            </div>
            <!-- comment button -->
          </div>
          <!-- comment write -->

          <div v-loading="comment_loading">
            <div class="comments-title">
              <span style="font-size: 17px;font-weight: 700;">{{ commentsCount }}条评论</span>
            </div>

            <div class="comment-one" v-for="comm in commentList">
              <div class="comment-info">
                <div class="comment-author">{{ comm.commenterName }}</div>
                <div class="comment-date">{{ comm.commentDate }}</div>
              </div>
            </div>
          </div>
          <!-- comments list -->
        </div>
        <!-- comment -->
      </div>
      <!-- article wrapper -->
    </el-main>
  </el-container>
</template>

<script>
import headEr from '@/components/header';
import pageTitle from '@/components/pageTitle';
import mdView from '@/components/mdView'
import marked from 'marked';
import { article_findByArticleTitle } from '@/api/article';
import { comment_insert, comment_listByArticleId } from '@/api/comment';
import { user_findById } from '@/api/user';
import store from '@/store/store';
import { setTimeout } from 'timers';

export default {
  components: {
    headEr,
    pageTitle,
    mdView
  },
  data() {
    return {
      article: {},
      defaultArtical: {
        articleTitle: 'default',
        articleContent: '啥也没有'
      },
      loading: false,

      username: store.state.user.userName,
      comment: {
        articleId: 0,
        commenterId: store.state.user.userId,
        commentContent: ''
      },
      comment_loading: false,

      commentList: [],
      commentsCount: 0
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
    // 发表评论
    submitComment() {
      this.comment.articleId = this.article.id;
      console.log(this.comment);
      // 如果评论内容为空
      if (this.comment == '') {
        this.$message({
          showClose: true,
          message: '评论内容不能为空',
          type: 'error'
        })
      }
      // 评论内容不为空
      else {
        comment_insert(this.comment)
        .then(resp => {
          let data = resp.data;
          console.log(data);
          // 插入失败
          if (data.code == 0) {
            this.$message({
              showClose: true,
              message: data.msg,
              type: 'error'
            });
          }
          // 找插入成功
          else {
            this.$message({
              showClose: true,
              message: data.msg,
              type: 'success'
            });
            this.comment.commentContent = '';
          }
        })
        .catch(error => {
          this.$message({
            showClose: true,
            type: 'error',
            message: '出现了一个网络请求错误'
          });
          console.log(error);
        })
      }
    },
    // 根据 userid 获取 username
    setUserName(index, userId) {
      console.log('=====getUserName()======');
      user_findById(userId)
      .then(resp => {
        let data = resp.data;
        console.log(data);
        // 查找用户失败
        if (data.code == 0) {
          this.$message({
            showClose: true,
            message: data.msg,
            type: 'error'
          });
        }
        // 查找用户成功
        else {
          let user = JSON.parse(data.data);
          this.commentList[index].commenterName = user.name;
        }
      })
      .catch(error => {
        this.$message({
          showClose: true,
          type: 'error',
          message: '出现了一个网络请求错误'
        });
        console.log(error);
      })
    },
    // 获取文章的评论列表
    getCommentList() {
      console.log('=====getCommentList()======');
      comment_listByArticleId(this.article.id)
      .then(resp => {
        let data = resp.data;
        console.log(data);
        // 获取评论列表失败
        if (data.code == 0) {
          this.$message({
            showClose: true,
            message: data.msg,
            type: 'error'
          });
        }
        // 获取评论列表成功
        else {
          this.commentList = JSON.parse(data.data);
          let i;
          for (i = 0; i < this.commentList.length; i++) {
            this.setUserName(i, this.commentList[i].commenterId);
          }
          console.log(this.commentList);
        }
      })
      .catch(error => {
        this.$message({
          showClose: true,
          type: 'error',
          message: '出现了一个网络请求错误'
        });
        console.log(error);
      })
    },
    // 通过文章标题获取文章
    getArticle(articleTitle) {
      console.log('=====getArticle()======');
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
          // 获取评论列表
          this.getCommentList();
        }
      })
      // 请求响应异常
      .catch(error => {
        this.$message({
          showClose: true,
          type: 'error',
          message: '出现了一个网络请求错误'
        });
        console.log(error);
      });
    }
  },
  created() {
    this.loading = true;
    let articleTitle = this.$router.currentRoute.query.articleTitle;
    console.log(articleTitle);
    if (articleTitle != undefined) {
      this.getArticle(articleTitle);
      setTimeout(2000);
    }
    this.loading = false;
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

.comment-write {
  padding: 0 20px;
  padding-bottom: 20px;
}

.comment-username {
  margin-bottom: 10px;
  font-size: 20px;
}

.comments-title {
  padding: 0 20px;
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

  .comment-button {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
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

  .comment-button {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
