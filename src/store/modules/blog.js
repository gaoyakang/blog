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
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
