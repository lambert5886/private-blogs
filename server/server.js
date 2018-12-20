import express from 'express'
import bodyParser from 'body-parser'

import path from 'path';
import cors from 'cors';

import mongoose from 'mongoose'
 
import contRoute from './router';


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

 
var router = express.Router();
console.log('path >>> ', path.join(__dirname, '/fileServer'))
app.use('/fileServer/fileStore', express.static('./fileServer/fileStore'))
mongoose.connect('mongodb://localhost:27017/private-blogs');

app.use(cors());
app.use(contRoute)

app.listen('8099', function () {
  console.log('server running at localhost:8099...');
});
