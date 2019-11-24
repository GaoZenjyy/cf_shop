import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/home"

  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/register",
    component: () => import("../components/Register.vue")
  },
  {
    path: "/login",
    component: () => import("../components/Login.vue")
  },
  {
    path: "/class",
    component: () => import("../components/Classdata.vue")
  },
  {
    path: "/search",
    component: () => import("../components/Search.vue")
  },
  {
    path: "/me",
    component: () => import("../components/Me.vue"),
    meta: {
      ischk: true
    }
  },
  {
    path: "/edit",
    component: () => import("../components/Edit.vue"),
    meta: {
      ischk: true
    }
  },
  {
    path: "/cart",
    component: () => import("../components/Cart.vue"),
    meta: {
      ischk: true
    }
  },
  {
    path: "/detail/:id?",
    component: () => import("../components/Detail.vue")
  },
  {
    path: "/address",
    component: () => import("../components/Address.vue")
  },
  {
    path: "/addressedit",
    component: () => import("../components/Addressedit.vue")
  },
  {
    path: "/pay",
    component: () => import("../components/Pay.vue")
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 路由导航
router.beforeEach((to, from, next) => {
  // 有没有 登录 
  if (to.meta !== undefined && to.meta.ischk !== undefined && to.meta.ischk) {
    let token = localStorage.getItem("token")
    if (token === null) {
      next("/login")
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
