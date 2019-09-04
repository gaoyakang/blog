import Vue from 'vue'
import VueRouter from 'vue-router'
import blog from './modules/blog.js'
import admin from './modules/admin.js'
// import store from '../store/index.js'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    ...blog,
    ...admin
  ]
})

// 此时会重新触发执行这个钩子，而不是在这个钩子函数继续执行的
router.beforeEach((to, from, next) => {
  let needAuth = to.meta.requireAuth
  if (needAuth) {
    // 判断是否存在token
    let token = window.localStorage.getItem('token')
    console.log(token)
    if (!token) {
      return next('/login')
    } else {
      next()
    }
  }
  next()
})

export default router
