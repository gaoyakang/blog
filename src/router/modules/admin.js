import login from '../../page/admin/login/login'
import register from '../../page/admin/register/register'
import adminHome from '../../page/admin/home/home'

export default [
  {
    path: '/login',
    component: login
  },
  {
    path: '/register',
    component: register
  },
  {
    path: '/admin',
    component: adminHome,
    meta: {
      requireAuth: true
    }
  }
]
