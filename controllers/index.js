 import mongoose from 'mongoose';
 
 import articleSchema from '../mongoose/schema/article';


 const saveArticle = async (req, res,next) => {
    const opts =  req.body;

    const article = new articleSchema(opts);

    const saveArticle = await article.save();

    if (saveArticle) {
        res.body = {
            success: true,
            data: saveArticle
        }
    } {
        res.body = {
            success: false,
             
        }

    }


};

const getArticles = async (req, res, next) => {
    const _data = await articleSchema.find({});
    console.log('get data  ', _data)
    if(_data){
        res.body = {
            success: true,
            data: _data
        }
       
    }else{
        res.body = {
            success: false,
        }
        
    }
}

export {saveArticle, getArticles}

