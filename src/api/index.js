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
  }
}
