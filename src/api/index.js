import axios from 'axios'
const API_ROOT = 'http://blogapi.codebear.cn/index.php'

axios.defaults.baseURL = (API_ROOT)
axios.defaults.headers.Accept = 'application/json'

export default {
  // 获取文章列表
  getBlogArticleList (params) {
    return axios.get('w/article/list', {
      params: params
    })
  },
  // 获取文章信息
  getBlogArticle (articleId) {
    return axios.get('w/article', {
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
  }
}
