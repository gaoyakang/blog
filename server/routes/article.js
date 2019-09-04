var express = require('express');
var router = express.Router();
const {
  getListController,
  getListCountController
} = require('../controller/article');
const { SuccessModel, ErrorModel } = require('../model/resModel');

router.get('/list', function(req, res, next) {
  const page = req.query.page;
  const pageSize = req.query.pageSize;
  const listResult = getListController(page, pageSize)
  const countResult = getListCountController()
  return Promise.all([listResult,countResult]).then(data => {
    // console.log(data)
    const result = {}
    result.list = []
    result.count = data[1]
    data[0].forEach((item,index) => {
      result.list[index] = {article:item}
    })
    res.json(
          new SuccessModel(result)
      )
  }).catch(err => {
    console.log(err)
  })
});
router.get('/',function(req,res,next) {
  res.end('ssss')
})
module.exports = router;
