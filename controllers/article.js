import {
  articleModel,
  footInfoModel
} from '../mongoose/model';
 

const saveArticle = async (req, res, next) => {
  const opts = req.body.data;
  const _footInfo = opts.footInfo;
  console.log( 'opts save >>>', opts )
  const article = new articleModel(opts);

  const footInfo = new footInfoModel(_footInfo);
  const saveArticle = await article.save();
  const saveFootInfo = await footInfo.save();

  return saveArticle;


};

const editArticle = async (req, res, next) => {
  const _opts = req.body.data;
  let _ids = _opts._id;
  
  const _editAritcle = await articleModel.updateOne({_id: _ids}, 
    {$set: _opts}, (err, result) => {
    
  });

  return _editAritcle;
}

const deleteArticle = async (req, res, next) => {
  const _opts = req.body.data;

  const _deleteArticle = await articleModel.deleteOne({_id: _opts.id}, (err) => {
    if(err){
      return err;
    }
  });

  return _deleteArticle;

}

const getArticles = async (req, res, next) => {
  const _data = await articleModel.find();

  return _data;
}

export {
  saveArticle,
  getArticles,
  editArticle,
  deleteArticle
}
