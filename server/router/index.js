import express from 'express';

import types from '../../controllers'
const Router = express.Router();

Router.get('/blogsServer', (req, res, next) => {
  let _req = req.query;
  let _type = _req.type;

  let _datas = types[_type](req, res);
  _datas.then(function (result) {
    if (result) {
      res.json({
        success: true,
        data: result
      })
    }
    next();

  }, (err) => {
    console.log(' edit menu >>>  ', err)
  })


});

Router.post('/blogsServer', (req, res, next) => {
  let _req = req.body;
  let _type = _req.type;

  let _datas = types[_type](req, res);
  _datas.then(function (result) {
    if (result) {
      res.json({
        success: true,
        data: result
      })
    }
    next();

  }, (err) => {
    console.log(' edit menu >>>  ', err)
  })

});

Router.post('/fileServer', (req, res, next) => {

  console.log('上传 >>>> ', req.headers);
  next();


});



export default Router;
