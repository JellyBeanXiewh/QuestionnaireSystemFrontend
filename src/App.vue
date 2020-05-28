<template>
  <div id="app">
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
<!--    <Header></Header>-->
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import Header from "./components/Header";

export default {
  name: 'App',
  // components: {
  //   Header,
  // }
}
</script>

<style>
/*#app {*/
/*  font-family: Avenir, Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  margin-top: 60px;*/
/*}*/
body,
html,
div,
header,
h1, h2, h3, h4, h5, h6,
p {
  margin: 0;
  padding: 0;
}

body {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

#app {
  width: 100%;
  font-size: 14px;
  line-height: 1.5;
  color: #657180;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  color: #39f;
  background: 0 0;
  text-decoration: none;
  outline: 0;
  cursor: pointer;
  transition: color 0.2s ease;
}

.mt-10 {
  margin-top: 10px !important;
}

.mt-20 {
  margin-top: 20px !important;
}

.mb-10 {
  margin-bottom: 10px !important;
}

.mb-20 {
  margin-bottom: 20px !important;
}

.text-center {
  text-align: center;
}

.highlight {
  color: #F56C6C;
}

/**
* 带外边框的表格
*/
.el-table.border-table {
  border: 1px solid #f5f7fa;
  border-bottom: none;
}
.el-table.border-table .el-table__header th {
  background: #f5f7fa;
}

.pagination {
  margin-top: 10px;
  text-align: center;
}
</style>
