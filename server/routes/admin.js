var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const { SECRET } = require('../config/secret.js')
const {
  adminLoginController,
  adminRegisterController
} = require('../controller/admin');
const { SuccessModel, ErrorModel } = require('../model/resModel');

router.post('/login', function(req, res, next) {
  const { username, password } = req.body
  return adminLoginController (username, password).then(loginResult => {
    if (loginResult[0].access_token) {
      res.json(
          new SuccessModel(loginResult[0].access_token, '登陆成功')
      )
    } else {
      res.json(
          new ErrorModel(loginResult, '登录失败')
      )
    }
  })
});

router.post('/register', function(req, res, next) {
  const { username, password } = req.body
  const token = jwt.sign({username:username},SECRET,{expiresIn:60},(err,token) => {
     if (err) {
      return
     } else {
      return adminRegisterController (username, password, token).then(registerData => {
        res.json(
           new SuccessModel(registerData)
          )
      })
     }
    })
  res.json(
      new SuccessModel(username)
  )
});

module.exports = router;
