import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const tagSchema = new Schema({
    tag: String
})

export default tagSchema;