import {
  articleModel
} from '../mongoose/model';


const saveArticle = async (req, res, next) => {
  const opts = req.body;

  const article = new articleModel(opts);

  const saveArticle = await article.save();

  return saveArticle;


};

const getArticles = async (req, res, next) => {
  const _data = await articleModel.find();

  return _data;
}

export {
  saveArticle,
  getArticles
}
