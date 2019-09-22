const { 
  getListModel,
  getListCountModel,
  getBlogContentModel,
  getBlogCategoryListModel,
  searchArticleModel
} = require('../model/article')

// 获取当前页文章列表
const getListController = (page, pageSize, categoryId) => {
	return getListModel(page,pageSize,categoryId).then(articleData => {
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

// 获取分类页的标签列表
const getBlogCategoryListController = () => {
  return getBlogCategoryListModel().then(cateData => {
    return cateData
  })
}

// 获取搜索内容相关的文章列表
const searchArticleCotroller = (params) => {
  return searchArticleModel(params).then(articleData => {
    return articleData
  })
}




module.exports = {
  getListController,
  getListCountController,
  getBlogContentController,
  getBlogCategoryListController,
  searchArticleCotroller
}
