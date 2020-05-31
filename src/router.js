import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from "./components/HelloWorld";
import Login from "./components/Login";
import Register from "./components/Register";

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Index',
      redirect: Login,
      // component: HelloWorld,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/manage',
      name: 'Manage',
      meta: { require_auth: true },
    },
    {
      path: '/admin',
      name: 'Admin',
      children: [
        {
          path: '/login',
          name: 'Admin login',
        },
        {
          path: '/manage',
          name: 'Admin manage',
          meta: { require_admin: true },
        }
      ]
    },
    {
      path: '/404',
      name: '404',
    },
    {
      path: '*',
      name: 'Not Found',
      redirect: '/404',
    },
  ],
})

// JWT 用户权限校验，判断 TOKEN 是否在 localStorage 当中
// 对象解构，等于 {name} === to.name
router.beforeEach((to, from, next) => {
  // 获取 JWT Token
  if (to.meta.require_auth) {
    // 判断该路由是否需要登录权限
    if (localStorage.getItem('JWT_TOKEN')) {
      // 通过获取当前的token是否存在
      next();
    } else {
      next({
        name: 'Login',
        query: {redirect: to.fullPath}
        // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
});

export default router;
