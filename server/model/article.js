const { exec } = require('../database/mysql')


const getListModel = (page, pageSize) => {
  let sql = `select * from article;`
  return exec(sql)
}

module.exports = {
  getListModel
}
