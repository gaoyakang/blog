import login from '../../page/admin/login/login'
import register from '../../page/admin/register/register'
import adminHome from '../../page/admin/home/home'
import menu from '../../page/admin/menu/menu'
import articleManage from '../../page/admin/article/articleManage'
import adminCategories from '../../page/admin/categories/adminCategories'
import articlePreview from '../../page/admin/article/articlePreview'
import articleEdit from '../../page/admin/article/articleEdit'
import articleDeleted from '../../page/admin/article/articleDeleted'
import articleDrafts from '../../page/admin/article/articleDrafts'
import articleList from '../../page/admin/article/articleList'

export default [
  {
    path: '/login',
    components: {
      login: login
    }
  },
  {
    path: '/register',
    components: {
      register: register
    }
  },
  {
    path: '/admin',
    components: {
      menu: menu,
      adminHome: adminHome
    },
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/admin/categories',
    components: {
      menu: menu,
      adminCategories: adminCategories
    },
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/admin/article/preview',
    components: {
      menu: menu,
      articlePreview: articlePreview
    },
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/admin/article/edit',
    components: {
      menu: menu,
      articleEdit: articleEdit
    },
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/admin/article/deleted',
    components: {
      menu: menu,
      articleDeleted: articleDeleted
    },
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/admin/article/manage',
    components: {
      menu: menu,
      articleManage: articleManage
    },
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/admin/article/drafts',
    components: {
      menu: menu,
      articleDrafts: articleDrafts
    },
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/admin/article/list',
    components: {
      menu: menu,
      articleList: articleList
    },
    meta: {
      requireAuth: true
    }
  }
]
