<template>
  <div class="login-wrapper">
    <div class="login-form">
      <h3 class="title">用户注册</h3>
      <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-position="top"
          class="form-area"
          @submit.native.prevent
          @keyup.enter="handleSubmit('form')"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" type="email"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="check_code">
          <el-row type="flex" justify="space-between">
              <el-input v-model="form.check_code"></el-input>
              <el-button type="primary" plain>获取验证码</el-button>
          </el-row>
        </el-form-item>
        <el-form-item label="用户名" prop="usrname">
          <el-input v-model="form.email" type="text"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="form.pwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="生日" prop="birth">
          <el-row>
            <el-date-picker
                v-model="form.birth"
                class="form-date"
                type="date"
                placeholder="选择日期"
                value-format="timestamp">
            </el-date-picker>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
              class="login-btn"
              type="primary"
              native-type="submit"
              @click="handleSubmit('form')"
          >
            注册
          </el-button>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="center">
        <el-link type="primary" href="/login">已有账号？去登录</el-link>
      </el-row>
    </div>
    <div class="login-logo"/>
  </div>
</template>

<script>
  export default {
    name: "Register",
    data() {
      return {
        form: {
          email: '',
          usrname: '',
          birth: '',
          pwd: '',
          check_code: '',
          sex: '',
        },
      }
    },
  }
</script>

<style scoped>
  .login-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #318fce;
    background: linear-gradient(to bottom right, #318fce 0%, #48e7ef 100%);
  }

  .login-wrapper .login-form {
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    padding: 30px 20px;
  }

  .login-wrapper .title {
    font-size: 18px;
    font-weight: 700;
    padding-bottom: 10px;
  }

  .login-wrapper .login-btn {
    width: 100%;
  }

  .login-wrapper .form-area {
    width: 300px;
  }

  .login-wrapper .form-area .form-date{
    width: 300px;
  }

  .login-wrapper .login-logo {
    position: absolute;
    top: 10px;
    left: 30px;
    width: 250px;
    height: 75px;
    /*background: url("../../assets/logo.png") no-repeat center;*/
    background-size: cover;
  }

  .login-wrapper .login-github {
    position: absolute;
    top: 20px;
    right: 30px;
    margin: 20px 0;
    color: #fff;
    vertical-align: middle;
  }

  .login-wrapper .icon-github {
    display: inline-block;
  }

  .login-wrapper .icon-github img {
    width: 20px;
    height: auto;
  }
</style>
