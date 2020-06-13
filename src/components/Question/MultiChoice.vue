<template>
  <div>
    <el-form-item
        label="题目"
        :prop="'content.' + index + '.question_content'"
        :rules="{
        required: true, message: '题目内容不能为空', trigger: 'blur'
      }"
    >
      <el-input v-model="content.question_content" placeholder="请输入题目内容" />
    </el-form-item>
    <el-form-item label="">
      <div
          v-for="(option, opIndex) in content.option"
          :key="opIndex"
          class="option-item"
      >
        <el-row :gutter="22">
          <el-col :span="18">
            <el-form-item
                :label="`选项 ${ opIndex + 1 }`"
                :prop="'content.' + index + '.option.' + opIndex + '.option_content'"
                :rules="{
                required: true, message: '选项内容不能为空', trigger: 'blur'
              }"
            >
              <el-input
                  v-model="option.option_content"
                  placeholder="请输入选项内容"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                @click="addOption(index)"
            />
            <el-button
                type="warning"
                icon="el-icon-delete"
                size="mini"
                @click="delOption(index, opIndex)"
            />
          </el-col>
        </el-row>
      </div>
    </el-form-item>
  </div>
</template>

<script>
  export default {
    name: "MultiChoice",
    props: [
      'content',
      'index',
    ],
    methods: {
      delOption(index, opIndex) {
        this.$emit('delOption', {
          index,
          opIndex
        })
      },
      addOption(index) {
        this.$emit('addOption', {
          index
        })
      }
    }
  }
</script>

<style scoped>

</style>
