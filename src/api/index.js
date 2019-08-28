import axios from 'axios'
// const API_ROOT = 'http://blogapi.codebear.cn/index.php'
const API_ROOT = 'http://localhost:8080'
axios.defaults.baseURL = (API_ROOT)
axios.defaults.headers.Accept = 'application/json'

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
  getBlogCategoryList () {
    return axios.get('w/category/list')
  },
  // 获取标签列表
  getBlogTagList () {
    return axios.get('/w/tag/list')
  },
  // 获取文章归档列表
  getBlogArticleArchives (params) {
    return axios.get('w/article/archives', {
      params: params
    })
  },
  // 获取关于我的页面
  getBlogAboutMe () {
    return axios.get('w/getAbout')
  },
  // 获取我的简历
  getBlogResume () {
    return axios.get('w/getResume')
  },
  // 获取文章标题和简介搜索
  searchArticle (params) {
    return axios.get('w/article/search', {
      params: params
    })
  },
  // 管理员注册
  adminRegister (params) {
    return axios.post('api/admin/register', params)
  },
  // 管理员登录
  adminLogin (params) {
    return axios.post('api/admin/login', params)
  }
}
