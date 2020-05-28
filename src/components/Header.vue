<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">NavBar</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Link</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item>
            <router-link to="/login" exact>登录 / 注册</router-link>
          </b-nav-item>

<!--          <b-nav-item-dropdown right>-->
<!--            &lt;!&ndash; Using 'button-content' slot &ndash;&gt;-->
<!--            <template v-slot:button-content>-->
<!--              <em>User</em>-->
<!--            </template>-->
<!--            <b-dropdown-item href="#">Profile</b-dropdown-item>-->
<!--            <b-dropdown-item href="#">Sign Out</b-dropdown-item>-->
<!--          </b-nav-item-dropdown>-->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
  export default {
    name: "Header"
  }
</script>

<style scoped>

</style>
