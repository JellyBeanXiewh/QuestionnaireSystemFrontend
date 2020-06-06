<template>
  <el-submenu v-if="submenu.children" :index="submenu.index">
    <template slot="title">
      <i v-if="submenu.icon" :class="submenu.icon" />
      <span>{{ submenu.title }}</span>
    </template>
    <nav-bar-item
        v-for="(item, index) in submenu.children"
        :key="index"
        :submenu="item"
    />
  </el-submenu>
  <el-menu-item v-else :index="submenu.index">
    <i v-if="submenu.icon" :class="submenu.icon" />
    {{ submenu.title }}
  </el-menu-item>
</template>

<script>
  export default {
    name: "NavBarItem",
    props: ['submenu'],
  }
</script>

<style scoped>

</style>
