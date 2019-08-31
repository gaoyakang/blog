const { exec, escape } = require('../database/mysql')
const xss = require('xss')
// 管理员注册
const adminRegisterModel = (username, password) => {
	let user_id = Math.random().toString(36).substr(2);
  username = escape(username)
  username = xss(username)
  let date = Date.now()
	let sql = `insert into admin(user_id,username,password,access_token,create_time) values('${user_id}',${username},'${password}','',${date});`
  return exec(sql).then(data => {
    if(data.affectedRows === 1) {
      return true
    }else{
      return false
    }
  })
}

// 管理员登录
const adminLoginModel = (username, password) => {
  username = xss(username)
  let sql = `select access_token from admin where username='${username}' and password='${password}';`
  return exec(sql)
}

//判断用户是否存在
const adminExistModel = (username) => {
  let sql = `select username from admin where username='${username}';`
  return exec(sql).then(data => {
    if(data.length > 0) {
      return true
    }else{
      return false
    }
  })
}

// 获取对应用户密码
const adminGetPasswordModel = (username) => {
  username = escape(username)
  username = xss(username)
  let sql = 'select `password` from admin where username=' + username + ';'
  return exec(sql)
}

module.exports = {
  adminLoginModel,
  adminRegisterModel,
  adminExistModel,
  adminGetPasswordModel
}

