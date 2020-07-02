<template>
  <div class="naire-list">
    <el-table v-loading.fullscreen.lock="loading" :data="UserList">
      <el-table-column prop="username" label="用户名" align="left">
        <template slot-scope="{ row }">
            {{ row.username }}
        </template>
      </el-table-column>
      <el-table-column prop="email" label="电子邮箱" align="center">
        <template slot-scope="{ row }">
          {{ row.email }}
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
          <el-button v-if="row.state === 0" type="danger" size="mini" @click="changeState(row.email, 1)">封禁</el-button>
          <el-button v-else type="danger" size="mini" @click="changeState(row.email, 0)">解封</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "UserManage",
    data() {
      return {
        loading: false,
        UserList: [],
        offset: 0,
      }
    },
    methods: {
      getUserList(offset) {
        this.loading = true;
        const path = `/admin/userList/?offset=${offset}`;
        axios.get(path)
          .then((res) => {
            this.UserList = res.data;
          })
          .catch(() => {
            this.$message.error('网络连接超时，请检查网络或稍后再试');
          })
        this.loading = false;
      },
      changeState(email, state) {
        const path = '/admin/userStateChange/';
        const payload = {
          email: email,
          type: state,
        }
        axios.post(path, payload)
          .then(() => {
            this.getUserList(this.offset);
          })
          .catch(() => {
            this.$message.error('网络连接超时，请检查网络或稍后再试');
          })
      }
    },
    filters: {
      stateFilter(val) {
        switch (val) {
          case 0:
            return '正常';
          case 1:
            return '已封禁';
        }
      },
      stateColorFilter(val) {
        switch (val) {
          case 0:
            return 'success';
          case 1:
            return 'danger';
        }
      }
    },
    created() {
      this.getUserList(this.offset);
    }
  }
</script>

<style scoped>

</style>
