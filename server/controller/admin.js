const { 
  adminLoginModel,
  adminRegisterModel,
  adminExistModel,
  adminGetPasswordModel,
  adminAddArticleModel,
  adminAddCategoryModel,
  getCategoryListModel,
  deleteCategoryModel,
  modifyCategoryModel
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

// 获取所有分类标签
const getCategoryListController = () => {
  return getCategoryListModel().then(categoryData => {
    return categoryData
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

module.exports = {
  adminLoginController,
  adminRegisterController,
  adminExistController,
  adminGetPasswordController,
  adminAddArticleController,
  adminAddCategoryController,
  getCategoryListController,
  deleteCategoryController,
  modifyCategoryController
}
