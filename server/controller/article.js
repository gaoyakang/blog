const { getListModel } = require('../model/article')

const getListController = (page, pageSize) => {
  return getListModel(page, pageSize)
}

module.exports = {
  getListController
}
