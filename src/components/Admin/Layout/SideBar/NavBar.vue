<template>
  <el-menu
      :router="true"
      :default-active="defaultActive()"
      :unique-opened="true"
      class="nav-bar"
      text-color="#fff"
  >
    <nav-bar-item
        v-for="(item, index) in this.navConfigs"
        :key="index"
        :submenu="item"
    />
  </el-menu>
</template>

<script>
  import NavBarItem from "./NavBarItem";
  import NavConfigs from "./config";

  export default {
    name: "NavBar",
    components: {
      NavBarItem,
    },
    data() {
      return {
        navConfigs: ''
      }
    },
    methods: {
      defaultActive() {
        return this.$route.meta ? this.$route.meta.navIndex || '' : ''
      }
    },
    created() {
      this.navConfigs = NavConfigs
    }
  }
</script>

<style scoped>
  .nav-bar {
    border-right: 0;
    background-color: #464c5b;
  }

  .nav-bar .el-submenu__title:focus,
  .nav-bar .el-menu-item:focus {
    background: none;
  }

  .nav-bar .el-submenu__title:hover,
  .nav-bar .el-menu-item:hover,
  .nav-bar .el-menu-item.is-active {
    background-color: #313540;
  }
</style>
