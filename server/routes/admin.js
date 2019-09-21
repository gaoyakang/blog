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
  getArticleListController
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

//生成七牛云上传token
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





// 用户注册
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
                      res.json(
                        new SuccessModel(registerData,'注册成功')
                      )
                    }else{
                      res.json(
                      new ErrorModel('注册失败')
                    )
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

// 用户登录
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
                res.json(
                  new SuccessModel(token,'登录成功')
                )
              }
            })
          }else{
            res.json(
              new ErrorModel(isMatch, '账号密码不匹配')
            )
          }
        }
      })
    }else{
      res.json(
        new ErrorModel(existData,'该用户不存在')
      )      
    }
  })
});


// 获取后台首页的统计数据
router.get('/getHomeStatistics', function(req, res, next) {
  verifyToken(req,res).then(data => {
    let articleResult = getHomeStatisticsController()
    let categoryResult = getCategoryStatisticsController()
    return Promise.all([articleResult,categoryResult]).then(data => {
      // console.log(data[0])
      const result = {}
      result.list = []
      result.articleCount = data[0].length
      result.categoryCount = data[1].length
      data[0].forEach((item,index) => {
        result.list[index] = item
      })
      res.json(new SuccessModel(result,'Success'))
    })
  }).catch(err => {
    console.log(err)
  })
})

// 获取所有分类标签
router.get('/getCategoryList', function(req, res, next) {
  verifyToken(req,res).then(data => {
    getCategoryListController().then(data =>{
      res.json(new SuccessModel(data, 'success'))
    })
  })
})

// 添加分类标签
router.get('/addCategory', function(req, res, next) {
  verifyToken(req,res).then(data => {
    const name = req.query[0]
    //判断分类是否存在
    categoryExistController(name).then(data => {
      if(data.length === 0){
        //分类不存在就进行添加
        adminAddCategoryController(name).then(data => {
          res.json(new SuccessModel(data, '添加成功'))
        }).catch(err => console.log(err))
      }else{
        res.json(new ErrorModel(data, '该分类已经存在'))
      }
      res.json('sssss')
    }).catch(err => { console.log(err) })
  }).catch(err => {
    console.log(err)
  })
})

// 删除特定id的分类标签
router.get('/deleteCategory', function(req, res, next) {
  let id = req.query[0]
  verifyToken(req,res).then(data => {
    deleteCategoryController(id).then(data =>{
      res.json(new SuccessModel(data, 'success'))
    })
  })
})

// 修改特定id的分类标签
router.get('/modifyCategory', function(req, res, next) {
  let { id, name } = req.query
  verifyToken(req,res).then(data => {
    modifyCategoryController(id, name).then(data =>{
      res.json(new SuccessModel(data, 'success'))
    })
  })
})

// 获取特定di的分类的名称
router.get('/getCategoryNameWithId', function(req, res, next) {
  let id = req.query[0]
  verifyToken(req,res).then(data => {
    getCategoryNameWithIdController(id).then(data => {
      res.json(new SuccessModel(data, 'SuccessModel'))
    })
  })
})

// 获取特定id的分类标签文章列表
router.get('/getCategoryWithId', function(req, res, next) {
  let id = req.query[0]
  // console.log(id)
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

// 删除对应id的文章
router.get('/deleteArticleWithId', function(req, res, next) {
  let id = req.query[0]
  // console.log(id)
  verifyToken(req,res).then(data => {
    deleteArticleWithIdController(id).then(data =>{
      res.json(new SuccessModel(data, 'success'))
    })
  })
})

// 获取对应id的文章
router.get('/getArticleWithId', function(req, res, next) {
  let id = req.query[0]
  verifyToken(req,res).then(data => {
    getArticleWithIdController(id).then(data =>{
      res.json(new SuccessModel(data, 'success'))
    })
  })
})

// 获取所有的分类标签
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

// 保存文章
router.get('/saveArticle', function(req, res, next) {
  let params = req.query
  console.log(params)
  verifyToken(req,res).then(data => {
    saveArticleController(params).then(data => {
      res.json(new SuccessModel(data, 'success'))
    })
  })
})

router.get('/article/list', (req, res, next) => {
  verifyToken(req,res).then(data => {
    res.json(new SuccessModel(data,'验证成功'))
  }).catch(err => {
    console.log(err)
  })
})

// 发布文章
router.get('/article/publishArticle', (req, res, next) => {
    verifyToken(req,res).then(data => {
      let params = req.query
        publishArticleController(params)
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

// 获取所有文章的列表
router.get('/article/getArticleList', function(req, res, next) {
  verifyToken(req,res).then(data => {
    getArticleListController().then(data => {
      res.json(new SuccessModel(data, 'success'))
    })
  })
})

module.exports = router
