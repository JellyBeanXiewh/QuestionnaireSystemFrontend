<template>
  <div class="create">
    <el-form ref="form" :model="form" :rules="rules" label-position="right" label-width="100px">
      <el-form-item label="问卷名称" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="问卷介绍" prop="intro">
        <el-input v-model="form.intro" type="textarea" rows="5" />
      </el-form-item>

      <div class="add-option">
        <el-button type="primary" @click="addOption(questionType.SINGLE_CHOICE)">单选题</el-button>
        <el-button type="primary" @click="addOption(questionType.MULTIPLE_CHOICE)">多选题</el-button>
        <el-button type="primary" @click="addOption(questionType.TEXT_QUESTION)">文本题</el-button>
      </div>

<!--      <question-list-->
<!--          :question-list="form.topic"-->
<!--          @delQuestion="onDelQuestion"-->
<!--          @addOption="onAddOption"-->
<!--          @delOption="onDelOption"-->
<!--      />-->

      <el-form-item label="截止时间" prop="deadline">
        <el-date-picker
            v-model="form.deadline"
            type="datetime"
            :picker-options="datePickerOptions"
            placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="default" @click="submitNaire(NaireStatus.UNPUBLISHED)">保存问卷</el-button>
        <el-button type="success" @click="submitNaire(NaireStatus.PUBLISHED)">发布问卷</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "Create",
    data() {
      return {
        form: {
          title: '',
          intro: '',
          deadline: '',
          status: 0,
          options: '',
          topic: []
        },
        rules: {
          title: [
            { required: true, message: '请输入问卷标题', trigger: 'blur' }
          ],
          deadline: [
            { required: true, message: '请选择截止时间', trigger: 'blur' }
          ]
        }
      }
    }
  }
</script>

<style scoped>
  .create .add-option {
    margin-bottom: 20px;
    text-align: center;
  }
</style>
