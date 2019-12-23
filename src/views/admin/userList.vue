<template>
  <div>
    <page-title title="用户列表"/>

    <el-pagination
      style="margin-bottom:10px;"
      background
      layout="prev, pager, next"
      :total="100"
      :page-size="userList_size"
      @current-change="showCurPage"
      @prev-click="showPrePage"
      @next-click="showNextPage">
    </el-pagination>
    <!-- 分页器 -->

    <el-table
      v-loading="tableLoading"
      :data="userList"
      element-loading-text="Loading"
      fit
      border
      highlight-current-row>

      <el-table-column
        type="selection"
        width="50">
      </el-table-column>

      <el-table-column
        label="用户名"
        width="150">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.name }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="个性签名">
        <template slot-scope="scope">
          {{ scope.row.personalBrief }}
        </template>
      </el-table-column>

      <el-table-column
        label="出生日期"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.birthday }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="QQ"
        width="150">
        <template slot-scope="scope">
          {{ scope.row.qq }}
        </template>
      </el-table-column>

      <el-table-column
        label="Email"
        width="180">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>

      <el-table-column
        label="电话"
        width="150">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="danger"
            icon="el-icon-delete"
            @click="deleteUser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { user_listAll, user_delete } from '@/api/user';
import pageTitle from '@/components/pageTitle';

export default {
  components: {
    pageTitle
  },
  data() {
    return {
      tableLoading: false,
      userList: [],     // 用户列表
      userList_page: 1, // 用户列表的页号
      userList_size: 10 // 用户列表每页的用户数量
    }
  },
  methods: {
    // 展示当前页的用户列表
    showCurPage(curPage) {
      this.userList_page = curPage;
      console.log(this.userList_page);
      this.getUserList();
    },
    // 展示上一页的用户列表
    showPrePage() {
      this.userList_page--;
      this.getUserList();
    },
    // 展示下一页的用户列表
    showNextPage() {
      this.userList_page++;
      this.getUserList();
    },
    // 获取用户列表
    getUserList() {
      this.tableLoading = true; // 设置列表加载状态为 true
      user_listAll(this.userList_page, this.userList_size).then((resp) => {
        console.log(resp);
        this.userList = JSON.parse(resp.data.data); // JSON解析后端返回数据(resp.data)中的data字段
        console.log('userList--->', this.userList);
        this.tableLoading = false;
      }).catch((error) => {
        console.log(error);
        this.tableLoading = false;
      })
    },
    // 路由处理
    handleRouter(router) {
      this.$router.push(router);
    },
    // 删除用户
    deleteUser(user) {
      console.log(user);
      // 弹框询问
      this.$confirm('确定要清空文章内容吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      // 若确定，则调用api进行删除
      .then(() => {
        user_delete(user.id)
        // 请求响应正常
        .then(resp => {
          console.log(resp);
          this.getUserList();
        })
        // 请求响应异常
        .catch(error => {
          console.log(error);
        });
      })
    }
  },
  created() {
    this.getUserList();
  },
}
</script>