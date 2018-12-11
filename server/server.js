import express from 'express'
import bodyParser from 'body-parser'
import graphqlHTTP from 'express-graphql'
import {
  buildSchema
} from 'graphql'
import cors from 'cors';

import mongoose from 'mongoose'

import schema from '../glahplmodel/query';
import contRoute from './router';

var root = {
  hello: () => 'hello world !'
};

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var router = express.Router();

mongoose.connect('mongodb://localhost:27017/private-blogs');

// app.all('*', function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   res.header('Access-Control-Allow-Methods', 'PUT, POST, GET,OPTIONS, DELETE');

//   next();
 
// });



app.use(cors());
app.use(contRoute)

app.use('/graphql', graphqlHTTP({
  schema: schema,

  graphiql: true,
}));


app.listen('8099', function () {
  console.log('server running at localhost:8099...');
});
