<template>
  <div>
    <el-radio-group v-model="content.selectContent" vertica class="radio-list">
      <el-radio
          v-for="(option, opIndex) in content.option"
          :key="opIndex"
          :label="option.option_id"
          class="option-item"
      >
        <span>{{ option.option_content }}</span>
      </el-radio>
    </el-radio-group>
  </div>
</template>

<script>
  export default {
    name: "SingleChoice",
    props: [
      'content',
      'index',
    ]
  }
</script>

<style scoped>
  .radio-list {
    width: 100%;
  }
  .radio-list .option-item {
    display: flex;
    font-size: inherit;
    align-items: center;
    margin: 20px 0;
  }
</style>
