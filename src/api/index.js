import axios from 'axios'
import router from '../router/index'
// import store from '../store/index'
// const API_ROOT = 'http://blogapi.codebear.cn/index.php'
const API_ROOT = 'http://localhost:8080'
axios.defaults.baseURL = (API_ROOT)
axios.defaults.headers.Accept = 'application/json'
// axios.defaults.headers.common['Authorization'] = localStorage.token

axios.interceptors.request.use(config => {
  if (localStorage.token) {
    config.headers.Authorization = localStorage.token
  }
  // console.log('authorize>>>', config.headers.Authorization)
  return config
}, err => {
  return Promise.reject(err)
})

axios.interceptors.response.use(response => {
  return response
}, (err) => {
  if (err.response.status === 401) {
    window.localStorage.removeItem('token')
    router.push('/login')
  }
  return Promise.reject(err)
})
export default {
  // 获取文章列表
  getBlogArticleList (params) {
    return axios.get('api/article/list', {
      params: params
    })
  },
  // 获取文章信息
  getBlogArticle (articleId) {
    return axios.get('api/article/content', {
      params: {
        id: articleId
      }
    })
  },
  // 获取分类列表
  // getBlogCategoryList () {
  //   return axios.get('w/category/list')
  // },
  // // 获取标签列表
  // getBlogTagList () {
  //   return axios.get('/w/tag/list')
  // },
  // // 获取文章归档列表
  // getBlogArticleArchives (params) {
  //   return axios.get('w/article/archives', {
  //     params: params
  //   })
  // },
  // // 获取关于我的页面
  // getBlogAboutMe () {
  //   return axios.get('w/getAbout')
  // },
  // // 获取我的简历
  // getBlogResume () {
  //   return axios.get('w/getResume')
  // },
  // // 获取文章标题和简介搜索
  // searchArticle (params) {
  //   return axios.get('w/article/search', {
  //     params: params
  //   })
  // },
  // 管理员注册
  adminRegister (params) {
    return axios.post('api/admin/register', params)
  },
  // 管理员登录
  adminLogin (params) {
    return axios.post('api/admin/login', params)
  },
  // 添加分类
  addCategory (params) {
    return axios.get('api/admin/addCategory', {
      params: params
    })
  },
  // 获取所有的分类
  getCategoryList () {
    return axios.get('api/admin/getCategoryList')
  },
  // 删除特定id的分类标签
  deleteCategory (params) {
    return axios.get('api/admin/deleteCategory', {
      params: params
    })
  },
  // 修改特定id的分类标签
  modifyCategory (params) {
    return axios.get('api/admin/modifyCategory', {
      params: params
    })
  },
  // 获取对应id的分类标签文章列表
  getCategoryWithId (params) {
    return axios.get('api/admin/getCategoryWithId', {
      params: params
    })
  },
  // 删除对应id的文章
  deleteArticleWithId (params) {
    return axios.get('api/admin/deleteArticleWithId', {
      params: params
    })
  },
  // 获取对应id的文章
  getArticleWithId (params) {
    return axios.get('api/admin/getArticleWithId', {
      params: params
    })
  },
  // 获取所有的分类标签
  getCategoryAll () {
    return axios.get('api/admin/getCategoryAll')
  },
  // 保存文章
  saveArticle (params) {
    return axios.get('api/admin/saveArticle', {
      params: params
    })
  },
  // 发布文章
  publishArticle (params) {
    return axios.get('api/admin/article/publishArticle', {
      params: params
    })
  },
  getArticleList (params) {
    return axios.get('api/admin/article/list', {
      params: params
    })
  }
}
