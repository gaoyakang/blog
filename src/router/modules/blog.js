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
    components: {
      all: home
    }
  },
  {
    path: '/home',
    components: {
      home: home
    }
  },
  {
    path: '/categories',
    components: {
      categories: categories
    }
  },
  {
    path: '/archives',
    components: {
      archives: archives
    }
  },
  {
    path: '/about',
    components: {
      about: about
    }
  },
  {
    path: '/search',
    components: {
      search: search
    }
  },
  {
    path: '/article',
    components: {
      article: article
    }
  },
  {
    path: '/list',
    components: {
      list: list
    }
  },
  {
    path: '/resume',
    components: {
      resume: resume
    }
  }
]
