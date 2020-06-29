<template>
  <div>
    <page-title title="编辑文章"/>
    <el-form ref="article" :model="article" label-width="120px" :rules="rules" size="mini">
      <el-form-item size="medium" class="headerButton">
        <el-button @click="resetForm('article')" icon="el-icon-refresh-right">  重置  </el-button>
        <el-button type="primary" @click="submitForm('article')" icon="el-icon-s-promotion">  发布  </el-button>
      </el-form-item>

      <el-form-item label="文章标题" prop="title">
        <el-input v-model="article.title" clearable></el-input>
      </el-form-item>

      <el-form-item label="文章描述" prop="summary">
        <el-input type="textarea" v-model="article.summary" :rows="3"></el-input>
      </el-form-item>

      <el-form-item label="文章分类">
        <el-select v-model="article.categories" placeholder="请选择分类">
          <el-option label="分类一" value="category1"></el-option>
          <el-option label="分类二" value="category2"></el-option>
          <el-option label="分类三" value="category3"></el-option>
          <el-option label="分类四" value="category4"></el-option>
          <el-option label="分类五" value="category5"></el-option>
          <el-option label="分类六" value="category6"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="文章内容" size="medium">
        <div class="contentTitle">
          <el-button size="small " icon="el-icon-view" @click="previewVisible = true">打开预览</el-button>
          <el-button size="small" icon="el-icon-refresh" style="margin-left:0" @click="clearContent()">清空</el-button>
        </div>
        <el-input v-model="article.content"
                  type="textarea"
                  :autosize="{ minRows: 30, maxRows: 99999 }"
                  resize="none"
                  placeholder="可以使用markdown语法">
        </el-input>
        <el-dialog
          title="预览"
          :visible.sync="previewVisible"
          :fullscreen="true">
          <!-- :before-close=""> -->
          <md-view :content="compiledMd()"/>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="previewVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </el-form-item>

      <!-- <el-form-item label="上传文件">
        <el-upload
          ref="upload"
          drag
          :limit="1"
          action="https://jsonplaceholder.typicode.com/posts/"
          :auto-upload="false">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将<b>.md</b>文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传.md文件</div>
        </el-upload>
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
import pageTitle from '@/components/pageTitle';
import mdView from '@/components/mdView';
import marked from 'marked';
import { article_insert, article_update, article_findByTitle } from '@/api/article';

export default {
  components: {
    pageTitle,
    mdView
  },
  data() {
    return {
      todo: 'insert',
      previewVisible: false,
      article: {
        title: '',
        summary: '',
        categories: '',
        content: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' }
        ],
        summary: [
          { required: true, message: '请输入文章描述', trigger: 'blur' }
        ],
      }
    }
  },
  created() {
    let title = this.$router.currentRoute.query.title;
    console.log(title);
    if (title != undefined) {
      this.todo = 'update';
      this.getArticle(title);
    }
  },
  methods: {
    // 通过文章标题获取文章
    getArticle(title) {
      article_findByTitle(title)
      .then(resp => {
        console.log(resp);
        this.article = JSON.parse(resp.data.data);
      })
      // 请求响应异常
      .catch(error => {
        console.log(error);
      });
    },

    // 清空文章内容
    clearContent() {
      this.$confirm('确定要清空文章内容吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.article.content = '';
        this.$message.success('清空成功!');
      })
    },

    // 字符串转换markdown
    compiledMd() {
      var md = marked(this.article.content, { sanitize: true });
      if (this.article.content == '') {
        md = '啥也没有'
      }
      return md;
    },

    // 提交表单
    submitForm(formName) {
      // el-form自带的验证
      this.$refs[formName].validate((valid) => {
        // 如果表单验证通过
        if (valid) {
          console.log(this.article);
          // 判断是 insert 还是 update
          if (this.todo == 'insert') {
            article_insert(this.article)
            .then(resp => {
              console.log(resp);
              this.$message.success('新建成功');
              this.$router.push('/admin/articleList');
            })
            .catch(error => {
              console.log(error);
            });
          } else if (this.todo == 'update') {
            article_update(this.article)
            .then(resp => {
              console.log(resp);
              this.$message.success('更新成功');
              this.$router.push('/admin/articleList');
            })
            .catch(error => {
              console.log(error);
            });
          } else {
            this.$message.error("!!!");
          }
        }
        // 表单验证未通过
        else {
          this.$message.error('验证错误');
        }
      });
    },

    // 重置表单
    resetForm(formName) {
      this.$confirm('确定要重置所有内容吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$refs[formName].resetFields();
        $message.success('清空成功!');
      })
    }
  }
}
</script>

<style>
.headerButton {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 20px;
}

.contentTitle {
  background: #f6f6f6d5;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.contentTitle .el-button {
  border-radius: 0;
}
</style>
