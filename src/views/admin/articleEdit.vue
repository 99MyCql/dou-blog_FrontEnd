<template>
  <div>
    <page-title title="编辑文章"/>
    <el-form ref="article" :model="article" label-width="120px" :rules="rules" size="mini">
      <el-form-item size="medium" class="headerButton">
        <el-button @click="resetForm('article')" icon="el-icon-refresh-right">  重置  </el-button>
        <el-button type="primary" @click="submitForm('article')" icon="el-icon-s-promotion">  发布  </el-button>
      </el-form-item>

      <el-form-item label="文章标题" prop="articleTitle">
        <el-input v-model="article.articleTitle" clearable></el-input>
      </el-form-item>

      <el-form-item label="文章描述" prop="articleTabloid">
        <el-input type="textarea" v-model="article.articleTabloid" :rows="3"></el-input>
      </el-form-item>

      <el-form-item label="文章分类">
        <el-select v-model="article.articleCategories" placeholder="请选择分类">
          <el-option label="分类一" value="categories1"></el-option>
          <el-option label="分类二" value="categories2"></el-option>
          <el-option label="分类三" value="categories3"></el-option>
          <el-option label="分类四" value="categories4"></el-option>
          <el-option label="分类五" value="categories5"></el-option>
          <el-option label="分类六" value="categories6"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="文章内容" size="medium">
        <div class="contentTitle">
          <el-button size="small " icon="el-icon-view" @click="previewVisible = true">打开预览</el-button>
          <el-button size="small" icon="el-icon-refresh" style="margin-left:0" @click="clearContent()">清空</el-button>
        </div>
        <el-input v-model="article.articleContent"
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
          <div v-html="compiledMd()" class="mdPreview"></div>
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
import marked from 'marked';
import { article_submit, article_findByArticleTitle } from '@/api/article';

export default {
  components: {
    pageTitle
  },
  data() {
    return {
      previewVisible: false,
      article: {
        articleTitle: '',
        articleTabloid: '',
        articleCategories: '',
        articleContent: ''
      },
      rules: {
        articleTitle: [
          { required: true, message: '请输入文章标题', trigger: 'blur' }
        ],
        articleTabloid: [
          { required: true, message: '请输入文章描述', trigger: 'blur' }
        ],
      }
    }
  },
  created() {
    let articleTitle = this.$router.currentRoute.query.articleTitle;
    console.log(articleTitle);
    if (articleTitle != undefined) {
      this.getArticle(articleTitle);
    }
  },
  methods: {
    // 通过文章标题获取文章
    getArticle(articleTitle) {
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
    },

    // 清空文章内容
    clearContent() {
      this.$confirm('确定要清空文章内容吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.article.articleContent = '';
        this.$message({
          type: 'success',
          message: '清空成功!'
        });
      })
    },

    // 字符串转换markdown
    compiledMd() {
      var md = marked(this.article.articleContent, { sanitize: true });
      if (this.article.articleContent == '') {
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
          article_submit(this.article)
          // 请求响应成功
          .then(resp => {
            let data = resp.data;
            console.log(data);
            // 提交失败
            if (data.code == 0) {
              this.$message({
                showClose: true,
                type: 'error',
                message: data.msg
              });
            }
            // 提交成功
            else {
              this.$message.success(data.msg);
              this.$router.push('/admin/articleTable');
            }
          })
          // 请求响应失败
          .catch(error => {
            console.log(error);
            this.$message({
                showClose: true,
                type: 'error',
                message: '出现了一个网络请求错误'
              })
          });
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
        this.$message({
          type: 'success',
          message: '清空成功!'
        });
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

.mdPreview {
  display: inline-block;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  border: #333;
  background-color: #f6f6f6;
  font-size: 20px;
  font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
}

code {
  color: #f66;
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
