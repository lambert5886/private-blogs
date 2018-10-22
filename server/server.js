import express from 'express'
import bodyParser from 'body-parser'
import graphqlHTTP from 'express-graphql'
import {buildSchema} from 'graphql'

import  {saveArticle, getArticles}  from '../controllers'
import   mongoose from 'mongoose' 

import schema from '../glahplmodel/query';

var root = { hello: () => 'hello world !'};

var app = express(); 

app.use(bodyParser.json());
app.use( bodyParser.urlencoded({extended: true }));

var router = express.Router();
 
mongoose.connect('mongodb://localhost:27017/private-blogs');

app.all('*', function(req, res, next){
   // res.header("Content-Type", "application/json;charset=utf-8");
    // res.header("Content-Type", "application/x-www-form-urlencoded;");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
});
app.post('/home', function(req, res, next){
    res.send('OK!');
    next();
});
 
app.post('/saveAdd', (req, res, next) => {
    saveArticle(req, res);
    res.send();
    next(); 
});


router.post('/getArticle', (req, res, next) => {
    console.log(getArticles)
    getArticles(req, res);
    res.send();
    next();
})
app.use('/graphql', graphqlHTTP({
    schema: schema,
   
    graphiql: true,
}));
  
  
app.listen('8099', function(){
    console.log('server running at localhost:8099...');
});