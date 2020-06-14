<template>
  <el-container class="layout">
    <el-aside width="220px" class="layout-menu-left">
      <logo title="后台管理"/>
      <nav-bar/>
    </el-aside>
    <el-container class="layout-content-right">
      <el-header class="layout-header-wrap">
        <layout-header>
          <!--          <header-nav v-if="hasSubNav"/>-->
        </layout-header>
      </el-header>
      <el-main class="layout-content">
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import Logo from '../../Logo';
  import NavBar from "./SideBar/NavBar";
  import LayoutHeader from "./LayoutHeader";

  export default {
    name: "AdminLayout",
    components: {
      LayoutHeader,
      NavBar,
      Logo,
    }
  }
</script>

<style scoped>
  .layout {
    height: 100%;
    background: #f5f7f9;
    min-width: 960px;
  }

  .layout-menu-left {
    display: block;
    width: 250px;
    background: #464c5b;
  }

  .layout-content-right {
    min-height: 100vh;
  }

  .layout-content {
    min-height: 500px;
    margin: 15px;
    padding: 15px;
    border-radius: 4px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    background: #fff;
  }

  .layout-header-wrap {
    padding: 0;
  }
</style>
