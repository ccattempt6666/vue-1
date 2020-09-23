import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/Index.vue'
import Login from '../components/Login.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/index', name: 'index', component: Index },
  { path: '/login', name: 'login', component: Login }
]

const router = new VueRouter({
  routes
})

// 设置路由拦截 只允许登录成功后才可以直接从地址栏进入页面
router.beforeEach((to, from, next) => {
  // console.log(to)
  // 获取前往的页面的路径和token值
  const path = to.path
  const token = localStorage.getItem('token')
  // 判断是否为登录页 以及 token值是否存在，若为登录页或者存在token值则放行
  if (path === '/login' || token) {
    next()
  } else {
    // 否则跳转到登录页
    next('/login')
  }
})

export default router
