import api from '../../api/index'

const state = {}

const getters = {}

const mutations = {}

const actions = {
  // 生成七牛token
  getQiniuToken (store) {
    return api.getQiniuToken()
      .then(data => {
        return Promise.resolve(data)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
  // 后台管理员注册
  adminRegister (store, params) {
    return api.adminRegister(params)
      .then(data => {
        return Promise.resolve(data.data)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  // 后台管理员登录
  adminLogin (store, params) {
    return api.adminLogin(params)
      .then(data => {
        return Promise.resolve(data.data)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  // 后台首页统计数据
  getHomeStatistics (store) {
    return api.getHomeStatistics()
      .then(data => {
        return Promise.resolve(data)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  // 后台所有分类
  getCategoryList (store) {
    return api.getCategoryList()
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
  // 获取对应id的分类标签的文章数目
  getCategoryWithId (store, id) {
    return api.getCategoryWithId(id)
      .then(data => {
        return Promise.resolve(data)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  // 删除对应id的文章
  deleteArticleWithId (store, id) {
    return api.deleteArticleWithId(id)
      .then(data => {
        return Promise.resolve(data)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  // 获取所有的分类
  getCategoryAll (store) {
    return api.getCategoryAll()
      .then(data => {
        return Promise.resolve(data)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  // 获取对应id的文章
  getArticleWithId (store, id) {
    return api.getArticleWithId(id)
      .then(data => {
        return Promise.resolve(data)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  // 保存文章
  saveArticle (store, params) {
    return api.saveArticle(params)
      .then(data => {
        return Promise.resolve(data)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  // 获取文章列表
  getArticleList (store) {
    return api.getArticleList()
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
  },
  // 获得前台详情页具体的内容
  getBlogArticle (store, params) {
    return api.getBlogArticle(params)
      .then(data => {
        return Promise.resolve(data)
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
