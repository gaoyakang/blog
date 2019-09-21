import login from '../../page/admin/login/login'
import register from '../../page/admin/register/register'
import adminHome from '../../page/admin/home/home'
import leftMenu from '../../page/admin/menu/menu'
import articleManage from '../../page/admin/article/articleManage'
import adminCategories from '../../page/admin/categories/adminCategories'
import articlePreview from '../../page/admin/article/articlePreview'
import articleEdit from '../../page/admin/article/articleEdit'
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
      leftMenu: leftMenu,
      adminHome: adminHome
    },
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/admin/categories',
    components: {
      leftMenu: leftMenu,
      adminCategories: adminCategories
    },
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/admin/article/preview',
    components: {
      leftMenu: leftMenu,
      articlePreview: articlePreview
    },
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/admin/article/edit',
    components: {
      leftMenu: leftMenu,
      articleEdit: articleEdit
    },
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/admin/article/manage',
    components: {
      leftMenu: leftMenu,
      articleManage: articleManage
    },
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/admin/article/list',
    components: {
      leftMenu: leftMenu,
      articleList: articleList
    },
    meta: {
      requireAuth: true
    }
  }
]
