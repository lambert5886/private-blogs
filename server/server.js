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

import multipart  from 'connect-multiparty';

import fs from 'fs';
const fsPromise = fs.promises;

 

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

let multipartMiddleware = multipart();

const getFilesBuffer = (req, res) => {
  let _buffer = [],
      start = 0  ;
  req.on('data', (chunk) => {
    console.log('chunk >>>> ', chunk);
  });

  req.on('end', () => {
    console.log('end >>>')
  })
};

const getFiles = async (req, res) => {
  let _file = req.files.file;
  let _savePath = __dirname + '/fileServer/fileStore/' + _file.fieldName + _file.originalFilename;
 
  let _data = await fsPromise.readFile(_file.path);
  let _writeEnd = await fsPromise.writeFile(_savePath, _data);

  return _writeEnd;

}

app.post('/fileServer', multipartMiddleware, (req, res) => {
  console.log(' get files >>>> ', req.files.file)
  getFiles(req, res).then( (result) => {
    console.log('write  >>>> ', result)
  })

})

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
