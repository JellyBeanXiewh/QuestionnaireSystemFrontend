<template>
  <div class="mt-20 mb-20">
    <el-input
        v-model="content.selectContent"
        type="textarea"
        :autosize="{ minRows: 2,maxRows: 5 }"
        placeholder="请输入..."
    />
  </div>
</template>

<script>
  export default {
    name: "TextQuestion",
    props: [
      'content',
      'index',
    ]
  }
</script>

<style scoped>

</style>
