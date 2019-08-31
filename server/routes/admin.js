var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { TokenSecret } = require('../config/secret.js');
const {
  adminLoginController,
  adminRegisterController,
  adminExistController,
  adminGetPasswordController
} = require('../controller/admin');

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
            jwt.sign({username:username},TokenSecret,{expiresIn:10},(err,token) => {
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
              // 生成jwt令牌
              // jwt.sign({username:username,password:hash},TokenSecret,{expiresIn:60},(err,token) => {
              //   if(err) {
              //     throw err
              //   } else {
              //     return adminRegisterController(username,hash,token).then(registerData => {
              //       if(registerData){
              //         res.json(
              //           new SuccessModel(registerData,'注册成功')
              //         )
              //       }else{
              //         res.json(
              //         new ErrorModel('注册失败')
              //       )
              //       }
              //     })
              //   }
              // })
            }
          })
      })
    }else{
      res.json(
        new ErrorModel('用户已经存在')
      )
    }
    
  }).catch(() => {})
});

router.get('/', function(req, res, next) {
  
})
module.exports = router;
