const TokenSecret = require('../config/secret')
const { adminExistController } = require('../controller/admin');
const jwt = require('jsonwebtoken');
exports.vertifyToken = token => {
  jwt.verify(token, TokenSecret, (err, decode) => {
    if(err){
      throw err
    }else{
      console.log(decode)
      return decode
    }
  })
}