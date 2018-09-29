import express from 'express';

import {
  saveArticle,
  getArticles,
  getMenu,
  saveMenu
} from '../../controllers'
const Router = express.Router();

Router.post('/content/article', (req, res, next) => {

  let _datas = getArticles(req, res);
  _datas.then(function (result) {
    if (result) {
      res.json({
        success: true,
        data: result
      })
    }
    next();

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

// menu 

Router.post('/menu/saveMenu', (req, res, next) => {
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
})

export default Router;
