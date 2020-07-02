<template>
  <div class="layout-header">
    <slot />
<!--    <a class="logout" @click="logout">注销 {{ userName }}</a>-->
    <a class="logout" @click="logout">注销</a>
    <a class="username">{{ username }}</a>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "LayoutHeader",
    data() {
      return {
        username: '',
      }
    },
    methods: {
      getUserName() {
        const path = '/userInfo/';
        axios.get(path)
          .then((res) => {
            this.username = res.data.usrname;
          })
          .catch(() => {
            this.$message.error('网络连接超时，请检查网络或稍后再试')
          })
      },
      logout() {
        const path = '/logout/';
        axios.get(path)
          .then(() => {
            this.$router.push({ name: 'Login' });
          })
          .catch(() => {
            this.$message.error('网络连接超时，请检查网络或稍后再试')
          })
      }
    },
    created() {
      this.getUserName();
    }
  }
</script>

<style scoped>
  .layout-header {
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  }

  .layout-header .username,
  .layout-header .logout {
    float: right;
    padding-right: 30px;
    line-height: 60px;
    font-size: 14px;
  }
</style>
