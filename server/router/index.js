import express from 'express';

import {
  saveArticle,
  getArticles,
  editArticle,
  deleteArticle,
  getMenu,
  saveMenu,
  editMenu,
  deleteMenu
} from '../../controllers'
const Router = express.Router();

Router.get('/content/article', (req, res, next) => {

  let _datas = getArticles(req, res);
  _datas.then(function (result) {
    if (result) {
      res.json({
        success: true,
        data: result
      })
    }
    next();

  }, (err) => {
    console.log(' edit menu >>>  ',err)
  })
});
 

Router.post('/content/saveArticle', (req, res, next) => {
  let _ret = saveArticle(req, res);
  _ret.then(result => {
    if (result) {
      res.json({
        success: true,

      })
    }
    next();
  });

});

Router.post('/content/editArticle', (req, res, next) => {
  let _ret = editArticle(req, res);
  _ret.then( result => {
    if(result){
      res.json({
        success: true,
      })
    }
    next();
  }, err => {
    if(err){
      res.json({
        success: false
      })
    }
    next();
  })
});

Router.post('/content/deleteArticle', (req, res, next) => {
  let _ret = deleteArticle(req, res);
 
      _ret.then( result => {
          if(result){
            res.json({
              success: true,
            })
          };
          next();
      });
})



// menu 

Router.post('/menu/saveMenu', (req, res, next) => {
  console.log(req.method, 'req method')
  let _ret = saveMenu(req, res);
  _ret.then(result => {
    if (result) {
      res.json({
        success: true
      })
    }
    next();
  })
});

Router.get('/menu/getMenu', (req, res, next) => {
  let _menuList = getMenu(req, res);
  _menuList.then(result => {
    if (result) {
      res.json({
        success: true,
        data: result
      })
    };

    next()
  })
});

Router.post('/menu/editMenu', (req, res, next) => {
  let _menuItem = editMenu(req, res);
     _menuItem.then( result => {
       if(result) {
         res.json({
           success: true,
           data: result
         })
       };
       next();
     }, (err) => {
     
       next();
     })
});

Router.post('/menu/deleteMenu', (req, res, next) => {
  let _deleteMenu = deleteMenu(req, res);
  _deleteMenu.then( result => {
    if(result){
      res.json({
        success: true,
      })
    };

    next();
  }, (err) => {
    next();
  })
})

export default Router;
