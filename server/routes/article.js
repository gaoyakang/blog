var express = require('express');
var router = express.Router();
const {
  getListController
} = require('../controller/article');
const { SuccessModel, ErrorModel } = require('../model/resModel');

router.get('/list', function(req, res, next) {
  const page = req.query.page;
  const pageSize = req.query.pageSize;
  console.log(page)
  const result = getListController(page, pageSize)
  return result.then(listData => {
      res.json(
          new SuccessModel(listData)
      )
  })
});

module.exports = router;
