const { exec } = require('../database/mysql')

// 前台获取首页文章列表或者特定分类id下的文章列表
const getListModel = (page, pageSize, categoryId) => {
  if(categoryId){
    let startRow = (parseInt(page) + 1 - 1) * pageSize
    let sql = `select * from article where status='0' and category_id='${categoryId}' limit ${startRow},${pageSize};`
    return exec(sql).then(data => {
      return data
    })
  }else{
    let startRow = (parseInt(page) + 1 - 1) * pageSize
    let sql = `select * from article where status='0' limit ${startRow},${pageSize};`
    return exec(sql).then(data => {
      return data
    })
  }
}
//获取文章总数
const getListCountModel = () => {
  let sql = `select count(*) from article where status='0';`
  return exec(sql)
}

//获取文章内容
const getBlogContentModel = (id) => {
  let sql = `select * from article where id='${id}';`
  return exec(sql)
}


// 获取分类的标签列表
const getBlogCategoryListModel = () => {
  let sql = `select * from category;`
  return exec(sql)
}

// 获取搜索相关的内容的文章列表
const searchArticleModel = (params) => {
  let searchValue = params.searchValue
  let page = params.page
  let pageSize = params.pageSize
  let startRow = (parseInt(page) + 1 - 1) * pageSize
  let sql = `select * from article where category_name like '%${searchValue}%' or title like '%${searchValue}%' or submessage like '%${searchValue}%' and status='0' limit ${startRow},${pageSize};`
  return exec(sql)
}


module.exports = {
  getListModel,
  getListCountModel,
  getBlogContentModel,
  getBlogCategoryListModel,
  searchArticleModel
}