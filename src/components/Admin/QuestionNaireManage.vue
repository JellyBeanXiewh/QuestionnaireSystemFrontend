<template>
  <el-table v-loading.fullscreen.lock="false" :data="NaireList">
    <el-table-column prop="Q_name" label="问卷名称" align="left">
      <template slot-scope="{ row }">
        <router-link :to="{ name: 'View naire', params: { id: row.Q_ID } }">
          {{ row.Q_name }}
        </router-link>
      </template>
    </el-table-column>
    <el-table-column prop="user_name" label="所属用户" align="left">
      <template slot-scope="{ row }">
        {{ row.user_name }}
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
        <el-button v-if="row.state !== 3" type="danger" size="mini" @click="changeState(row.Q_ID, 1)">封禁</el-button>
        <el-button v-else type="danger" size="mini" @click="changeState(row.Q_ID, 0)">解封</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "QuestionNaireManage",
    data() {
      return {
        NaireList: [],
        offset: 0,
      }
    },
    methods: {
      getNaireList(offset) {
        const path = `/admin/questionnaireList/?offset=${offset}`;
        axios.get(path)
          .then((res) => {
            this.NaireList = res.data;
          })
          .catch(() => {
            this.$message.error('网络连接超时，请检查网络或稍后再试');
          })
      },
      changeState(q_id, state) {
        const path = '/admin/questionnaireStateChange/';
        const payload = {
          Q_ID: q_id,
          type: state,
        }
        axios.post(path, payload)
          .then(() => {
            this.getNaireList(this.offset);
          })
          .catch(() => {
            this.$message.error('网络连接超时，请检查网络或稍后再试');
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
      this.getNaireList(this.offset);
    }
  }
</script>

<style scoped>

</style>
