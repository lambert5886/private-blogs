 import mongoose from 'mongoose';
 
 import articleSchema from '../mongoose/schema/article';


 const saveArticle = async (req, res,next) => {
    const opts =  req.body;

    console.log('req  ', opts)
    const article = new articleSchema(opts);

    const saveArticle = await article.save();

    console.log(saveArticle);
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

export {saveArticle}

