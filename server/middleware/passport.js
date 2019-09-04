const TokenSecret = require('../config/secret')
const { adminExistController } = require('../controller/admin');
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
// const opts = {
//   jwtFromRequest: ExtractJWT.fromHeader('Authorization'),
//   secretOrKey: TokenSecret
// }
const opts ={}
opts.jwtFromRequest = ExtractJwt.fromHeader('Authorization');
opts.secretOrKey = TokenSecret;
  console.log(ExtractJwt.fromHeader('Authorization'))

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
  	console.log(jwt_payload)
  	return done(null,jwt_payload)
  	// return adminExistController('51zxw')
	  // 	.then(existData => {
	  // 	  if(existData){
	  // 	    return done(null,existData)
	  // 	  }else{
	  // 	    return done(null,false)
	  // 	  }
	  // 	})
	  // 	.catch(err => {
	  // 	  console.log(err)
	  // 	})
  })
 );
}
