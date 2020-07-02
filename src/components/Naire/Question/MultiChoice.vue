<template>
  <div>
    <el-checkbox-group v-model="selected" class="checkbox-list">
      <el-checkbox
          v-for="option in content.option"
          :key="option.option_id"
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
        selected: [],
      }
    },
    watch: {
      selected: {
        immediate: true,
        deep: true,
        handler(list) {
          this.content.op = list
          this.$emit('update:content', this.content)
          // console.log(this.content.op)
        }
      },
    },
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
