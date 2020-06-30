<template>
  <div>
    <div v-if="this.isLogin === false" style="padding: 20px 40%;display: flex;flex-direction: column;">
      <el-button type="primary" size="medium" @click="handleRouter('/login')">登录后评论</el-button>
    </div>
    <div v-else class="comment-write" v-loading="commentWrite_loading">
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
        v-model="comment.content">
      </el-input>
      <!-- comment content -->

      <div class="comment-button">
        <el-button @click="comment = ''" round>取消</el-button>
        <el-button type="primary" @click="submitComment" round>发表</el-button>
      </div>
      <!-- comment button -->
    </div>
    <!-- comment write -->

    <div>
      <div class="comments-title">
        <span style="font-size: 20px;font-weight: 700;">全部评论</span>
      </div>

      <div class="comment-one" v-for="item in commentList">
        <div class="comment-info">
          <div class="comment-author" :style="{color:getUsernameColor(item.username)}">
            {{ item.username }}
          </div>
          <div class="comment-date">
            {{ item.publishDate }}
          </div>
        </div>
        <p>
          {{ item.content }}
        </p>
      </div>
    </div>
    <!-- comments list -->
  </div>
</template>

<script>
import { comment_insert, comment_listByArticleId } from '@/api/comment';
import store from '@/store/store';

export default {
  props: {
    articleId: {
      type: Number
    }
  },
  data() {
    return {
      isLogin: store.state.user.isLogin,
      username: store.state.user.userName,
      comment: {
        articleId: 0,
        content: ''
      },
      commentWrite_loading: false,
      commentList_loading: false,
      commentList: [],        // 评论列表
      commentList_page: 1,    // 评论列表的页号
      commentList_size: 50,   // 评论列表每页的评论数
    }
  },
  methods: {
    // 发表评论
    submitComment() {
      this.commentWrite_loading = true; // 设置评论区为加载状态
      this.comment.articleId = this.articleId;
      console.log(this.comment);
      // 如果评论内容为空
      if (this.comment.content === '') {
        this.$message.error('评论内容不能为空');
        this.commentWrite_loading = false;
      }
      // 评论内容不为空
      else {
        comment_insert(this.comment)
        .then(resp => {
          console.log(resp);
          this.comment.content = '';
          this.commentWrite_loading = false;
          this.$message.success('发表成功');
          this.getCommentList(this.articleId);
        })
        .catch(error => {
          console.log(error);
          this.commentWrite_loading = false;
        })
      }
    },
    // 通过一个hash函数得到用户名的颜色
    getUsernameColor (username) {
      var COLORS = [
        '#e21400', '#91580f', '#f8a700', '#f78b00',
        '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
        '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
      ];
      // Compute hash code
      var hash = 666;
      for (var i = 0; i < username.length; i++) {
        hash = username.charCodeAt(i) + (hash << 5) - hash;
      }
      // Calculate color
      var index = Math.abs(hash % COLORS.length);
      return COLORS[index];
    },
    // 根据 page, size 懒加载评论列表
    getCommentList() {
      console.log('=====getCommentList()======');
      this.commentList_loading = true;  // 设置评论列表为加载状态
      // 根据 page, size 值获取评论列表
      comment_listByArticleId(this.articleId, this.commentList_page, this.commentList_size)
      .then(resp => {
        this.commentList = JSON.parse(resp.data.data);
        console.log('commentList--->', this.commentList);
        this.commentList_loading = false; // 设置评论列表为非加载状态
      })
      .catch(error => {
        console.log(error);
        this.commentList_loading = false;
      })
    },
    handleRouter(router) {
      this.$router.push(router);
    }
  },
  // 监听变量，一旦变化，即执行相应操作
  watch: {
    articleId(articleId) {
      this.getCommentList();
    }
  }
}
</script>

<style>
.comment-write {
  padding-bottom: 20px;
}

.comment-username {
  margin-bottom: 10px;
  font-size: 20px;
}

.comments-title {
  padding-bottom: 20px;
}

.comment-one {
  padding: 20px 0 30px;
  border-top: 1px solid #f0f0f0;
}

.comment-info {
  margin-bottom: 15px;
}

.comment-author {
  font-size: 20px;
  font-weight: bold;
  color:#000;
  margin-bottom: 5px;
}

.comment-date {
  font-size: 10px;
  color: #969696;;
}

.comment-button {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
