import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

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

articleSchema.pre('save', function(next){
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now()
      } else {
        this.meta.updatedAt = Date.now()
      }
    
      next()
});
export default mongoose.model('article', articleSchema);
 