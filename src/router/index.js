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
  // console.log(window.localStorage.getItem('token'))
  // if (window.localStorage.getItem('token') && to.fullPath.includes('/admin')) {
  //   next('/admin')
  // } else {
  //   next()
  // }
  // if (to.meta.requireAuth) {
  //   if (!window.localStorage.getItem('token')) {
  //     next('/login')
  //   }
  //   next(to.fullPath)
  // }
  next()
})

export default router
