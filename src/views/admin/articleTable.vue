<template>
  <div>
    <page-title title="文章列表"/>
    <el-button type="primary" icon="el-icon-plus" style="margin-bottom:10px" @click="handleRouter('/admin/articleEdit')">创建文章</el-button>
    <el-table
      v-loading="tableLoading"
      :data="articleList"
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
          {{ scope.row.articleTitle }}
        </template>
      </el-table-column>

      <el-table-column
        label="文章摘要">
        <template slot-scope="scope">
          {{ scope.row.articleTabloid }}
        </template>
      </el-table-column>

      <el-table-column
        label="发布日期"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.publishDate }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="更新日期"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.updateDate }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="阅读量"
        width="100">
        <template slot-scope="scope">
          {{ scope.row.reads }}
        </template>
      </el-table-column>

      <el-table-column
        label="分类"
        width="150">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.articleCategories }}</el-tag>
        </template>
      </el-table-column>
      
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            icon="el-icon-edit"
            @click="editArticle(scope.row)">编辑</el-button>
          <el-button
            size="small"
            type="danger"
            icon="el-icon-delete"
            @click="deleteArticle(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { article_listAll, article_delete } from '@/api/article';
import pageTitle from '@/components/pageTitle';

export default {
  components: {
    pageTitle
  },
  data() {
    return {
      tableLoading: false,
      articleList: []
    }
  },
  methods: {
    // 获取文章列表
    getArticleList() {
      this.tableLoading = true;
      article_listAll(1, 50).then((resp) => {
        this.articleList = resp.data.list;
        console.log(this.articleList);
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
    // 路由处理
    handleRouter(router) {
      this.$router.push(router);
    },
    // 编辑文章
    editArticle(article) {
      console.log(article);
      this.$router.push({ path: '/admin/articleEdit', query: { articleTitle: article.articleTitle }})
    },
    // 删除文章
    deleteArticle(article) {
      console.log(article);
      // 弹框询问
      this.$confirm('确定要清空文章内容吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      // 若确定，则调用api进行删除
      .then(() => {
        article_delete(article.id)
        // 请求响应正常
        .then(resp => {
          let data = resp.data;
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
            this.getArticleList();
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
    this.getArticleList();
  },
}
</script>