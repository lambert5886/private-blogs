import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const menuSchema = new Schema({
    id: String,
    menuType: String, //前端 0, 后端 1
    title: String,
    value: String,
    isChildren: Boolean,
    path: String,
    parentId: String,
    childrenList: Array

});

export default menuSchema;
