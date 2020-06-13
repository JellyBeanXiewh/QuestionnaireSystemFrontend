<template>
  <div class="layout-header">
    <slot />
<!--    <a class="logout" @click="logout">注销 {{ userName }}</a>-->
    <a class="logout" @click="logout">注销</a>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "LayoutHeader",
    data() {
      return {

      }
    },
    methods: {
      getUserName() {

      },
      logout() {
        const path = '/logout/';
        axios.get(path)
          .then(() => {
            // TODO:注销逻辑
            console.log('Logout success');
            this.$router.push({ name: 'Login' });
          })
          .catch((error) => {
            // TODO
            console.log(error);
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

  .layout-header .logout {
    float: right;
    padding-right: 30px;
    line-height: 60px;
    font-size: 14px;
  }
</style>
