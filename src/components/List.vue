<template>
  <div class="naire-list">
    <div class="naire-btn">
      <el-button type="primary" @click="create">创建问卷</el-button>
    </div>
    <el-table v-loading.fullscreen.lock="false" :data="NaireList" @selection-change="onSelectionChange">
      <el-table-column prop="Q_name" label="问卷名称" align="left">
        <template slot-scope="{ row }">
          <router-link tag="a" :to="{ name: 'Edit', params: { id: row.Q_ID } }">
            {{ row.Q_name }}
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
<!--        <template slot-scope="{ row }">-->
<!--          <el-tag :type="row.n_status | statusColorFilter">-->
<!--            {{ row.n_status | statusFilter }}-->
<!--          </el-tag>-->
<!--        </template>-->
      </el-table-column>
      <el-table-column label="操作" align="center" width="200px">
<!--        <template slot-scope="{ row }">-->
<!--          <el-button type="primary" size="mini" style="margin-right: 10px" @click="handleStatistics(row)">统计分析</el-button>-->
<!--          <el-dropdown @command="onOptionClick($event, row)">-->
<!--            <el-button type="danger" size="mini">-->
<!--              操作<i class="el-icon-arrow-down el-icon&#45;&#45;right" />-->
<!--            </el-button>-->
<!--            <el-dropdown-menu slot="dropdown">-->
<!--              <el-dropdown-item command="preview">预览问卷</el-dropdown-item>-->
<!--              <el-dropdown-item command="copyUrl">复制地址</el-dropdown-item>-->
<!--              <el-dropdown-item command="submitStatistic">查看回收情况</el-dropdown-item>-->
<!--              <el-dropdown-item command="edit" divided>编辑问卷</el-dropdown-item>-->
<!--              <el-dropdown-item command="deadline">编辑截止时间</el-dropdown-item>-->
<!--              <el-dropdown-item command="publish">{{ row.n_status === NaireStatus.PUBLISHED ? '停止发布' : '发布问卷' }}</el-dropdown-item>-->
<!--              <el-dropdown-item command="delete">删除问卷</el-dropdown-item>-->
<!--            </el-dropdown-menu>-->
<!--          </el-dropdown>-->
<!--        </template>-->
      </el-table-column>
    </el-table>

<!--    <change-time :visible.sync="changeTimeVisible" :model="editModel" />-->
<!--    <copy-url :visible.sync="copyUrlVisible" :model="editModel" />-->
  </div>
</template>

<script>
  import axios from 'axios'

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
      onSelectionChange(val) {
        this.selectContent = val
      }
    },
    filters: {
      formatDate(val) {
        const timestamp = new Date(Number(val))
        return timestamp.getFullYear() + '-' + timestamp.getMonth() + '-' + timestamp.getDate()
      },
      // statusFilter(val) {
      //   return NaireStatusText[val]
      // },
      // statusColorFilter(val) {
      //   return NaireStatusColor[val]
      // }
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
