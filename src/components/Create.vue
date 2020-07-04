<template>
  <div class="create">
    <el-form ref="form" :model="naire" :rules="rules" label-position="right" label-width="100px">
      <el-form-item label="问卷名称" prop="Q_name">
        <el-input v-model="naire.Q_name" />
      </el-form-item>

      <div class="add-option">
        <el-button type="primary" @click="addQuestion(0)">单选题</el-button>
        <el-button type="primary" @click="addQuestion(1)">多选题</el-button>
        <el-button type="primary" @click="addQuestion(2)">文本题</el-button>
      </div>

      <question-list
          :question-list="naire.content"
          @delQuestion="onDelQuestion"
          @addOption="onAddOption"
          @delOption="onDelOption"
      ></question-list>

<!--      <el-form-item label="截止时间" prop="deadline">-->
<!--        <el-date-picker-->
<!--            v-model="naire.deadline"-->
<!--            type="datetime"-->
<!--            :picker-options="datePickerOptions"-->
<!--            placeholder="选择日期时间"-->
<!--        />-->
<!--      </el-form-item>-->

      <el-form-item>
        <el-button type="default" @click="save">保存问卷</el-button>
        <el-button type="success" @click="showDeadlineDialog = true">发布问卷</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
        title="创建问卷"
        :visible="showCreateDialog"
        :before-close="handleCancelCreate"
        width="30%"
    >
      <el-form
          ref="title_form"
          :model="title_form"
          :rules="title_rules"
          label-position="right"
          label-width="100px"
          @keyup.enter="handleCreate"
      >
        <el-form-item label="问卷名称" prop="Q_title">
          <el-input v-model="title_form.Q_title"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleCreate">确认</el-button>
        <el-button type="default" @click="handleCancelCreate">取消</el-button>
      </span>
    </el-dialog>
    <el-dialog
        title="发布问卷"
        :visible="showDeadlineDialog"
        width="30%"
    >
      <el-date-picker
          v-model="end_date"
          type="date"
          :picker-options="datePickerOptions"
          placeholder="选择截止日期"
          value-format="timestamp"
          style="width: 100%"
      ></el-date-picker>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="publish">确认</el-button>
        <el-button type="default" @click="showDeadlineDialog = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import QuestionList from "./Question/QuestionList";
  import axios from 'axios';

  export default {
    name: "Create",
    components: {
      QuestionList
    },
    data() {
      return {
        Q_ID: '',
        showCreateDialog: false,
        showDeadlineDialog: false,
        title_form: {
          Q_title: '',
        },
        end_date: undefined,
        title_rules: {
          Q_title: [
            {
              required: true,
              message: '请输入问卷标题',
              trigger: 'blur',
            }
          ]
        },
        naire: {
          Q_ID: '',
          Q_name: '',
          content: []
        },
        rules: {
          title: [
            { required: true, message: '请输入问卷标题', trigger: 'blur' }
          ],
          deadline: [
            { required: true, message: '请选择截止时间', trigger: 'blur' }
          ]
        },
        datePickerOptions: {
          disabledDate(date) {
            const currentDate = Date.now();
            return (date && date.valueOf() < currentDate) || (date && date.valueOf() > currentDate + 2592000000);
          }
        },
      }
    },
    methods: {
      getTitle() {
        const path = `/questionnaireInfo/?Q_ID=${this.Q_ID}`
        axios.get(path)
          .then((res) => {
            this.naire.Q_name = res.data.Q_Name;
          })
          .catch((error) => {
            console.log(error)
            switch (error.msg) {
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
          .catch(() => {
            this.$message.error('网络连接超时，请检查网络或稍后再试');
          });
      },
      onAddOption({index}) {
        const tempData = {
          option_content: '选项',
        }
        this.naire.content[index].option.push({ ...tempData })
      },
      onDelOption({index, opIndex}) {
        if (this.naire.content[index].option.length < 2) {
          return this.$message.warning('已经是最后一个选项，无法删除。')
        }
        this.naire.content[index].option.splice(opIndex, 1)
      },
      onDelQuestion({index}) {
        this.naire.content.splice(index, 1)
      },
      addQuestion(type) {
        let ques = {
          question_type: type,
        };
        switch (type) {
          case 0:
            ques.question_content = '单选题目';
            ques.option = [
              {
                option_content: '选项',
              }
            ];
            break;
          case 1:
            ques.question_content = '多选题目';
            ques.option = [
              {
                option_content: '选项',
              }
            ];
            break;
          case 2:
            ques.question_content = '文本题目';
            break;
        }
        this.naire.content.push(ques);
      },
      async saveTitle() {
        let ret = false;
        const path = '/questionnaireRename/';
        const payload = {
          Q_ID: this.Q_ID,
          Q_Name: this.naire.Q_name,
        }
        await axios.post(path, payload)
          .then(() => {
            ret = true;
          })
          .catch((error) => {
            switch (error.msg) {
              case 1:
                this.$message.error('保存失败');
                break;
              case 100:
                this.$message.error('请将信息填写完整');
                break;
              default:
                this.$message.error('网络连接超时，请检查网络或稍后再试');
            }
          });
        return ret;
      },
      async saveContent() {
        let ret = false;
        for (let ques_index = 0; ques_index < this.naire.content.length; ques_index++) {
          this.naire.content[ques_index].question_id = ques_index;
          if (this.naire.content[ques_index].option) {
            for (let op_index = 0; op_index < this.naire.content[ques_index].option.length; op_index++) {
              this.naire.content[ques_index].option[op_index].option_id = op_index;
            }
          }
        }
        const path = '/questionnaireSave/'
        const payload = this.naire;
        await axios.post(path, payload)
          .then(() => {
            ret = true;
          })
          .catch((error) => {
            switch (error.msg) {
              case 2:
                this.$message.error('保存失败');
                break;
              case 100:
                this.$message.error('请将信息填写完整');
                break;
              default:
                this.$message.error('网络连接超时，请检查网络或稍后再试');
            }
          })
        return ret;
      },
      async save() {
        let flag1 = await this.saveTitle();
        let flag2 = await this.saveContent();
        if (flag1 && flag2) {
          this.$message.success('保存成功');
        }
      },
      async publish() {
        await this.save();
        const path = '/questionnairePublish/';
        const payload = {
          Q_ID: this.Q_ID,
          end_date: this.end_date / 1000,
        }
        axios.post(path, payload)
          .then(() => {
            this.$message.success('发布成功');
            this.$router.push({ name: 'Manage' });
          })
          .catch((error) => {
            switch (error.msg) {
              case 2:
                this.$message.error('问卷截止时间有误')
                break;
              case 100:
                this.$message.error('请将信息填写完整');
                break;
              default:
                this.$message.error('网络连接超时，请检查网络或稍后再试');
            }
          })
      },
      handleCreate() {
        this.$refs['title_form'].validate((valid) => {
          if (valid) {
            const path = '/questionnaireCreate/';
            const payload = this.title_form;
            axios.post(path, payload)
              .then(async (res) => {
                this.showCreateDialog = false;
                this.Q_ID = this.naire.Q_ID = res.data.Q_ID;
                await this.saveContent()
                await this.$router.push({ name: 'Edit', params: {id: res.data.Q_ID} });
                this.getTitle();
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
          }
        });
      },
      handleCancelCreate() {
        this.$router.push({ name: 'Manage' })
      },
    },
    created() {
      if (!this.$route.params.id) {
        this.showCreateDialog = true;
      } else {
        this.Q_ID = this.$route.params.id;
        this.getTitle();
        this.getNaire();
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
