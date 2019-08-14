import api from '../../api/index'
const state = {}
const getters = {}
const mutations = {}
const actions = {
  // 获取文章列表
  getBlogArticleList (store, params) {
    return api.getBlogArticleList(params)
      .then((data) => {
        return Promise.resolve(data.data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  // 获取文章信息
  getBlogArticle (store, articleId) {
    return api.getBlogArticle(articleId)
      .then((data) => {
        return Promise.resolve(data.data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  // 获取分类列表
  getBlogCategoryList (store) {
    return api.getBlogCategoryList()
      .then((data) => {
        return Promise.resolve(data.data)
      })
      .catch((error) => {
        return Promise.reject(error)
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
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
