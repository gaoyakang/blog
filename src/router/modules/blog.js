import mHeader from '../../components/mHeader'
import mFooter from '../../components/mFooter'
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
      header: mHeader,
      all: home,
      footer: mFooter
    }
  },
  {
    path: '/home',
    components: {
      header: mHeader,
      home: home,
      footer: mFooter
    }
  },
  {
    path: '/categories',
    components: {
      header: mHeader,
      categories: categories,
      footer: mFooter
    }
  },
  {
    path: '/archives',
    components: {
      header: mHeader,
      archives: archives,
      footer: mFooter
    }
  },
  {
    path: '/about',
    components: {
      header: mHeader,
      about: about,
      footer: mFooter
    }
  },
  {
    path: '/search',
    components: {
      header: mHeader,
      search: search,
      footer: mFooter
    }
  },
  {
    path: '/article',
    components: {
      header: mHeader,
      article: article,
      footer: mFooter
    }
  },
  {
    path: '/list',
    components: {
      header: mHeader,
      list: list,
      footer: mFooter
    }
  },
  {
    path: '/resume',
    components: {
      header: mHeader,
      resume: resume,
      footer: mFooter
    }
  }
]
