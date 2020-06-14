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
          <router-link :to="{ name: 'Edit', params: { id: row.Q_ID } }">
            {{ row.Q_Name }}
<!--            <el-tag v-if="isExpired(row.n_deadline)" class="ml-10" size="mini" type="danger">已截止</el-tag>-->
          </router-link>
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
          <el-button v-if="row.state === 1 || row.state === 2" type="primary" size="mini" style="margin-right: 10px" @click="handleStatistics(row)">统计分析</el-button>
          <el-button type="primary" size="mini" style="margin-right: 10px" @click="handleGetResult(row)">问卷结果</el-button>
<!--          <router-link tag="el-button" to="">1</router-link>-->
          <el-dropdown @command="onOptionClick($event, row)">
            <el-button type="danger" size="mini">
              操作<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="preview">预览问卷</el-dropdown-item>
              <el-dropdown-item command="copyUrl">复制地址</el-dropdown-item>
              <el-dropdown-item command="submitStatistic">查看回收情况</el-dropdown-item>
              <el-dropdown-item command="edit" divided>编辑问卷</el-dropdown-item>
              <el-dropdown-item command="deadline">修改截止时间</el-dropdown-item>
<!--              <el-dropdown-item command="publish">{{ row.n_status === NaireStatus.PUBLISHED ? '停止发布' : '发布问卷' }}</el-dropdown-item>-->
              <el-dropdown-item command="delete">删除问卷</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

<!--    <change-time :visible.sync="changeTimeVisible" :model="editModel" />-->
<!--    <copy-url :visible.sync="copyUrlVisible" :model="editModel" />-->
  </div>
</template>

<script>
  import axios from 'axios'
  // import baseURL from "../config";

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
      async deleteNaire(nIds) {
        console.log(nIds)
        // const res = await NaireAction.del({
        //   n_id: nIds
        // })
        // if (res.success) {
        //   this.$message.success('删除成功')
        //   this.getList()
        // } else {
        //   this.$message.error('删除失败')
        // }
      },
      onSelectionChange(val) {
        this.selectContent = val
      },
      handleGetResult(row) {
        // todo: 待完善下载问卷结果
        const path = `/questionnaireResultGet/?Q_ID=${row.Q_ID}`;
        axios.get(path)
          .then((res) => {
            console.log(res)
            return res;
          })
      }
    },
    filters: {
      formatDate(val) {
        console.log(val);
        const timestamp = new Date(Number(val) * 1000)
        return val === 0 ? '' : timestamp.getFullYear() + '-' + (timestamp.getMonth() + 1) + '-' + timestamp.getDate()
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
            return '已封禁';
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
