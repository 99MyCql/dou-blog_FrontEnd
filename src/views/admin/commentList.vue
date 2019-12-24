<template>
  <div>
    <page-title title="评论列表"/>

    <div style="margin-bottom:10px;display: flex;align-items: center;justify-content: space-between;">
      <el-pagination
        background
        layout="sizes, prev, pager, next, jumper"
        :total="commentList_max"
        :page-size="commentList_size"
        @size-change="pageSizeChange"
        @current-change="showCurPage"
        @prev-click="showPrePage"
        @next-click="showNextPage">
      </el-pagination>
      <!-- 分页器 -->

      <el-button type="danger" icon="el-icon-delete" @click="deleteCommentList"> 批量删除 </el-button>
      <!-- 批量删除按钮 -->
    </div>

    <el-table
      v-loading="tableLoading"
      :data="commentList"
      element-loading-text="Loading"
      fit
      border
      highlight-current-row
      @selection-change="itemSelected">

      <el-table-column
        type="selection"
        width="50">
      </el-table-column>

      <el-table-column
        label="评论内容">
        <template slot-scope="scope">
          {{ scope.row.commentContent }}
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

      <el-table-column label="操作" min-width="100">
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
import { comment_listAll, comment_delete, count_comments } from '@/api/comment';
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
      commentList: [],            // 评论列表
      commentList_page: 1,        // 评论列表的页号
      commentList_size: 10,       // 评论列表每页的用户数量
      commentList_max: 100,       // 评论列表的最大长度
      commentList_selected: [],   // 被选择的评论
      articleList: [],
      userList: []
    }
  },
  methods: {
    // 当某几个评论被用户选择时，调用
    itemSelected(selection) {
      console.log("comment item selected--->", selection);
      this.commentList_selected = selection;
    },
    // 当每页数量发生改变时
    pageSizeChange(page_size) {
      this.commentList_size = page_size;
      this.getCommentList();
    },
    // 展示当前页的用户列表
    showCurPage(curPage) {
      this.commentList_page = curPage;
      console.log(this.commentList_page);
      this.getCommentList();
    },
    // 展示上一页的用户列表
    showPrePage() {
      this.commentList_page--;
      this.getCommentList();
    },
    // 展示下一页的用户列表
    showNextPage() {
      this.commentList_page++;
      this.getCommentList();
    },
    /**
     * 获取用户列表
     */
    getCommentList() {
      this.tableLoading = true;
      comment_listAll(this.commentList_page, this.commentList_size)
      .then((resp) => {
        console.log(resp);
        this.commentList = JSON.parse(resp.data.data); // JSON解析后端返回数据(resp.data)中的data字段
        console.log('commentList--->', this.commentList);
        this.tableLoading = false;
      }).catch((error) => {
        console.log(error);
        this.tableLoading = false;
      })
    },
    /**
     * 批量删除评论
     */
    deleteCommentList() {
      // 弹框询问
      this.$confirm('确定要删除这些评论吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      // 若确定，则调用api进行删除
      .then(() => {
        let len = this.commentList_selected.length; // 待遍历列表长度
        if (len == 0) {
          this.$message.warning('没有勾选评论项');
          return;
        }

        // 遍历被选中的评论
        let i = 0;        // 从0开始遍历
        let that = this;  // 保存当前对象
        // 定义一个递归函数来实现顺序请求(上一个删除结束，再进行下一个)。由于js异步问题，for循环删除并非顺序，而且无法得知删除到第几个
        let fun = function () {
          comment_delete(that.commentList_selected[i].id)
          // 请求响应正常，接收到返回数据
          .then(resp => {
            console.log(resp);
            // 如果删除完毕
            if (i == len-1) {
              that.getCommentList();        // 重新获取列表
              that.commentList_max -= len;  // 评论列表数量 -= len
              that.$message.success('删除成功');
            }
            else {
              i++;    // 指向下一个待删除评论
              fun();  // 递归删除
            }
          })
          // 请求响应异常
          .catch(error => {
            console.log(error);
          });
        }
        fun();
      });
    },
    /**
     * 删除评论
     */
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
          console.log(resp);
          this.getCommentList();  // 重新获取评论列表
          this.commentList_max--; // 评论列表长度--
          this.$message.success('删除成功');
        })
        // 请求响应异常
        .catch(error => {
          console.log(error);
        });
      })
    }
  },
  created() {
    this.getCommentList();
    count_comments().then(resp => {
      console.log(resp);
      this.commentList_max = parseInt(resp.data.data);
      console.log('commentList_max--->', this.commentList_max);
    }).catch(error => {
      console.log(error);
    });
  },
}
</script>