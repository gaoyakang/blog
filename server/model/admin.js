const { exec, escape } = require('../database/mysql')
const xss = require('xss')
// 后台管理员注册
const adminRegisterModel = (username, password) => {
	let user_id = Math.random().toString(36).substr(2);
  username = escape(username)
  username = xss(username)
  let date = Date.now()
	let sql = `insert into admin(user_id,username,password,create_time) values('${user_id}',${username},'${password}',${date});`
  return exec(sql).then(data => {
    if(data.affectedRows === 1) {
      return true
    }else{
      return false
    }
  })
}

// 后台管理员登录
const adminLoginModel = (username, password) => {
  username = xss(username)
  let sql = `select access_token from admin where username='${username}' and password='${password}';`
  return exec(sql)
}

// 后台判断用户是否存在
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

// 获取后台首页文章的统计数据
const getHomeStatisticsModel = () => {
  let sql = `select * from article where status='0';`
  return exec(sql)
}

// 获取后台首页分类的统计数据
const getCategoryStatisticsModel = () => {
  let sql = `select * from category;`
  return exec(sql)
}

// 判断分类标签是否存在
const categoryExistModel = (name) => {
  // 去掉空格并转化成小写
  let result = name.trim().replace(/\s/g, "").toLowerCase()
  let sql = `select * from category where category_name='${result}';`
  return exec(sql)
}

// 获取所有的分类标签
const getCategoryListModel = () => {
  let sql = `select * from category;`
  return exec(sql)
}

// 添加分类
const adminAddCategoryModel = (name) => {
  let id = Math.random().toString(36).substr(2);
  let create_time = Date.now()
  let update_time = Date.now()
  // let sql = `insert into category(id,category_name,create_time,update_time,article_count) values('sss','ssss',11111111,111111,10);`
  let sql = `insert into category(id,category_name,create_time,update_time) values('${id}','${name}',${create_time},${update_time});`
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

// 更新拥有需要更新分类的文章里的分类名称
const updateArticleCategoryModel = (id, name) => {
  let sql = `update article set category_name='${name}' where category_id='${id}';`
  // let sql2 = `update article set category_id='${id}',category_name='${name}';`
  return exec(sql).then(data => {
    if(data.affectedRows === 0){
      return false
    }else{
      return true
    }
  })
}

// 获取对应id的文章
const getArticleWithIdModel = (id) => {
  let sql =  `select * from article where id='${id}';`
  return exec(sql)
}

// 获取对应id的分类标签的文章列表
const getCategoryWithIdModel = (id) => {
  let sql = `select * from article where category_id='${id}';`
  return exec(sql).then(data => {
    return data
  })
}




// 发布文章
const adminAddArticleModel = (params) => {
  let id = params.id
  let title = params.title
  let category_id = params.category_id
  let category_name = params.category_name
  let create_time = Date.now()
  let publish_time = Date.now()
  let update_time = Date.now()
  let content = params.content
  let html_content = params.html_content
  let cover = params.cover
  let status = 0
  let subMessage = params.subMessage
  console.log(create_time)
  if(id){
    let sql = `update article set title='${title}',category_id='${category_id}',category_name='${category_name}',update_time=${update_time},publish_time=${publish_time},status='${status}',content="${content}",html_content='${html_content}',cover='${cover}',subMessage='${subMessage}' where id='${id}';`
  }else{
    let id = Math.random().toString(36).substr(2)
    let sql = `insert into article(id,title,category_id,category_name,create_time,update_time,publish_time,status,content,html_content,cover,subMessage) values('${id}','${title}','${category_id}','${category_name}',${create_time},${update_time},${publish_time},'${status}','${content}','${html_content}','${cover}','${subMessage}');`
    return exec(sql)
  }
}

// 删除对应id的文章
const deleteArticleWithIdModel = (id) => {
  let sql = `delete from article where id='${id}';`
  return exec(sql)
}


// 删除拥有需要删除分类的文章内的分类名称和id
const deleteArticleCategoryModel = (id) => {
  let sql = `update article set category_id='', category_name='' where category_id='${id}';`
  return exec(sql)
}


// 获取所有的分类标签
const getCategoryAllModel = () => {
  let sql =  `select * from category;`
  return exec(sql)
}

// 保存文章
const saveArticleModel = (params) => {
  let title = params.title
  let category_id = params.category_id
  let category_name = params.category_name
  let create_time = Date.now()
  let update_time = Date.now()
  let publish_time = Date.now()
  let status = 1
  let html_content = params.htmlContent
  let cover = params.cover
  let subMessage = params.subMessage
  let content = params.content
  if(params.id){
  // 存在id说明是再次保存，所以直接根据id来更新数据即可
    let id = params.id
    let sql = `update article set title='${title}',category_id='${category_id}',category_name='${category_name}',create_time=${create_time},update_time=${update_time},publish_time=${publish_time},status='${status}',content="${content}",html_content='${html_content}',cover='${cover}',subMessage='${subMessage}' where id='${id}';`
    return exec(sql)
  }else{
  // 不存在id说明是第一次保存，所以生成新的id保存数据即可
   let id = Math.random().toString(36).substr(2)
   let sql = `insert into article(id,title,category_id,category_name,create_time,update_time,publish_time,status,content,html_content,cover,subMessage) values('${id}','${title}','${category_id}','${category_name}',${create_time},${update_time},${publish_time},'${status}','${content}','${html_content}','${cover}','${subMessage}');`
    return exec(sql)
  }
}

// 发布文章
const publishArticleModel = (params,username) => {
  let title = params.title
  let category_id = params.category_id
  let create_time = Date.now()
  let update_time = Date.now()
  let publish_time = Date.now()
  let status = 0
  let html_content = params.htmlContent
  let cover = params.cover
  let subMessage = params.subMessage
  let content = params.content
  let category_name = params.category_name
  // console.log(params.id)
  if(params.id){
    let id = params.id
    let sql = `update article set title='${title}',category_id='${category_id}',category_name='${category_name}',create_time=${create_time},update_time=${update_time},publish_time=${publish_time},status='${status}',content="${content}",html_content='${html_content}',cover='${cover}',subMessage='${subMessage}',username='${username}' where id='${id}';`
    return exec(sql)
  }else{
    let id = Math.random().toString(36).substr(2)
    // console.log(content)
    let sql = `insert into article(id,title,category_id,category_name,create_time,update_time,publish_time,status,html_content,cover,subMessage,username,content) values('${id}','${title}','${category_id}','${category_name}',${create_time},${update_time},${publish_time},'${status}','${html_content}','${cover}','${subMessage}','${username}','${content}');`
    return exec(sql)
  }
}

// 获取所有的文章列表
const getArticleListModel = () => {
  // 属于后台的文章展示所以发布和保存的文章都要找出来
  let sql = `select * from article;`
  return exec(sql)
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
  getHomeStatisticsModel,
  getCategoryStatisticsModel,
  categoryExistModel,
  getArticleListModel,
  updateArticleCategoryModel,
  deleteArticleCategoryModel
}

