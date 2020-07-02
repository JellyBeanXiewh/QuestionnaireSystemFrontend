<template>
  <div v-loading.fullscreen.lock="loading" class="view-layout">
<!--    <div v-if="isNotPublish" class="main">-->
    <div v-if="false" class="main">
      <div class="header">
        <h1>问卷未发布！</h1>
      </div>
      <div class="content">
        <p>您所填写的问卷未发布，暂不能填写。</p>
      </div>
    </div>
<!--    <div v-else-if="isExpired" class="main">-->
<!--      <div class="header">-->
<!--        <h1>问卷已过期！</h1>-->
<!--      </div>-->
<!--      <div class="content">-->
<!--        <p>您所填写的问卷已到截止日期，暂不能填写。</p>-->
<!--      </div>-->
<!--    </div>-->
    <div v-else-if="naire" class="main">
      <div class="header">
        <h1>{{ info.Q_Name }}</h1>
      </div>
      <div class="content">
        <div class="intro">
          <p class="mt-10">截止日期：{{ info.Q_Deadline_Date | formatDate }}</p>
        </div>

        <question-list v-loading.fullscrean.lock="false" :question-list="naire.content"></question-list>

        <div class="text-center">
<!--          <el-button-->
<!--              v-if="isAdmin"-->
<!--              type="success"-->
<!--              @click="goBack"-->
<!--          >返回管理平台-->
<!--          </el-button>-->
          <el-button
              type="primary"
              :loading="finished"
              :disabled="info.state !== 1"
              @click="submitNaire"
          >
            提交问卷
          </el-button>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>问卷系统</p>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import QuestionList from "./Question/QuestionList";

  export default {
    name: "Naire",
    components: {
      QuestionList,
    },
    data() {
      return {
        Q_ID: this.$route.params.id,
        info: {},
        naire: {},
        finished: false,
        loading: false,
      }
    },
    methods: {
      getInfo() {
        const path = `/questionnaireInfo/?Q_ID=${this.Q_ID}`;
        axios.get(path)
          .then((res) => {
            this.info = res.data;
          })
          .catch((error) => {
            switch (error.msg) {
              case null:
              case 1:
                this.$router.push({ name: '404' });
                break;
              case 100:
                this.$message.error('请将信息填写完整');
                break;
              default:
                this.$message.error('网络连接超时，请检查网络或稍后再试');
            }
          })
      },
      getNaire() {
        const path = `/questionnaireGet/?Q_ID=${this.Q_ID}`;
        axios.get(path)
          .then((res) => {
            this.naire = res.data;
          })
          .catch((error) => {
            switch (error.msg) {
              case 100:
                this.$message.error('请将信息填写完整');
                break;
              default:
                this.$message.error('网络连接超时，请检查网络或稍后再试');
            }
          })
      },
      validateNaire() {
        let valid = true;
        this.naire.content.forEach((item) => {
          switch (item.question_type) {
            case 0:
              if (!(item.op)) {
                valid = false
              }
              break;
            case 1:
              if (!(item.op && item.op.length > 0)) {
                valid = false
              }
              break;
            case 2:
              if (!(item.text && item.text.trim().length > 0)) {
                valid = false;
              }
              break;
          }
        })
        if (!valid) {
          this.$message.warning('请将问卷填写完整');
        }
        return valid;
      },
      submitNaire() {
        if (this.validateNaire()) {
          this.finished = true;
          const payload = {
            Q_ID: this.Q_ID,
            content: [],
          }
          this.naire.content.forEach((item) => {
            let question_content = {
              question_id: item.question_id,
              question_type: item.question_type,
            };
            switch (item.question_type) {
              case 0:
                question_content.option = [item.op];
                break;
              case 1:
                question_content.option = item.op.sort();
                break;
              case 2:
                question_content.content = item.text;
                break;
            }
            payload.content.push(question_content)
          })
          const path = '/questionnaireSubmit/';
          axios.post(path, payload)
            .then(() => {
              this.finished = false;
              this.$router.push({ name: 'Complete' });
            })
            .catch((error) => {
              switch (error.msg) {
                case 1:
                  this.$message.error('格式错误');
                  break;
                case 2:
                  this.$message.error('问卷不可用');
                  break;
                case 100:
                  this.$message.error('请将问卷填写完整');
                  break;
                default:
                  this.$message.error('网络连接超时，请检查网络或稍后再试');
              }
            })
        }
      },
    },
    filters: {
      formatDate(val) {
        const timestamp = new Date(Number(val) * 1000)
        return timestamp.getFullYear() + '-' + (timestamp.getMonth() + 1) + '-' + timestamp.getDate()
      },
    },
    created() {
      this.getInfo();
      this.getNaire();
    }
  }
</script>

<style scoped>
  .view-layout {
    background-color: #edf0f8;
    min-height: 100vh;
    max-height: 100%;
    height: 100%;
    width: 100%;
    padding: 20px 10px;
    font-size: 14px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .view-layout .main {
    max-width: 800px;
    width: 100%;
    height: auto;
    margin: 0 auto;
    padding-bottom: 30px;
    background-color: #fff;
    box-shadow: 0 2px 5px 1px rgba(124, 124, 124, 0.2);
  }
  .view-layout .header {
    padding: 30px 20px;
    height: auto;
    min-height: 33px;
    border-bottom: 2px dotted #eee;
  }
  .view-layout .header h1 {
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }
  .view-layout .content {
    padding: 20px;
    text-align: left;
    font-size: inherit;
  }
  .view-layout .content .intro {
    margin: 10px 0;
  }
  .view-layout .footer {
    margin-top: 10px;
    padding-top: 10px;
    text-align: center;
    border-top: 1px dotted #eee;
  }

  .code-row-bg button {
    margin: 0 10px;
  }
</style>
