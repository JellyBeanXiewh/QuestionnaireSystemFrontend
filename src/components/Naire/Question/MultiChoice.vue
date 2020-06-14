<template>
  <div>
    <el-checkbox-group v-model="selectContent" class="checkbox-list">
      <el-checkbox
          v-for="(option, opIndex) in content.option"
          :key="opIndex"
          :label="option.option_id"
          class="option-item"
      >
        <span>{{ option.option_content }}</span>
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
  export default {
    name: "MultiChoice",
    props: [
      'content',
      'index',
    ],
    data() {
      return {
        selectContent: [],
      }
    }
  }
</script>

<style scoped>
  .checkbox-list {
    width: 100%;
  }
  .checkbox-list .option-item {
    display: block;
    margin: 20px 0;
  }
</style>
