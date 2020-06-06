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
        <el-form-item label="邮箱验证码" prop="email_code">
          <el-row type="flex" justify="space-between">
              <el-input v-model="form.email_code"></el-input>
              <el-button
                  type="primary"
                  :disabled="btn.disabled"
                  @click="get_email_code('form')"
                  plain
              >
                {{ btn.text }}
              </el-button>
          </el-row>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="form.pwd" type="password" placeholder="密码由大写字母、小写字母和数字组成"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="usrname">
          <el-input v-model="form.usrname" type="text"></el-input>
        </el-form-item>
        <el-form-item label="生日" prop="birth">
          <el-date-picker
              v-model="form.birth"
              class="form-date"
              type="date"
              placeholder="选择日期"
              value-format="timestamp">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" class="form-select" placeholder="请选择性别">
            <el-option label="男" value=1></el-option>
            <el-option label="女" value=0></el-option>
          </el-select>
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
  import axios from "axios";

  export default {
    name: "Register",
    data() {
      return {
        form: {
          email: '',
          usrname: '',
          birth: '',
          pwd: '',
          email_code: '',
          sex: '',
        },
        rules: {
          email: [
            {
              required: true,
              message: '请输入邮箱',
              trigger: 'blur',
            },
            {
              pattern: '^([A-Za-z0-9_\\-\\.\u4e00-\u9fa5])+\\@([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]{2,8})$',
              message: '请输入正确的邮箱',
            }
          ],
          email_code: [
            {
              required: true,
              message: '请输入验证码',
              trigger: 'blur',
            }
          ],
          pwd: [
            {
              required: true,
              message: '请输入密码',
              trigger: 'blur',
            },
            {
              pattern: '^[A-Za-z0-9]+$',
              message: '密码只允许由大写字母、小写字母和数字组成'
            }
          ],
          usrname: [
            {
              required: true,
              message: '请输入用户名',
              trigger: 'blur',
            }
          ],
          birth: [
            {
              required: true,
              message: '请选择生日',
              trigger: 'blur',
            }
          ],
          sex: [
            {
              required: true,
              message: '请选择性别',
              trigger: 'blur',
            }
          ]
        },
        btn: {
          text: '获取验证码',
          disabled: false,
          cd: 0,
        },
      }
    },
    methods: {
      get_email_code(name) {
        const pattern = '^([A-Za-z0-9_\\-\\.\u4e00-\u9fa5])+\\@([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]{2,8})$';
        const re = new RegExp(pattern);
        const email = this.$refs[name].model.email;
        if (re.test(email)) {
          const payload = {
            email: email,
          }
          axios.post('/emailCode/', payload)
            .then(() => {
              this.btn.cd = 60;
              this.btn.disabled = true;
              this.btn.text = this.btn.cd + 's 后可重发';
              let cool_down = setInterval(() => {
                if(this.btn.cd < 1){
                  this.btn.disabled = false;
                  this.btn.text = '获取验证码';
                  this.btn.cd = 60;
                  clearInterval(cool_down);
                } else {
                  this.btn.text = --this.btn.cd + 's 后可重发';
                }
              },1000);
              this.$message.success('验证码发送成功，请注意查收');
            })
            .catch((error) => {
              switch (error.msg) {
                case 1:
                  this.$message.error('邮件发送失败，可能是邮箱服务器出了问题');
                  break;
                case 100:
                  this.$message.error('请填写邮箱！');
                  break;
                default:
                  this.$message.error('网络连接超时，请检查网络或稍后再试')
              }
            })
        } else {
          this.$message.error('请输入正确的邮箱');
        }
      },
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let payload = { ...this.form };
            payload.birth /= 1000;
            axios.post('/register/', payload)
              .then(() => {
                this.$message.success('注册成功');
                this.$router.push({ name: 'Login' });
              })
              .catch((error) => {
                switch (error.status) {
                  case 403:
                    switch (error.msg) {
                      case 1:
                        this.$message.error('邮箱已注册，请换一个邮箱，或使用该邮箱登录');
                        break;
                      case 2:
                        this.$message.error('邮箱验证码错误');
                        break;
                      case 3:
                        this.$message.error('密码只允许由大写字母、小写字母和数字组成');
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

  .login-wrapper .form-area,
  .login-wrapper .form-area .form-date,
  .login-wrapper .form-area .form-select{
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
