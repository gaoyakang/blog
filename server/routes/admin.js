var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport')
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { TokenSecret } = require('../config/secret.js');
const {
  adminRegisterController,
  adminLoginController,
  getHomeStatisticsController,
  adminExistController,
  adminGetPasswordController,
  adminAddArticleController,
  adminAddCategoryController,
  getCategoryListController,
  deleteCategoryController,
  modifyCategoryController,
  getCategoryWithIdController,
  deleteArticleWithIdController,
  getArticleWithIdController,
  getCategoryAllController,
  saveArticleController,
  publishArticleController,
  getCategoryStatisticsController,
  categoryExistController,
  getCategoryNameWithIdController,
  getArticleListController,
  updateArticleCategoryController,
  deleteArticleCategoryController
} = require('../controller/admin');
const qiniu = require('qiniu')
const { cdn } = require('../config/secret')


// const verifyToken = require('../middleware/verifyToken')
const verifyToken = (req,res) => {
  return new Promise((resolve,reject) => {
    let token = req.headers.authorization
    if(token){
      jwt.verify(token,TokenSecret,(err,decode) => {
        if(err){
        switch(err.name){
          case 'JsonWebTokenError':
            res.status(401).json(new ErrorModel(err,'无效token'))
            reject()
            break
          case 'TokenExpiredError':
            res.status(401).json(new ErrorModel(err,'token失效'))
            reject()
            break
        }
      }
      resolve(decode)
      })
    }else{
      res.status(401).json(new ErrorModel(err,'不存在token'))
      reject()
    }
  })
}

// 后台生成七牛云上传token
router.get('/getQiniuToken', function(req, res, next) {
  verifyToken(req,res).then(data => {
    let mac = new qiniu.auth.digest.Mac(cdn.ak, cdn.sk)
    let options = {
      scope: cdn.bucket
    }
    let putPolicy = new qiniu.rs.PutPolicy(options)
    let uploadToken = putPolicy.uploadToken(mac)
    res.json(new SuccessModel(uploadToken,'success'))
  }).catch(err => {
    console.log(err)
  })
})


// 后台用户注册（检验完成）
router.post('/register', function(req, res, next) {
  const { username, password } = req.body
  //查询用户是否存在
  return adminExistController(username).then(existData => {
    if(!existData){
       // 密码加密
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if(err) { 
              throw err 
            } else {
              return adminRegisterController(username,hash).then(registerData => {
                    if(registerData){
                      res.json(new SuccessModel(registerData,'注册成功'))
                    }else{
                      res.json(new ErrorModel('注册失败'))
                    }
                  })
            }
          })
      })
    }else{
      res.json(
        new ErrorModel('用户已经存在')
      )
    }
    
  }).catch(() => {})
})

// 后台用户登录(检验完成)
router.post('/login', function(req, res, next) {
  const { username, password } = req.body
  const existResult = adminExistController(username)
  const passResult = adminGetPasswordController(username)
  return Promise.all([existResult,passResult]).then(data => {
    let existData = data[0]
    //判断用户是否存在
    if(existData){
      //解密
      let passData = data[1][0].password
      bcrypt.compare(password,passData,(err,isMatch) => {
        if(err){
          throw err
        }else{
          //判断解密是否匹配
          if(isMatch){
            // 生成jwt令牌
            jwt.sign({username:username},TokenSecret,{expiresIn:3600},(err,token) => {
              if(err){
                throw err
              }else{
                res.json(new SuccessModel(token,'登录成功'))
              }
            })
          }else{
            res.json(new ErrorModel(isMatch, '账号密码不匹配'))
          }
        }
      })
    }else{
      res.json(new ErrorModel(existData,'该用户不存在'))      
    }
  })
});


// 后台首页的统计数据(检验完成)
router.get('/getHomeStatistics', function(req, res, next) {
  verifyToken(req,res).then(data => {
    // let user = data.username
    let articleResult = getHomeStatisticsController()
    let categoryResult = getCategoryStatisticsController()
    return Promise.all([articleResult,categoryResult]).then(data => {
      // console.log(data[0])
      if(data){
        const result = {}
        result.list = []
        result.articleCount = data[0].length
        result.categoryCount = data[1].length
        data[0].forEach((item,index) => {
          result.list[index] = item
        })
        res.json(new SuccessModel(result,'Success'))
      }
    })
  }).catch(err => {
    console.log(err)
  })
})

