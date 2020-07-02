<template>
  <div>
    <div
        v-for="content in questionList"
        :key="content.question_id"
        :class="['question-item', type]"
    >
      <div class="question-order">
        <div class="title">
          Q{{ content.question_id + 1 }}：
          [{{ typeText(content.question_type) }}] {{ content.question_content }}
<!--          <span v-if="topic.isRequired" style="color: #f00;">*</span>-->
        </div>
      </div>
      <div class="question-content">
        <question-item
            :type="content.question_type"
            :content.sync="content"
            :index="content.question_id"
            v-on="$listeners"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import QuestionItem from "./QuestionItem";

  export default {
    name: "QuestionList",
    components: {
      QuestionItem,
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
      typeText(type) {
        switch (type) {
          case 0:
            return '单选题';
          case 1:
            return '多选题';
          case 2:
            return '文字题';
        }
      }
    }
  }
</script>

<style scoped>
  .no-question {
    margin: 30px 0;
    font-size: 14px;
  }

  .question-item {
    width: 100%;
    padding: 20px;
    margin-bottom: 20px;
    box-sizing: border-box;
  }
  .question-item:hover {
    background: rgba(238, 238, 238, 0.47);
  }
  .question-item .question-order {
    width: 100%;
  }
  .question-item .question-order .title {
    font-size: 16px;
    font-weight: bold;
  }
  .question-item .question-order .desc {
    font-size: 12px;
  }
</style>
