const { 
  getListModel,
  getListCountModel,
} = require('../model/article')

// 获取当前页文章列表
const getListController = (page, pageSize) => {
	return getListModel(page,pageSize).then(articleData => {
	  return articleData
	})
}

// 获取文章总数
const getListCountController = () => {
  return getListCountModel().then(countData => {
  	let count = countData[0]['count(*)']
    return count
  })
}


module.exports = {
  getListController,
  getListCountController,
}
