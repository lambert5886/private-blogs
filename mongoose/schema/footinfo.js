import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const footInfoSchema = new Schema({
    articleId: String,
    tag: String,
    time: String,
    read: Number,
    love: Number,


})

export default footInfoSchema;