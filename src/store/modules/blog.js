import api from '../../api/index'
const state = {}
const getters = {}
const mutations = {}
const actions = {
  // 获取前台首页的文章列表或者特定分类id下的文章列表
  getBlogArticleList (store, params) {
    return api.getBlogArticleList(params)
      .then((data) => {
        return Promise.resolve(data.data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  // 获取分类页标签列表
  getBlogCategoryList (store) {
    return api.getBlogCategoryList()
      .then((data) => {
        return Promise.resolve(data.data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  // 获取特定id的文章内容
  getBlogArticleWithId (store, articleId) {
    return api.getBlogArticleWithId(articleId)
      .then((data) => {
        return Promise.resolve(data.data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  // 获取与搜索内容相关的文章列表
  searchArticle (store, params) {
    return api.searchArticle(params)
      .then(data => {
        return Promise.resolve(data)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  // 获取标签列表
  getBlogTagList (store) {
    return api.getBlogTagList()
      .then((data) => {
        return Promise.resolve(data.data)
      })
      .then((error) => {
        return Promise.reject(error)
      })
  },
  // 获取文章归档列表
  getBlogArticleArchives (store, params) {
    return api.getBlogArticleArchives(params)
      .then((data) => {
        return Promise.resolve(data.data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  // 获取关于我的页面
  getBlogAboutMe (store) {
    return api.getBlogAboutMe()
      .then((data) => {
        return Promise.resolve(data.data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  // 获取我的简历
  getBlogResume (store) {
    return api.getBlogResume()
      .then((data) => {
        return Promise.resolve(data.data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
