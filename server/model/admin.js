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

// 添加文章
const adminAddArticleModel = (params) => {
  let id = '22'
  let title = params.title
  let category_id = '22'
  let create_time = Date.now()
  let content = params.content
  let html_content = params.html_content
  let pageview = 999
  let cover = params.cover
  let sql = `insert into article(category_id,cover,create_time,id,pageview,publish_time,subMessage,title,update_time,html_content) values(${category_id},${cover},${create_time},${id},${pageview},${create_time},${subMessage},${title},${create_time},${html_content});`;
  return exec(sql)
}

// 添加分类
const adminAddCategoryModel = (name) => {
  let id = Math.random().toString(36).substr(2);
  let create_time = Date.now()
  let update_time = Date.now()
  let article_count = 0
  // let sql = `insert into category(id,category_name,create_time,update_time,article_count) values('sss','ssss',11111111,111111,10);`
  let sql = `insert into category(id,category_name,create_time,update_time,article_count) values('${id}','${name}',1111111,11111,${article_count});`
  return exec(sql)
}

// 获取所有的分类标签
const getCategoryListModel = () => {
  let sql = `select * from category;`
  return exec(sql)
}

// 删除特定id的分类标签
const deleteCategoryModel = (id) => {
  let sql = `delete from category where id='${id}';`
  return exec(sql)
}

// 修改特定id的分类标签
const modifyCategoryModel = (id, name) => {
  let sql = `update category set category_name='${name}' where id='${id}';`
  return exec(sql)
}

// 获取对应id的分类标签的文章总数
const getCategoryWithIdModel = (id) => {
  let sql = `select * from article where category_id='${id}';`
  return exec(sql)
}

// 删除对应id的文章
const deleteArticleWithIdModel = (id) => {
  let sql = `delete from article where id='${id}';`
  return exec(sql)
}

// 获取对应id的文章
const getArticleWithIdModel = (id) => {
  let sql =  `select * from article where id='${id}';`
  return exec(sql)
}

// 获取所有的分类标签
const getCategoryAllModel = () => {
  let sql =  `select * from category;`
  return exec(sql)
}

// 保存文章
const saveArticleModel = (params) => {
  console.log(params)
  let id = Math.random().toString(36).substr(2)
  let title = params.title
  let category_id = 'culice3023t'
  let create_time = Date.now()
  let update_time = Date.now()
  let publish_time = Date.now()
  let status = 1
  let html_content = params.html_content
  let cover = params.cover
  let subMessage = params.subMessage
  let pageview = 5555
  let sql = `insert into article(id,title,category_id,create_time,update_time,publish_time,status,html_content,cover,subMessage,pageview) values('${id}','${title}','${category_id}',11111,11111,11111,'${status}','${html_content}','${cover}','${subMessage}','${pageview}');`
  return exec(sql).then(data => {
    return id
  })
}

// 发布文章
const publishArticleModel = (params) => {
  let sql = `insert into article(id,title,category_id,create_time,update_time,publish_time,status,html_content,cover,subMessage,pageview) values('${id}','${title}','${category_id}',11111,11111,11111,'${status}','${html_content}','${cover}','${subMessage}','${pageview}');`
  return exec(sql).then(data => {
    return params
  })
}

// 发布拥有id的文章
const publishArticleWithIdModel = (params) => {
  let id = params.id
  let title = params.title
  let category_id = 'culice3023t'
  let create_time = 111111
  let update_time = 111111
  let publish_time = 111111
  let status = 0
  let html_content = params.html_content
  let cover = params.cover
  let subMessage = params.subMessage
  let pageview = 5555
  let sql = `update article set id='${id}',title='${title}',category_id='${category_id}',create_time=${create_time},update_time=${update_time},publish_time=${publish_time},status=${status},html_content='${html_content}',cover='${cover}',subMessage='${subMessage}',pageview=${pageview} where id='${id}';`
  return exec(sql).then(data => {
    return params
  })
}

module.exports = {
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
  publishArticleWithIdModel
}

