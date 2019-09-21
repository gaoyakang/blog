const { 
  adminLoginModel,
  adminRegisterModel,
  adminExistModel,
  adminGetPasswordModel,
  adminAddArticleModel,
  adminAddCategoryModel,
  getCategoryListModel,
  deleteCategoryModel,
  modifyCategoryModel,
  getCategoryWithIdModel,
  deleteArticleWithIdModel,
  getArticleWithIdModel,
  getCategoryAllModel,
  saveArticleModel,
  publishArticleModel,
  getHomeStatisticsModel,
  getCategoryStatisticsModel,
  categoryExistModel,
  getCategoryNameWithIdModel,
  getArticleListModel
} = require('../model/admin')

//管理员注册
const adminRegisterController = (username, password) => {
  return adminRegisterModel(username, password).then(registerResult => {
    return registerResult
  })
}

// 管理员登录
const adminLoginController = (username, password) => {
	return adminLoginModel(username,password).then(loginData => {
	  return loginData
	})
}

// 判断用户是否存在
const adminExistController = (username) => {
  return adminExistModel(username).then(adminExistData => {
    return adminExistData
  })
}

// 获取对应用户密码
const adminGetPasswordController = (username) => {
  return adminGetPasswordModel(username).then(passData => {
    return passData
  })
}

// 获取后台首页的文章统计数据
const getHomeStatisticsController = () => {
  return getHomeStatisticsModel().then(staticData => {
    return staticData
  })
}

// 获取后台首页的分类统计数据
const getCategoryStatisticsController = () => {
  return getCategoryStatisticsModel().then(staticData => {
    return staticData
  })
}

// 判断分类标签是否存在
const categoryExistController = (name) => {
  return categoryExistModel(name).then(categoryExistData => {
    return categoryExistData
  })
}

// 获取所有分类标签
const getCategoryListController = () => {
  return getCategoryListModel().then(categoryData => {
    return categoryData
  })
}

// 添加文章
const adminAddArticleController = (params) => {
  return adminAddArticleModel(params).then(addData => {
    return addData
  })
}

// 添加分类
const adminAddCategoryController = (name) => {
  return adminAddCategoryModel(name).then(addData => {
    return addData
  })
}

// 删除特定id的分类标签
const deleteCategoryController = (id) => {
  return deleteCategoryModel(id).then(deleteData => {
    return deleteData
  })
}

// 修改特定id的分类标签
const modifyCategoryController = (id, name) => {
  return modifyCategoryModel(id, name).then(deleteData => {
    return deleteData
  })
}

// 获取对应id的分类标签文章列表
const getCategoryWithIdController = (id) => {
  return getCategoryWithIdModel(id).then(data => {
    return data
  })
}

// 获取对应id的文章的名称
const getCategoryNameWithIdController = (id) => {
  return getCategoryNameWithIdModel(id).then(data => {
    return data
  })
}

// 删除对应id的文章
const deleteArticleWithIdController = (id) => {
  return deleteArticleWithIdModel(id).then(data => {
    return data
  })
}

// 获取对应id的文章
const getArticleWithIdController = (id) => {
  return getArticleWithIdModel(id).then(data => {
    return data
  })
}

// 获取所有的分类标签
const getCategoryAllController = () => {
  return getCategoryAllModel().then(data => {
    return data
  })
}

//保存文章
const saveArticleController = (params) => {
  return saveArticleModel(params).then(data => {
    return data
  })
}

// 发布没有id的文章
const publishArticleController = (params) => {
  return publishArticleModel(params).then(data => {
    return data
  })
}

// 获取所有文章的列表
const getArticleListController = () => {
  return getArticleListModel().then(data => {
    return data
  })
}

module.exports = {
  adminLoginController,
  adminRegisterController,
  adminExistController,
  adminGetPasswordController,
  adminAddArticleController,
  adminAddCategoryController,
  getCategoryListController,
  deleteCategoryController,
  modifyCategoryController,
  getCategoryWithIdController,
  deleteArticleWithIdController,
  getArticleWithIdController,
  getCategoryAllController,
  saveArticleController,
  publishArticleController,
  getHomeStatisticsController,
  getCategoryStatisticsController,
  categoryExistController,
  getCategoryNameWithIdController,
  getArticleListController
}
