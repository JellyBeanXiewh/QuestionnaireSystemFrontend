<template>
  <div>
    <el-form-item
        label="题目"
        :prop="'content.' + index + '.question_content'"
        :rules="{
        required: true, message: '题目内容不能为空', trigger: 'blur'
      }"
    >
      <el-input v-model="content.question_content" placeholder="请输入题目内容" />
    </el-form-item>
  </div>
</template>

<script>
  export default {
    name: "TextQuestion",
    props: [
      'content',
      'index',
    ],
  }
</script>

<style scoped>

</style>
