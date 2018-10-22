
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: String,
    keyWords: String,
   
    description: String,
    tinymceHtml: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

articleSchema.pre('save', next => {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now()
      } else {
        this.meta.updatedAt = Date.now()
      }
    next();
})

export default articleSchema;