// 后台获取所有分类标签(检验完成)
router.get('/getCategoryList', function(req, res, next) {
  verifyToken(req,res).then(data => {
    getCategoryListController().then(data =>{
      if(data){
        res.json(new SuccessModel(data, 'success'))
      }else{
        res.json(new ErrorModel(data, 'error'))
      }
    })
  })
})

// 后台添加分类标签(检验完成)
router.get('/addCategory', function(req, res, next) {
  verifyToken(req,res).then(data => {
    const name = req.query[0]
    //判断分类是否存在
    categoryExistController(name).then(data => {
      if(data.length === 0){
        //分类不存在就进行添加
        adminAddCategoryController(name).then(data => {
          if(data){
            res.json(new SuccessModel(data, '添加成功'))
          }else{
            res.json(new ErrorModel(data, '添加失败'))
          }
        }).catch(err => console.log(err))
      }else{
        res.json(new ErrorModel(data, '该分类已经存在'))
      }
    }).catch(err => { console.log(err) })
  }).catch(err => {
    console.log(err)
  })
})

// 后台删除特定id的分类标签
router.get('/deleteCategory', function(req, res, next) {
  let id = req.query[0]
  verifyToken(req,res).then(data => {
    // 在删除分类名称时需要把以前已经添加过该标签的文章中的标签也要删除
    let deleteArticleCategoryResult = deleteArticleCategoryController(id)
    let deleteCategoryResult = deleteCategoryController(id)
    return Promise.all([deleteArticleCategoryResult,deleteCategoryResult]).then(data => {
      if(data){
        res.json(new SuccessModel(data, 'success'))
      }else{
        res.json(new ErrorModel(data, 'error'))
      }
    })
  })
})

// 后台修改特定id的分类标签(检验完成)
router.get('/modifyCategory', function(req, res, next) {
  let { id, name } = req.query
  verifyToken(req,res).then(data => {
    // 在修改分类名称时需要把以前已经添加过该标签的文章中的标签也要修改
    let updateResult = updateArticleCategoryController(id, name)
    let modifyResult = modifyCategoryController(id, name)
    return Promise.all([updateResult,modifyResult]).then(data => {
      if(data){
        res.json(new SuccessModel(data, 'success'))
      }else{
        res.json(new ErrorModel(data, 'error'))
      }
    })
  })
})

// 后台获取对应id的文章(检验完成)
router.get('/getArticleWithId', function(req, res, next) {
  let id = req.query[0]
  verifyToken(req,res).then(data => {
    getArticleWithIdController(id).then(data =>{
      res.json(new SuccessModel(data, 'success'))
    })
  })
})

// 后台获取所有的分类标签(检验完成)
router.get('/getCategoryAll', function(req, res, next) {
  verifyToken(req,res).then(data => {
    getCategoryAllController().then(data => {
      let result = {}
      result.list = []
      for(let i in data){
        result.list.push(data[i])
      }
      res.json(new SuccessModel(result, 'success'))
    })
  })
})

// 后台保存文章(检验完成)
router.get('/saveArticle', function(req, res, next) {
  let params = req.query
  verifyToken(req,res).then(data => {
    saveArticleController(params).then(data => {
      res.json(new SuccessModel(data, 'success'))
    })
  })
})

// 后台发布文章（检验完成）
router.get('/article/publishArticle', (req, res, next) => {
    verifyToken(req,res).then(data => {
      let params = req.query
      let username = data.username
        publishArticleController(params,username)
          .then(data => {
            res.json(new SuccessModel(data, '发布成功'))
          })
          .catch(err => {
            console.log(err)
          })
    }).catch(err => {
      console.log(err)
    })
})

// 后台获取所有文章的列表(检验完成)
router.get('/article/getArticleList', function(req, res, next) {
  verifyToken(req,res).then(data => {
    getArticleListController().then(data => {
      res.json(new SuccessModel(data, 'success'))
    })
  })
})

// 后台删除对应id的文章(检验完成)
router.get('/article/deleteArticleWithId', function(req, res, next) {
  let id = req.query[0]
  verifyToken(req,res).then(data => {
    deleteArticleWithIdController(id).then(data =>{
      res.json(new SuccessModel(data, 'success'))
    })
  })
})


// 后台获取特定id的分类标签文章列表(检验成功)
router.get('/article/getCategoryWithId', function(req, res, next) {
  let id = req.query[0]
  verifyToken(req,res).then(data => {
    getCategoryWithIdController(id).then(data =>{
      let result = {}
      result.list = []
      for(let i in data){
        // console.log(data[i])
        result.list.push(data[i])
      }
      result.total = result.list.length
      res.json(new SuccessModel(result, 'success'))
    })
  })
})


module.exports = router