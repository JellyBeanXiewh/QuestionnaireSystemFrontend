<template>
  <div class="layout-header">
    <slot />
<!--    <a class="logout" @click="logout">注销</a>-->
  </div>
</template>

<script>
  export default {
    name: "LayoutHeader"
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
