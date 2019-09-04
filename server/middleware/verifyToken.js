const jwt = require('jsonwebtoken');
const TokenSecret = require('../config/secret')

module.exports = (req,res) => {
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