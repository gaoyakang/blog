import Vue from 'vue'
import Router from 'vue-router'
import home from '../page/blog/home/home'
import categories from '../page/blog/categories/categories'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      component: home
    },
    {
      path: '/home',
      component: home
    },
    {
      path: '/categories',
      component: categories
    }
  ]
})
