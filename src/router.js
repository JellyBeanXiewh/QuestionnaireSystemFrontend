import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from "./components/HelloWorld";
import Login from "./components/Login";
import Register from "./components/Register";
import Layout from "./components/Layout";
import List from "./components/List";
import Create from "./components/Create";
import View from "./components/Naire/View";
import Complete from "./components/Complete";
import NotFound from "./components/NotFound";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminLayout from "./components/Admin/Layout/AdminLayout";
import UserManage from "./components/Admin/UserManage";
import QuestionNaireManage from "./components/Admin/QuestionNaireManage";

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
      component: Layout,
      meta: { require_auth: true },
      redirect: List,
      children: [
        {
          path: '',
          name: 'List',
          component: List,
          meta: {
            navIndex: '/manage',
            title: '我的问卷',
            require_auth: true
          }
        },
        {
          path: 'create',
          name: 'Create',
          component: Create,
          meta: {
            navIndex: '/manage/create',
            title: '创建问卷',
            require_auth: true
          }
        },
        {
          path: 'create/:id',
          name: 'Edit',
          component: Create,
          meta: {
            navIndex: '/manage/create',
            title: '设计问卷',
            require_auth: true
          }
        }
      ]
    },
    {
      path: '/naire/:id',
      name: 'View naire',
      component: View,
    },
    {
      path: '/complete',
      name: 'Complete',
      component: Complete,
    },
    {
      path: '/admin',
      name: 'Admin',
      redirect: '/admin/login'
    },
    {
      path: '/admin/login',
      name: 'Admin login',
      component: AdminLogin,
    },
    {
      path: '/admin/manage',
      name: 'Admin manage',
      redirect: '/admin/manage/user',
      component: AdminLayout,
      children: [
        {
          path: 'user',
          name: 'Manage User',
          component: UserManage,
          meta: {
            navIndex: '/admin/manage/user',
            title: '用户管理',
            // require_admin: true
          }
        },
        {
          path: 'naire',
          name: 'Manage naire',
          component: QuestionNaireManage,
          meta: {
            navIndex: '/admin/manage/naire',
            title: '问卷管理',
            // require_admin: true
          }
        }
      ]
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
    },
    {
      path: '*',
      name: 'Not Found',
      redirect: '/404',
    },
  ],
})

router.beforeEach((to, from, next) => {
  // 查看是否存在 cookies
  if (to.meta.require_auth) {
    // 判断该路由是否需要登录权限
    if (router.app.$cookies.isKey('user')) {
      next();
    } else {
      next({
        name: 'Login',
        query: { redirect: to.fullPath }
        // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else if (to.meta.require_admin) {
    if (router.app.$cookies.isKey('admin')) {
      next();
    } else {
      next({
        name: 'Admin login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next();
  }
});

export default router;
