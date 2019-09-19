const qiniu = require('qiniu')
const fs = require('fs')
const path = require('path')
const cdnConfig = require('./secret').cdn



const { ak, sk, bucket } = cdnConfig



const mac = new qiniu.auth.digest.Mac(ak,sk)
const config = new qiniu.conf.Config()
config.zone = qiniu.zone.Zone_z1

const doUpload = (key, file) => {
  const options = {
    scope: bucket + ':' + key
  }
  const formUploader = new qiniu.form_up.FormUploader(config)
  const putExtra = new qiniu.form_up.PutExtra()
  const putPolicy = new qiniu.rs.PutPolicy(options)
  const uploadToken = putPolicy.uploadToken(mac)
  return new Promise((resolve,reject) => {
    formUploader.putFile(uploadToken,key,file,putExtra, (err, body, info) => {
      if(err) return reject(err)
      if(info.statusCode === 200) {
        resolve(body)
      }else{
        reject(body)
      }
    })
  })
}