<template>
  <div class="naire-list">
    <div class="naire-btn">
      <el-button type="primary" @click="create">创建问卷</el-button>
      <el-button type="danger" @click="batchDelete">批量删除</el-button>
    </div>
    <el-table v-loading.fullscreen.lock="false" :data="NaireList" @selection-change="onSelectionChange">
      <el-table-column
          type="selection"
          width="55"
      />
      <el-table-column prop="Q_name" label="问卷名称" align="left">
        <template slot-scope="{ row }">
          <router-link v-if="row.state === 0" :to="{ name: 'Edit', params: { id: row.Q_ID } }">
            {{ row.Q_Name }}
<!--            <el-tag v-if="isExpired(row.n_deadline)" class="ml-10" size="mini" type="danger">已截止</el-tag>-->
          </router-link>
          <router-link v-else-if="row.state === 1 || row.state === 2" :to="{ name: 'View naire', params: { id: row.Q_ID } }">
            {{ row.Q_Name }}
          </router-link>
          <p v-else>
            {{ row.Q_Name }}
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="Q_creat_date" label="创建时间" align="center">
        <template slot-scope="{ row }">
          {{ row.Q_creat_date | formatDate }}
        </template>
      </el-table-column>
      <el-table-column prop="Q_deadline_date" label="结束时间" align="center">
        <template slot-scope="{ row }">
          <!-- 问卷超过截止日期 -->
          {{ row.Q_deadline_date | formatDate }}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" align="center">
        <template slot-scope="{ row }">
          <el-tag :type="row.state | stateColorFilter">
            {{ row.state | stateFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200px">
        <template slot-scope="{ row }">
<!--          <el-button v-if="row.state === 1 || row.state === 2" type="primary" size="mini" style="margin-right: 10px" @click="handleStatistics(row)">统计分析</el-button>-->
          <el-button v-if="row.state === 1 || row.state === 2" type="primary" size="mini" style="margin-right: 10px" @click="handleGetResult(row)">统计分析</el-button>
<!--          <router-link tag="el-button" to="">1</router-link>-->
          <el-dropdown @command="onOptionClick($event, row)">
            <el-button type="danger" size="mini" :disabled="row.state === 3">
              操作<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-if="row.state !== 3" command="preview">预览问卷</el-dropdown-item>
              <el-dropdown-item v-if="row.state === 1 || row.state === 2" command="copyUrl">复制地址</el-dropdown-item>
              <el-dropdown-item v-if="row.state === 2" command="result">问卷结果</el-dropdown-item>
              <el-dropdown-item v-if="row.state !== 3" divided></el-dropdown-item>
              <el-dropdown-item v-if="row.state === 0" command="edit">编辑问卷</el-dropdown-item>
              <el-dropdown-item v-if="row.state === 1" command="stop">停用问卷</el-dropdown-item>
              <el-dropdown-item v-if="row.state === 0" command="publish">发布问卷</el-dropdown-item>
              <el-dropdown-item command="delete">删除问卷</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
<!--    TODO-->
    <el-dialog
        title="发布问卷"
        :visible="showDeadlineDialog"
        width="30%"
    >
      <el-date-picker
          v-model="publish_form.end_date"
          type="date"
          :picker-options="datePickerOptions"
          placeholder="选择截止日期"
          value-format="timestamp"
          style="width: 100%"
      ></el-date-picker>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handlePublish">确认</el-button>
        <el-button type="default" @click="handleCancelPublish">取消</el-button>
      </span>
    </el-dialog>

<!--    <change-time :visible.sync="changeTimeVisible" :model="editModel" />-->
<!--    <copy-url :visible.sync="copyUrlVisible" :model="editModel" />-->
  </div>
</template>

<script>
  import axios from 'axios'
  import baseURL from "../config";

  export default {
    name: "List",
    data() {
      return {
        NaireList: [],
        // NaireStatus = NaireStatus,
        loading: false,
        changeTimeVisible: false,
        copyUrlVisible: false,
        editModel: {},
        selectContent: [],
        showDeadlineDialog: false,
        showChangeDeadlineDialog: false,
        publish_form: {
          Q_ID: '',
          end_date: '',
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
      getList() {
        const path = '/userQuestionnaireList/';
        axios.get(path)
          .then((res) => {
            this.NaireList = res.data;
          })
          .catch(() => {
            this.$message.error('网络连接超时，请检查网络或稍后再试');
          })
      },
      create() {
        this.$router.push({ name: 'Create' })
      },
      batchDelete() {
        this.$confirm('您确认删除这几条内容吗？', '批量删除', {
          type: 'warning'
        })
          .then(async () => {
            const rowIds = this.selectContent.map(({ n_id: id }) => id).join(',')
            console.log(rowIds);
            // this.deleteNaire(rowIds)
          })
          .catch(() => {})
      },
      // async deleteNaire(nIds) {
      //   console.log(nIds)
      //   const res = await NaireAction.del({
      //     n_id: nIds
      //   })
      //   if (res.success) {
      //     this.$message.success('删除成功')
      //     this.getList()
      //   } else {
      //     this.$message.error('删除失败')
      //   }
      // },
      onSelectionChange(val) {
        this.selectContent = val
      },
      onOptionClick(command, row) {
        switch (command) {
          case 'preview':
            this.$router.push({ name: 'View naire', params: { id: row.Q_ID } });
            break;
          case 'result':
            window.open(`${baseURL}/questionnaireResultGet/?Q_ID=${row.Q_ID}`, '_blank');
            break;
          case 'edit':
            this.$router.push({ name: 'Edit', params: { id: row.Q_ID } });
            break;
          case 'stop':
            this.stopNaire(row.Q_ID);
            break;
          case 'publish':
            this.publish_form.Q_ID = row.Q_ID;
            this.showDeadlineDialog = true;
            break;
          case 'delete':
            this.deleteNaire(row.Q_ID);
            break;
        }
      },
      stopNaire(q_id) {
        const path = '/questionnaireInactive/';
        const payload = {
          Q_ID: q_id,
        };
        axios.post(path, payload)
          .then(() => {
            this.$message.success('问卷停用成功');
            this.getList();
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
      deleteNaire(id) {
        const path = '/questionnaireDelete/';
        const payload = {
          Q_ID: id,
        };
        axios.post(path, payload)
          .then(() => {
            this.$message.success('问卷删除成功');
            this.getList();
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
      handlePublish() {
        if (this.publish_form.Q_ID !== '' && this.publish_form.end_date !== '') {
          const path = '/questionnairePublish/';
          const payload = { ...this.publish_form };
          payload.end_date /= 1000;
          axios.post(path, payload)
            .then(() => {
              this.showDeadlineDialog = false;
              this.publish_form.Q_ID = '';
              this.publish_form.end_date = '';
              this.$message.success('发布成功');
              this.getList();
            })
            .catch((error) => {
              switch (error.msg) {
                case 2:
                  this.$message.error('请选择正确的截止日期');
                  break;
                case 100:
                  this.$message.error('请将信息填写完整');
                  break;
                default:
                  this.$message.error('网络连接超时，请检查网络或稍后再试');
              }
            })
        } else {
          this.$message.error('请将信息填写完整');
        }
      },
      handleCancelPublish() {
        this.showDeadlineDialog = false;
        this.publish_form.Q_ID = '';
        this.publish_form.end_date = '';
      },
    },
    filters: {
      formatDate(val) {
        const timestamp = new Date(Number(val) * 1000)
        return !val? '' : timestamp.getFullYear() + '-' + (timestamp.getMonth() + 1) + '-' + timestamp.getDate()
      },
      stateFilter(val) {
        switch (val) {
          case 0:
            return '未发布';
          case 1:
            return '已发布';
          case 2:
            return '已停止';
          case 3:
            return '已删除';
        }
      },
      stateColorFilter(val) {
        switch (val) {
          case 0:
            return 'primary';
          case 1:
            return 'success';
          case 2:
            return 'info';
          case 3:
            return 'danger'
        }
      }
    },
    created() {
      this.getList();
    }
  }
</script>

<style scoped>
  .naire-btn {
    margin: 10px;
  }
</style>
