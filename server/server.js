import express from 'express'
import bodyParser from 'body-parser'
import graphqlHTTP from 'express-graphql'
import {buildSchema} from 'graphql'


import   mongoose from 'mongoose' 

import schema from '../glahplmodel/query';
import contRoute from './router';

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
 


app.use(contRoute)
 
app.use('/graphql', graphqlHTTP({
    schema: schema,
   
    graphiql: true,
}));
  
  
app.listen('8099', function(){
    console.log('server running at localhost:8099...');
});