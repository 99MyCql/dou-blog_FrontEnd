<template>
  <div>
    <page-title title="用户列表"/>

    <div style="margin-bottom:10px;display: flex;align-items: center;justify-content: space-between;">
      <el-pagination
        background
        layout="sizes, prev, pager, next, jumper"
        :total="userList_max"
        :page-size="userList_size"
        @size-change="pageSizeChange"
        @current-change="showCurPage"
        @prev-click="showPrePage"
        @next-click="showNextPage">
      </el-pagination>
      <!-- 分页器 -->

      <el-button type="danger" icon="el-icon-delete" @click="deleteUserList"> 批量删除 </el-button>
      <!-- 批量删除按钮 -->
    </div>

    <el-table
      v-loading="tableLoading"
      :data="userList"
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

      <el-table-column label="操作" width="100">
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
      userList: [],           // 用户列表
      userList_page: 1,       // 用户列表的页号
      userList_size: 10,      // 用户列表每页的用户数量
      userList_max: 100,      // 用户列表最大长度
      userList_selected: []   // 被选择的评论
    }
  },
  methods: {
    // 当某几个用户被选择时，调用
    itemSelected(selection) {
      console.log("user item selected--->", selection);
      this.userList_selected = selection;
    },
    // 当每页数量发生改变时
    pageSizeChange(page_size) {
      this.userList_size = page_size;
      this.getUserList();
    },
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
    /**
     * 批量删除用户
     */
    deleteUserList() {
      // 弹框询问
      this.$confirm('确定要删除这些用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      // 若确定，则调用api进行删除
      .then(() => {
        let len = this.userList_selected.length; // 待遍历列表长度
        if (len == 0) {
          this.$message.warning('没有勾选用户项');
          return;
        }

        // 遍历被选中的用户
        let i = 0;        // 从0开始遍历
        let that = this;  // 保存当前对象
        // 定义一个递归函数来实现顺序请求(上一个删除结束，再进行下一个)。由于js异步问题，for循环删除并非顺序，而且无法得知删除到第几个
        let fun = function () {
          user_delete(that.userList_selected[i].id)
          // 请求响应正常，接收到返回数据
          .then(resp => {
            console.log(resp);
            // 如果删除完毕
            if (i == len-1) {
              that.getUserList(); // 重新获取列表
              this.$message.success('删除成功');
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
     * 删除用户
     */
    deleteUser(user) {
      console.log(user);
      // 弹框询问
      this.$confirm('确定删除该用户吗?', '提示', {
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
    this.getUserList();
  },
}
</script>