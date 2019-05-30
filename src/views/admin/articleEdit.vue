<template>
  <div>
    <my-title title="编辑文章"/>
    <el-form ref="article" :model="article" label-width="120px" :rules="rules">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="article.name"></el-input>
      </el-form-item>

      <el-form-item label="文章描述" prop="desc">
        <el-input type="textarea" v-model="article.desc" :rows="3"></el-input>
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

      <el-form-item label="上传文件">
        <el-upload
          ref="upload"
          drag
          :limit="1"
          action="https://jsonplaceholder.typicode.com/posts/"
          :auto-upload="false">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将<b>.md</b>文件拖到此处，或<em>点击上传</em></div>
          <!-- <div class="el-upload__tip" slot="tip">只能上传.md文件</div> -->
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('article')">发布</el-button>
        <el-button @click="resetForm('article')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import MyTitle from '@/components/title.vue';

export default {
  components: {
    MyTitle
  },
  data() {
    return {
      article: {
        title: '',
        desc: '',
        articleCategories: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入文章描述', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message('submit!');
        } else {
          this.$message.error('error submit!!');
          return false;
        }
      });
      this.$refs.upload.submit();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$refs.upload.clearFiles();
    }
  }
}
</script>
