<template>
  <div class="naire-list">
    <div class="naire-btn">
      <el-button type="primary" @click="create">创建问卷</el-button>
      <el-button type="danger" @click="batchDelete">批量删除</el-button>
    </div>
    <el-table v-loading.fullscreen.lock="false" :data="list" @selection-change="onSelectionChange">
      <el-table-column
          type="selection"
          width="55"
      />
      <el-table-column prop="n_title" label="问卷名称" align="left">
<!--        <template slot-scope="{ row }">-->
<!--          <router-link tag="a" :to="`./view/${row.n_id}`">-->
<!--            {{ row.n_title }}-->
<!--            <el-tag v-if="isExpired(row.n_deadline)" class="ml-10" size="mini" type="danger">已截止</el-tag>-->
<!--          </router-link>-->
<!--        </template>-->
      </el-table-column>
      <el-table-column prop="n_creattime" label="创建时间" align="center">
<!--        <template slot-scope="{ row }">-->
<!--          {{ row.n_creattime | formatTime }}-->
<!--        </template>-->
      </el-table-column>
      <el-table-column prop="n_deadline" label="截止时间" align="center">
<!--        <template slot-scope="{ row }">-->
<!--          &lt;!&ndash; 问卷超过截止日期 &ndash;&gt;-->
<!--          {{ row.n_deadline | formatTime }}-->
<!--        </template>-->
      </el-table-column>
      <el-table-column prop="n_status" label="发布状态" align="center">
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

    <change-time :visible.sync="changeTimeVisible" :model="editModel" />
    <copy-url :visible.sync="copyUrlVisible" :model="editModel" />
  </div>
</template>

<script>
  export default {
    name: "List",
    data() {
      return {

      }
    },
    methods: {
      create() {
        this.$router.push({ name: 'Create' })
      }
    }
  }
</script>

<style scoped>
  .naire-btn {
    margin: 10px;
  }
</style>
