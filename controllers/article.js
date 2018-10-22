import {
  articleModel
} from '../mongoose/model';


const saveArticle = async (req, res, next) => {
  const opts = req.body;

  const article = new articleModel(opts);

  const saveArticle = await article.save();

  return saveArticle;


};

const editArticle = async (req, res, next) => {
  const _opts = req.body;
  let _ids = _opts._id;
  
  const _editAritcle = await articleModel.updateOne({_id: _ids}, {$set: _opts}, (err, result) => {
    
  });

  return _editAritcle;
}

const getArticles = async (req, res, next) => {
  const _data = await articleModel.find();

  return _data;
}

export {
  saveArticle,
  getArticles,
  editArticle
}
