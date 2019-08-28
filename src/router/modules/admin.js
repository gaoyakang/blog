import login from '../../page/admin/login/login.vue'
import register from '../../page/admin/register/register.vue'
import adminHome from '../../page/admin/home/home.vue'

export default [
  {
    path: '/login',
    name: 'login',
    components: {
      login: login
    }
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
