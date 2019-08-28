import home from '../../page/blog/home/home.vue'
import categories from '../../page/blog/categories/categories.vue'
import archives from '../../page/blog/archives/archives.vue'
import about from '../../page/blog/about/about.vue'
import search from '../../page/blog/search/search.vue'
import article from '../../page/blog/article/article.vue'
import list from '../../page/blog/categories/list.vue'
import resume from '../../page/blog/resume/resume.vue'

export default [
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
  },
  {
    path: '/article',
    component: article
  },
  {
    path: '/list',
    component: list
  },
  {
    path: '/resume',
    component: resume
  }
]
