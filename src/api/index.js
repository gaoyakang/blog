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
  // 后台生成七牛token
  getQiniuToken () {
    return axios.get('api/admin/getQiniuToken')
  },
  // 后台管理员注册
  adminRegister (params) {
    return axios.post('api/admin/register', params)
  },
  // 后台管理员登录
  adminLogin (params) {
    return axios.post('api/admin/login', params)
  },
  // 后台首页统计数据
  getHomeStatistics () {
    return axios.get('api/admin/getHomeStatistics')
  },
  // 后台所有的分类
  getCategoryList () {
    return axios.get('api/admin/getCategoryList')
  },
  // 后台添加分类
  addCategory (params) {
    return axios.get('api/admin/addCategory', {
      params: params
    })
  },
  // 后台删除特定id的分类标签
  deleteCategory (params) {
    return axios.get('api/admin/deleteCategory', {
      params: params
    })
  },
  // 后台修改特定id的分类标签
  modifyCategory (params) {
    return axios.get('api/admin/modifyCategory', {
      params: params
    })
  },
  // 后台查询对应id的分类标签下的文章列表
  getCategoryWithId (params) {
    return axios.get('api/admin/article/getCategoryWithId', {
      params: params
    })
  },
  // 后台获取对应id的文章
  getArticleWithId (params) {
    return axios.get('api/admin/getArticleWithId', {
      params: params
    })
  },
  // 获取所有的分类标签
  getCategoryAll (params) {
    return axios.get('api/admin/getCategoryAll')
  },
  // 删除对应id的文章
  deleteArticleWithId (params) {
    return axios.get('api/admin/article/deleteArticleWithId', {
      params: params
    })
  },
  // 后台保存文章
  saveArticle (params) {
    return axios.get('api/admin/saveArticle', {
      params: params
    })
  },
  // 后台发布文章
  publishArticle (params) {
    return axios.get('api/admin/article/publishArticle', {
      params: params
    })
  },
  getArticleList () {
    return axios.get('api/admin/article/getArticleList')
  },
  // 获取前台首页当前页文章列表或者特定分类id下的文章列表
  getBlogArticleList (params) {
    return axios.get('api/article/getBlogArticleList', {
      params: params
    })
  },
  // 获取前台分类页标签列表
  getBlogCategoryList () {
    return axios.get('api/article/getBlogCategoryList')
  },
  // 获取前台特定id的文章内容
  getBlogArticleWithId (articleId) {
    return axios.get('api/article/getBlogArticleWithId', {
      params: {
        id: articleId
      }
    })
  },
  // 获取搜索内容相关的文章列表
  searchArticle (params) {
    return axios.get('api/article/searchArticle', {
      params: params
    })
  }
}
