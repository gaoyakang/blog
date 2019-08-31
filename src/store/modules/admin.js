import api from '../../api/index'

const state = {
  token: ''
}

const getters = {}

const mutations = {}

const actions = {
  // 管理员登录
  adminLogin (store, params) {
    return api.adminLogin(params)
      .then(data => {
        return Promise.resolve(data.data)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  // 管理员注册
  adminRegister (store, params) {
    return api.adminRegister(params)
      .then(data => {
        return Promise.resolve(data.data)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  // 保存token
  saveToken (store, token) {
    store.state.token = token
  },
  // 获取文章列表
  getArticleList (store, params) {
    return api.getArticleList(params)
      .then(data => {
        return Promise.resolve(data.data)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
