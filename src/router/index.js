import Vue from 'vue'
import Router from 'vue-router'
import home from '../page/blog/home/home.vue'
import categories from '../page/blog/categories/categories.vue'
import archives from '../page/blog/archives/archives.vue'
import about from '../page/blog/about/about.vue'
import search from '../page/blog/search/search.vue'

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
    },
    {
      path: '/archives',
      component: archives
    },
    {
      path: '/about',
      component: about
    },
    {
      path: '/search',
      component: search
    }
  ]
})
