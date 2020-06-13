<template>
  <div>
    <div
        v-for="(content, index) in questionList"
        :key="index"
        :class="['question-item', type]"
    >

      <div class="question-order">
        <div>Q{{ index + 1 }}：</div>
        <!-- 删除问题-->
        <div class="question-action" @click="delQuestion(index)">
          <i class="el-icon-delete-solid" />
        </div>
      </div>
      <div class="question-content">
        <el-card shadow="hover">
          <question-item
              :type="content.question_type"
              :content="content"
              :index="index"
              v-on="$listeners"
          />
        </el-card>
      </div>
    </div>
  </div>

</template>

<script>
  import QuestionItem from "./QuestionItem";

  export default {
    name: "QuestionList",
    components: {
      QuestionItem
    },
    props: {
      questionList: {
        type: Array,
      },
      type: {
        type: String,
        default: 'normal',
      }
    },
    methods: {
      delQuestion(index) {
        this.$emit('delQuestion', { index })
      }
    },
    created() {

    }
  }
</script>

<style scoped>
  .no-question {
    margin: 30px 0;
    font-size: 14px;
  }

  .question-item {
    display: flex;
    align-content: center;
    justify-content: flex-start;
    margin-bottom: 20px;
  }
  .question-item .question-order {
    flex: 60px 0 0;
    text-align: center;
  }
  .question-item .question-action:hover {
    color: #018fe5;
    cursor: pointer;
  }
  .question-item .question-content {
    flex: 1;
  }
</style>
