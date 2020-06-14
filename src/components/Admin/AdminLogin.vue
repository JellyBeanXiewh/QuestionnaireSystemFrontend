<template>
  <div class="login-wrapper">
    <div class="login-form">
      <h3 class="title">管理员登录</h3>
      <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-position="top"
          class="form-area"
          @submit.native.prevent
          @keyup.enter="handleSubmit('form')"
      >
        <el-form-item label="用户名" prop="admin">
          <el-input v-model="form.admin" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="form.pwd" type="password"></el-input>
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
      </el-form>
    </div>
    <div class="login-logo"/>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "AdminLogin",
    data() {
      return {
        form: {
          admin: '',
          pwd: '',
        },
        rules: {
          admin: [
            {
              required: true,
              message: '请输入用户名',
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
        }
      };
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            const path = '/admin/login/'
            const payload = this.form;
            axios.post(path, payload)
              .then(() => {
                if (this.$route.params.redirect) {
                  this.$router.push({ path: this.$route.params.redirect });
                } else {
                  this.$router.push({ name: 'Admin manage' });
                }
              })
              .catch((error) => {
                switch (error.msg) {
                  case 1:
                    this.$message.error('用户名或密码错误');
                    break;
                  case 100:
                    this.$message.error('请将信息填写完整');
                    break;
                  default:
                    this.$message.error('网络连接超时，请检查网络或稍后再试');
                }
              })
          } else {
            this.$message.error('信息填写有误')
          }
        })
      },
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

  .login-wrapper .icon-github img {
    width: 20px;
    height: auto;
  }
</style>
