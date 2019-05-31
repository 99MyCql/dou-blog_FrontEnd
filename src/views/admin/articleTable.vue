<template>
  <div>
    <my-title title="文章列表"/>
    <el-button type="primary" icon="el-icon-plus" style="margin-bottom:10px" @click="handleRouter('/admin/articleEdit')">创建文章</el-button>
    <el-table
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
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="small"
            type="danger"
            icon="el-icon-delete"
            @click="deleteArticle(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { article_listAll } from '@/api/article.js';
import MyTitle from '@/components/title.vue';

export default {
  components: {
    MyTitle
  },
  data() {
    return {
      articleList: []
    }
  },
  beforeCreate() {
    article_listAll(1, 50).then((resp) => {
      this.articleList = resp.data.list;
      console.log(this.articleList);
    }).catch((error) => {
      // this.$message.error('获取数据错误');
      console.log(error);
    })
  },
  methods: {
    handleRouter(router) {
      this.$router.push(router);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
}
</script>