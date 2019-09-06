import api from '../../api/index'

const state = {
  // showHeader: true
}

const getters = {
  // showHeader (state) {
  //   return state.showHeader
  // }
}

const mutations = {
  // setShowHeader (state, showHeader) {
  //   state.showHeader = showHeader
  // }
}

const actions = {
  // 设置登录状态
  // setLogin (ctx, showHeader) {
  //   ctx.commit('setShowHeader', showHeader)
  // },
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
