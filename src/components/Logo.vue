<template>
  <div class="logo">{{ title }}</div>
</template>

<script>
  export default {
    name: "Logo",
    props: ['title']
  }
</script>

<style scoped>
  .logo {
    min-height: 30px;
    text-align: center;
    font-size: 24px;
    color: #fff;
    line-height: 30px;
    border-radius: 3px;
    margin: 15px auto;
  }
</style>
