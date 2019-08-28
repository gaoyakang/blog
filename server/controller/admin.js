const { 
  adminLoginModel,
  adminRegisterModel
} = require('../model/admin')

//管理员注册
const adminRegisterController = (username, password, token) => {
  return adminRegisterModel(username, password, token).then(registerResult => {
    return registerResult
  })
}

// 管理员登录
const adminLoginController = (username, password) => {
	return adminLoginModel(username,password).then(loginData => {
	  return loginData
	})
}

module.exports = {
  adminLoginController,
  adminRegisterController
}
