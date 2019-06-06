<template>
  <div>
    <page-title title="评论列表"/>
    <el-table
      v-loading="tableLoading"
      :data="commentList"
      element-loading-text="Loading"
      fit
      border
      highlight-current-row>

      <el-table-column
        label="#"
        width="50">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>

      <el-table-column
        label="文章标题"
        width="180">
        <template slot-scope="scope">
          <el-tag size="medium">
            <router-link :to="{ path: '/article', query: { articleTitle: scope.row.articleTitle }}">
              {{ scope.row.articleTitle }}
            </router-link>
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="评论者用户名"
        width="180">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.commenterName }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="评论时间"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.commentDate }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="评论内容">
        <template slot-scope="scope">
          {{ scope.row.commentContent }}
        </template>
      </el-table-column>
      
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="danger"
            icon="el-icon-delete"
            @click="deleteComment(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { comment_listAll, comment_delete } from '@/api/comment';
import { article_findById } from '@/api/article';
import { user_findById } from '@/api/user';
import pageTitle from '@/components/pageTitle';

export default {
  components: {
    pageTitle
  },
  data() {
    return {
      tableLoading: false,
      commentList: [],
      articleList: [],
      userList: []
    }
  },
  methods: {
    // 获取用户列表
    getCommentList() {
      this.tableLoading = true;
      comment_listAll(1, 50)
      .then((resp) => {
        console.log(resp.data);
        this.commentList = resp.data.list;
        console.log('commentList ---> ', this.commentList);
        this.tableLoading = false;
      }).catch((error) => {
        this.$message({
          showClose: true,
          type: 'error',
          message: '出现了一个网络请求错误'
        });
        console.log(error);
        this.tableLoading = false;
      })
    },
    // 删除用户
    deleteComment(comment) {
      console.log(comment);
      // 弹框询问
      this.$confirm('确定要删除这条评论吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      // 若确定，则调用api进行删除
      .then(() => {
        comment_delete(comment.id)
        // 请求响应正常
        .then(resp => {
          var data = resp.data;
          console.log(data);
          // 删除失败
          if (data.code == 0) {
            this.$message({
              showClose: true,
              message: data.msg,
              type: 'error'
            });
          }
          // 删除成功
          else {
            this.$message({
              message: data.msg,
              type: 'success'
            });
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
      })
    }
  },
  created() {
    this.getCommentList();
  },
}
</script>