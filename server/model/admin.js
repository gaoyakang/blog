const { exec } = require('../database/mysql')

// 管理员注册
const adminRegisterModel = (username, password,token) => {
	let user_id = Math.random().toString(36).substr(2);
	let sql = `insert into admin(user_id,username,password,access_token,create_time) values('${user_id}','${username}','${password}','${token}',1566951209018);`
  return exec(sql)
}

// 管理员登录
const adminLoginModel = (username, password) => {
  let sql = `select access_token from admin where username='${username}' and password='${password}';`
  return exec(sql)
}

module.exports = {
  adminLoginModel,
  adminRegisterModel
}

