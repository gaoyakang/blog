const { 
  adminLoginModel,
  adminRegisterModel,
  adminExistModel,
  adminGetPasswordModel
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
module.exports = {
  adminLoginController,
  adminRegisterController,
  adminExistController,
  adminGetPasswordController
}
