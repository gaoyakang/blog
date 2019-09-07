const { exec } = require('../database/mysql')

//获取当前页列表
const getListModel = (page, pageSize) => {
  let startRow = (parseInt(page) + 1 - 1) * pageSize
  let sql = `select * from article limit ${startRow},${pageSize};`
  return exec(sql).then(data => {
    return data
  })
}
//获取文章总数
const getListCountModel = () => {
  let sql = `select count(*) from article;`
  return exec(sql)
}

//获取文章内容
const getBlogContentModel = (id) => {
  console.log(id)
  let sql = `select * from article where id='${id}'`
  return exec(sql)
}
module.exports = {
  getListModel,
  getListCountModel,
  getBlogContentModel
}