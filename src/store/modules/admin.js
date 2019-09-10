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
  // 添加分类
  addCategory (store, params) {
    return api.addCategory(params)
      .then(data => {
        return Promise.resolve(data.data)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  // 获取所有分类
  getCategoryList (store) {
    return api.getCategoryList()
      .then(data => {
        return Promise.resolve(data.data)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  // 删除特定id的分类标签
  deleteCategory (store, id) {
    return api.deleteCategory(id)
      .then(data => {
        return Promise.resolve(data)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  // 修改对应id的分类标签
  modifyCategory (store, id) {
    return api.modifyCategory(id)
      .then(data => {
        return Promise.resolve(data)
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
  },
  // 发布文章
  publishArticle (store, params) {
    return api.publishArticle(params)
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
