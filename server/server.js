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


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


// app.post('/fileServer', multipartMiddleware, (req, res) => {
  
//   getFiles(req, res).then( (result) => {
//     console.log('write  >>>> ', result);
//   })

// })

var router = express.Router();

// mongoose.connect('mongodb://localhost:27017/private-blogs');

app.use(cors());
app.use(contRoute)

app.use('/graphql', graphqlHTTP({
  schema: schema,

  graphiql: true,
}));


app.listen('8099', function () {
  console.log('server running at localhost:8099...');
});
