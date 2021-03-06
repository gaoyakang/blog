var express = require('express');
var router = express.Router();
const {
  getListController,
  getListCountController,
  getBlogContentController,
  getBlogCategoryListController,
  searchArticleCotroller
} = require('../controller/article');
const { SuccessModel, ErrorModel } = require('../model/resModel');

// 前台获取首页文章列表(检验完成)
router.get('/getBlogArticleList', function(req, res, next) {
  const page = req.query.page;
  const pageSize = req.query.pageSize;
  const categoryId = req.query.categoryId
  const listResult = getListController(page, pageSize, categoryId)
  // 由于前面的控制器获得的只是当前页的文章所以还需要写一个控制器来获得所有的文章总数
  const countResult = getListCountController()
  return Promise.all([listResult,countResult]).then(data => {
    // console.log(data)
    const result = {}
    result.list = []
    result.count = data[1]
    data[0].forEach((item,index) => {
      result.list[index] = {article:item}
    })
    if(categoryId){
      result.count = data[0].length
    }
    res.json(
          new SuccessModel(result)
      )
  }).catch(err => {
    console.log(err)
  })
});

// 前台获取分类页标签列表(检验完成)
router.get('/getBlogCategoryList',function(req,res,next) {
  return getBlogCategoryListController().then(data => {
    res.json(new SuccessModel(data, 'success'))
  })
})

// 前台获取特定id的文章内容(检验完成)
router.get('/getBlogArticleWithId',function(req,res,next) {
  const id = req.query.id
  return getBlogContentController(id).then(data => {
    // console.log(data)
    res.json(new SuccessModel(data, 'success'))
  })
})

// 获得前台搜索内容相关的文章列表
router.get('/searchArticle',function(req,res,next){
  const params = req.query
  return searchArticleCotroller(params).then(data => {
    // console.log(data)
    res.json(new SuccessModel(data, 'success'))
  })
})

// 获取对应id的分类下的文章列表
// router.get('/getBlogArticleList',function(req,res,next) {
//   const id = req.query.id
//   res.json(new SuccessModel(id, 'Success'))
// })




module.exports = router;
