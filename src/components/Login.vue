<template>
  <div class="login-wrapper">
    <div class="login-form">
      <h3 class="title">用户登录</h3>
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
          <el-input v-model="form.email" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="form.pwd" type="password"></el-input>
        </el-form-item>

        <el-form-item label="验证码" prop="check_code">
          <el-row gutter="10">
            <el-col :span="14">
              <el-input v-model="form.check_code"></el-input>
            </el-col>
            <el-col :span="10">
              <el-image :src="check_code_url" fit="fill" alt="验证码" @click="get_check_code"></el-image>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
              class="login-btn"
              type="primary"
              native-type="submit"
              @click="handleSubmit('form')"
          >
            登录
          </el-button>
        </el-form-item>
        <el-row type="flex" justify="center">
          <el-link type="primary" href="/register">没有账号？去注册</el-link>
        </el-row>
      </el-form>
    </div>
    <div class="login-logo"/>
  </div>
</template>

<script>
  import axios from 'axios';
  import baseURL from "../config";

  export default {
    name: "Login",
    data() {
      return {
        check_code_url: '',
        form: {
          email: '',
          pwd: '',
          check_code: '',
        },
        rules: {
          email: [
            {
              required: true,
              message: '请输入邮箱',
              trigger: 'blur',
            }
          ],
          pwd: [
            {
              required: true,
              message: '请输入密码',
              trigger: 'blur',
            }
          ],
          check_code: [
            {
              required: true,
              message: '请输入验证码',
              trigger: 'blur',
            }
          ]
        }
      };
    },
    methods: {
      get_check_code() {
        this.check_code_url = `${baseURL}/checkCode/?time=${Date.now()}`;
      },
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            const payload = this.form;
            axios.post('/login/', payload)
              .then((res) => {
                console.log(res);
                // TODO: 登录成功后的逻辑
                // this.$message.success('登录成功！但我还没写该跳转的页面');
                this.$router.push({ name: 'Manage' });
//                 if (response.data.err === OK) {
//                   this.$Message.success('登录成功!')
//                   const data = {
//                     username: this.formValidate.username,
//                     token: response.data.token
//                   }
//                   this.$store.dispatch('login', data)
//                   // dispatch action，从action commit 到mutation更新登录状态
// //                  this.$store.dispatch('login', this.formValidate.username);
//                   this.$router.push('/platform/list')
//                 } else {
//                   this.$Message.error('帐号或密码有误!')
//                 }
              })
              .catch((error) => {
                switch (error.status) {
                  case 403:
                    switch (error.msg) {
                      case 1:
                        this.$message.error('用户名或密码错误');
                        break;
                      case 2:
                        this.$message.error('验证码错误');
                        break;
                      case 100:
                        this.$message.error('请将信息填写完整');
                        break;
                      default:
                        this.$message.error('其他错误');
                    }
                    break;
                  default:
                    this.$message.error('网络连接超时，请检查网络或稍后再试');
                }
                this.get_check_code()
              })
          } else {
            this.$message.error('信息填写有误')
            this.get_check_code()
          }
        })
      }
    },
    created() {
      this.get_check_code();
    }
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
