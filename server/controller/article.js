const { 
  getListModel,
  getListCountModel,
  getBlogContentModel
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

// 获取文章内容
const getBlogContentController = (id) => {
  return getBlogContentModel(id).then(contentData => {
    return contentData
  })
}
module.exports = {
  getListController,
  getListCountController,
  getBlogContentController
}
