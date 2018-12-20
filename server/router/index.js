import express from 'express';

import types from '../../controllers';
import fileServer from '../fileServer/';

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

Router.post('/fileServer',fileServer.multipartMiddleware, (req, res, next) => {
  console.log('req body ', req.files)
   fileServer.getFiles(req, res).then( function(){
     
    console.log('then >>> ', global.fileUrls)
    res.json({
      success: true,
      url: global.fileUrls
    })

     next();
  })
 


});



export default Router;
